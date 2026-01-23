import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioIntroPlayerProps {
  audioSrc: string;
  title?: string;
}

const AudioIntroPlayer = ({ audioSrc, title = "Introduction to the course" }: AudioIntroPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="p-4 rounded-xl glass-card border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <div className="flex items-center gap-4">
        {/* Play Button */}
        <Button
          size="icon"
          onClick={togglePlay}
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {/* Audio Waves & Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-foreground truncate">{title}</span>
          </div>
          
          {/* Animated Waves */}
          <div className="flex items-center gap-1 h-8">
            {Array.from({ length: 24 }).map((_, i) => {
              const isActive = progress > (i / 24) * 100;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isActive 
                      ? 'bg-primary' 
                      : 'bg-muted-foreground/30'
                  }`}
                  style={{
                    height: isPlaying && isActive
                      ? `${Math.random() * 24 + 8}px`
                      : isActive 
                        ? '16px' 
                        : '8px',
                    animationName: isPlaying && isActive ? 'audioWave' : 'none',
                    animationDuration: `${0.4 + Math.random() * 0.3}s`,
                    animationIterationCount: 'infinite',
                    animationDirection: 'alternate',
                    animationTimingFunction: 'ease-in-out',
                  }}
                />
              );
            })}
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-muted rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Time */}
        <div className="text-xs text-muted-foreground font-mono flex-shrink-0">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <style>{`
        @keyframes audioWave {
          0% { height: 8px; }
          100% { height: 24px; }
        }
      `}</style>
    </div>
  );
};

export default AudioIntroPlayer;
