import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import avatarImage from '@/assets/avatar-guide.jpg';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AvatarGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState({ x: 80, y: 70 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m your guide at POSSIBLE. How can I help you today? Ask me about our courses, enrollment, or anything else!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Floating animation
  useEffect(() => {
    if (isPaused || isOpen) return;

    const animate = () => {
      setPosition(prev => {
        let newX = prev.x + direction.x * 0.3;
        let newY = prev.y + direction.y * 0.2;
        let newDirX = direction.x;
        let newDirY = direction.y;

        // Bounce off edges
        if (newX <= 10 || newX >= 85) {
          newDirX = -direction.x;
          setDirection(d => ({ ...d, x: newDirX }));
        }
        if (newY <= 10 || newY >= 80) {
          newDirY = -direction.y;
          setDirection(d => ({ ...d, y: newDirY }));
        }

        return {
          x: Math.max(10, Math.min(85, newX)),
          y: Math.max(10, Math.min(80, newY))
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isOpen, direction]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('avatar-chat', {
        body: { message: userMessage }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error('Failed to get response. Please try again.');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an issue. Please try again!' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Avatar */}
      <div
        className="fixed z-50 cursor-pointer transition-transform duration-300 hover:scale-110"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={() => setIsOpen(true)}
      >
        {/* 3D Avatar Container */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 animate-pulse scale-125" />
          
          {/* Avatar with 3D effect */}
          <div 
            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-primary shadow-2xl"
            style={{
              transform: 'perspective(500px) rotateY(-5deg)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 30px hsl(var(--primary) / 0.3)'
            }}
          >
            <img 
              src={avatarImage} 
              alt="Guide Avatar"
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* Chat bubble indicator */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-bounce shadow-lg">
            <MessageCircle className="w-4 h-4 text-background" />
          </div>
          
          {/* Floating name tag */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground border border-border/50 shadow-lg">
              Ask Me!
            </span>
          </div>
        </div>
      </div>

      {/* Pause/Play Button */}
      {!isOpen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPaused(!isPaused);
          }}
          className="fixed bottom-24 right-4 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-muted transition-colors"
        >
          {isPaused ? <Play className="w-5 h-5 text-foreground" /> : <Pause className="w-5 h-5 text-foreground" />}
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border/30">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                <img src={avatarImage} alt="Guide" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">POSSIBLE Guide</h3>
                <p className="text-xs text-muted-foreground">Your learning assistant</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/30">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about courses, enrollment..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarGuide;
