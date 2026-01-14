import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RateLimitInfo {
  remaining: number;
  resetIn: number;
  isLimited: boolean;
}

const AvatarChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState<RateLimitInfo>({ remaining: 10, resetIn: 0, isLimited: false });
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Cooldown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldownTimer > 0) {
      interval = setInterval(() => {
        setCooldownTimer((prev) => {
          if (prev <= 1) {
            setRateLimit((rl) => ({ ...rl, isLimited: false, remaining: 10 }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTimer]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || rateLimit.isLimited) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Please log in to use the chat feature.' },
        ]);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/avatar-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      // Parse rate limit headers
      const remaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '10');
      const resetIn = parseInt(response.headers.get('X-RateLimit-Reset') || '60');

      if (response.status === 429) {
        const data = await response.json();
        setRateLimit({ remaining: 0, resetIn: data.retryAfter || resetIn, isLimited: true });
        setCooldownTimer(data.retryAfter || resetIn);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '⏳ Rate limit reached. Please wait before sending more messages.' },
        ]);
      } else if (response.ok) {
        const data = await response.json();
        setRateLimit({ remaining, resetIn, isLimited: false });
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.error || 'Something went wrong. Please try again.' },
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Unable to connect. Please try again later.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "flex items-center justify-center",
          "hover:scale-110 transition-transform duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 w-80 sm:w-96",
            "bg-card border border-border rounded-2xl shadow-xl",
            "flex flex-col overflow-hidden",
            "animate-fade-in-up"
          )}
          style={{ maxHeight: 'calc(100vh - 140px)' }}
        >
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">POSSIBLE Guide</h3>
                <p className="text-xs opacity-80">Ask me anything</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-primary-foreground/20 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Rate Limit Indicator */}
          <div className={cn(
            "px-4 py-2 flex items-center justify-between text-xs border-b border-border",
            rateLimit.isLimited ? "bg-destructive/10 text-destructive" : "bg-muted/50 text-muted-foreground"
          )}>
            {rateLimit.isLimited ? (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>Cooldown: {cooldownTimer}s remaining</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>{rateLimit.remaining} messages left this minute</span>
              </div>
            )}
            {rateLimit.remaining <= 3 && !rateLimit.isLimited && (
              <div className="flex items-center gap-1 text-amber-600">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Low</span>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[300px] bg-background">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <p>👋 Hi! I'm your POSSIBLE guide.</p>
                <p className="mt-1">Ask me about courses, workshops, or enrollment!</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] px-3 py-2 rounded-2xl text-sm",
                  msg.role === 'user'
                    ? "ml-auto bg-primary text-primary-foreground rounded-br-md"
                    : "mr-auto bg-muted text-foreground rounded-bl-md"
                )}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto bg-muted text-muted-foreground px-3 py-2 rounded-2xl rounded-bl-md text-sm">
                <span className="inline-flex gap-1">
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={rateLimit.isLimited ? `Wait ${cooldownTimer}s...` : "Type a message..."}
                disabled={isLoading || rateLimit.isLimited}
                className="flex-1 text-sm"
              />
              <Button
                size="icon"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading || rateLimit.isLimited}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarChat;
