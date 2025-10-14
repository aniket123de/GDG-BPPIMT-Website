import React, { useEffect, useRef, useState } from 'react';
import amongUs1 from '../assets/amongus1.png';
import amongUs2 from '../assets/amongus2.png';
import amongUs3 from '../assets/amongus3.png';
import amongUs4 from '../assets/amongus4.png';
import amongUs5 from '../assets/amongus5.png';

interface AmongUsParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  image: string;
  fadeDirection: number; // 1 for fade in, -1 for fade out
}

interface AmongUsParticlesProps {
  particleCount?: number;
  className?: string;
}

const AmongUsParticles: React.FC<AmongUsParticlesProps> = ({
  particleCount = 8,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<AmongUsParticle[]>([]);
  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load images
  useEffect(() => {
    const images = {
      amongUs1: new Image(),
      amongUs2: new Image(),
      amongUs3: new Image(),
      amongUs4: new Image(),
      amongUs5: new Image()
    };

    images.amongUs1.src = amongUs1;
    images.amongUs2.src = amongUs2;
    images.amongUs3.src = amongUs3;
    images.amongUs4.src = amongUs4;
    images.amongUs5.src = amongUs5;

    let loadedCount = 0;
    const totalImages = Object.keys(images).length;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        imagesRef.current = images;
        setImagesLoaded(true);
      }
    };

    images.amongUs1.onload = handleLoad;
    images.amongUs2.onload = handleLoad;
    images.amongUs3.onload = handleLoad;
    images.amongUs4.onload = handleLoad;
    images.amongUs5.onload = handleLoad;

    return () => {
      images.amongUs1.onload = null;
      images.amongUs2.onload = null;
      images.amongUs3.onload = null;
      images.amongUs4.onload = null;
      images.amongUs5.onload = null;
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const createParticle = (id: number): AmongUsParticle => {
      const imageKeys = ['amongUs1', 'amongUs2', 'amongUs3', 'amongUs4', 'amongUs5'];
      const selectedImage = imageKeys[Math.floor(Math.random() * imageKeys.length)];
      
      return {
        id,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8, // Gentle floating movement
        vy: (Math.random() - 0.5) * 0.6, // Gentle floating movement
        rotation: 0, // Keep original orientation
        rotationSpeed: 0, // No rotation
        scale: 1, // Keep original size
        opacity: 0,
        image: selectedImage,
        fadeDirection: 1
      };
    };

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => createParticle(i));
  }, [imagesLoaded, particleCount]);

  // Animation loop
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position with gentle floating
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Fade in/out logic (like Among Us characters appearing/disappearing)
        if (particle.fadeDirection === 1) {
          particle.opacity += 0.008; // Fade in slowly
          if (particle.opacity >= 0.6) {
            particle.fadeDirection = -1; // Start fading out
          }
        } else {
          particle.opacity -= 0.005; // Fade out slowly
          if (particle.opacity <= 0) {
            // Reset particle position and start fading in again
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
            particle.vx = (Math.random() - 0.5) * 0.8;
            particle.vy = (Math.random() - 0.5) * 0.6;
            particle.fadeDirection = 1;
            // Random delay before next appearance
            particle.opacity = -Math.random() * 2; // Negative opacity for delay
          }
        }

        // Wrap around screen edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Draw particle if visible
        if (particle.opacity > 0) {
          const image = imagesRef.current[particle.image];
          if (image && image.complete) {
            ctx.save();
            
            // Set opacity for fade in/out effect
            ctx.globalAlpha = particle.opacity;
            
            // Draw image at original size, centered on particle position
            const width = image.width;
            const height = image.height;
            ctx.drawImage(
              image, 
              particle.x - width / 2, 
              particle.y - height / 2, 
              width, 
              height
            );
            
            ctx.restore();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imagesLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default AmongUsParticles;
