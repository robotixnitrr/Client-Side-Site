import { useState, useEffect, useRef } from 'react';
import './Animation.css';

interface NumberAnimationProps {
  targetNumber: number;
}

const NumberAnimation = ({ targetNumber }: NumberAnimationProps) => {
  const [number, setNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);

  // Constants for animation
  const duration = 2000; // Animation duration in milliseconds
  const fps = 60; // Frames per second
  const steps = fps * (duration / 1000);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.7 }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        observer.unobserve(animationRef.current);
      }
    };
  }, []);

  // Number Animation
  useEffect(() => {
    if (isVisible && !animationComplete) {
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep === steps) {
          setNumber(targetNumber);
          setAnimationComplete(true);
          clearInterval(timer);
        } else {
          // Use easeOutQuad for smoother animation
          const progress = currentStep / steps;
          const easeOut = 1 - Math.pow(1 - progress, 2);
          setNumber(Math.round(targetNumber * easeOut));
        }
      }, 1000 / fps);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetNumber, animationComplete]);

  return (
    <div className="number-animation" ref={animationRef}>
      <span>{Math.round(number)}</span>
      {animationComplete && '+'}
    </div>
  );
};

export default NumberAnimation;