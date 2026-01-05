import { useEffect, useRef } from 'react';

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let waves: Wave[] = [];
    let hexagons: Hexagon[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }

    interface Wave {
      y: number;
      amplitude: number;
      frequency: number;
      speed: number;
      offset: number;
      color: string;
    }

    interface Hexagon {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      color: string;
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < particleCount; i++) {
        const colors = [
          'rgba(34, 197, 94, ',   // green
          'rgba(59, 130, 246, ',  // blue
          'rgba(234, 179, 8, ',   // gold
        ];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.4 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Initialize waves
    const initWaves = () => {
      waves = [
        { y: canvas.height * 0.6, amplitude: 50, frequency: 0.003, speed: 0.02, offset: 0, color: 'rgba(34, 197, 94, 0.04)' },
        { y: canvas.height * 0.7, amplitude: 40, frequency: 0.004, speed: 0.025, offset: 100, color: 'rgba(59, 130, 246, 0.03)' },
        { y: canvas.height * 0.8, amplitude: 30, frequency: 0.005, speed: 0.03, offset: 200, color: 'rgba(34, 197, 94, 0.02)' },
      ];
    };

    // Initialize floating hexagons
    const initHexagons = () => {
      hexagons = [];
      for (let i = 0; i < 6; i++) {
        const colors = [
          'rgba(34, 197, 94, 0.06)',
          'rgba(59, 130, 246, 0.05)',
        ];
        hexagons.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 80 + 40,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          opacity: Math.random() * 0.2 + 0.05,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = size * Math.cos(angle);
        const py = size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      waves.forEach((wave) => {
        wave.offset += wave.speed;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Draw hexagons
      hexagons.forEach((hex) => {
        hex.rotation += hex.rotationSpeed;
        hex.y += Math.sin(Date.now() * 0.001 + hex.x) * 0.3;
        drawHexagon(ctx, hex.x, hex.y, hex.size, hex.rotation, hex.color);
      });

      // Draw particles and connections
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ')';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    initWaves();
    initHexagons();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default HeroBackground;
