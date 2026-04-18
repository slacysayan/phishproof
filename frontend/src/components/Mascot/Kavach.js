import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';

const Kavach = forwardRef(({ size = 120, expression = 'idle', className = '' }, ref) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const idleTl = useRef(null);
  const activeTl = useRef(null);

  const startIdle = () => {
    if (idleTl.current) idleTl.current.kill();
    // Gentle breathing animation using scaling and slight hovering
    idleTl.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to(imgRef.current, { 
        y: -5, 
        scaleY: 1.03, 
        scaleX: 0.98, 
        duration: 2, 
        ease: 'sine.inOut' 
      });
  };

  const playExpression = (name) => {
    if (activeTl.current) activeTl.current.kill();
    if (idleTl.current) idleTl.current.pause();

    // Reset physics cleanly before starting a new state
    gsap.killTweensOf(imgRef.current);
    gsap.set(imgRef.current, { rotation: 0, scaleX: 1, scaleY: 1, x: 0, y: 0 });

    activeTl.current = gsap.timeline({ 
      onComplete: () => {
        if (idleTl.current) idleTl.current.play();
      } 
    });

    if (name === 'happy' || name === 'excited') {
      // Squash, Stretch, and Jump
      activeTl.current
        .to(imgRef.current, { scaleY: 0.8, scaleX: 1.25, duration: 0.1, ease: 'power2.out' })
        .to(imgRef.current, { y: -30, scaleY: 1.15, scaleX: 0.9, duration: 0.25, ease: 'power2.out' })
        .to(imgRef.current, { y: 0, scaleY: 0.9, scaleX: 1.1, duration: 0.2, ease: 'power2.in' })
        .to(imgRef.current, { scaleY: 1, scaleX: 1, duration: 0.15, ease: 'back.out(2)' })
        .to(imgRef.current, { 
          rotation: name === 'excited' ? 12 : 0, 
          duration: 0.1, 
          yoyo: name === 'excited', 
          repeat: name === 'excited' ? 5 : 0 
        });
    } else if (name === 'sad') {
      // Droop forward and sway slightly
      activeTl.current
        .to(imgRef.current, { scaleY: 0.9, scaleX: 1.05, y: 8, duration: 0.4, ease: 'power2.out' })
        .to(imgRef.current, { rotation: -4, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' })
        .to(imgRef.current, { scaleY: 1, scaleX: 1, y: 0, rotation: 0, duration: 0.5 });
    } else if (name === 'thinking') {
      // Tilt as if confused/investigating
      activeTl.current
        .to(imgRef.current, { rotation: -12, scale: 1.05, y: -5, duration: 0.5, ease: 'back.out(1.5)' })
        .to(imgRef.current, { rotation: -10, y: -2, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' })
        .to(imgRef.current, { rotation: 0, scale: 1, y: 0, duration: 0.4 });
    } else if (name === 'teaching') {
      // Lean forward and nod confidently
      activeTl.current
        .to(imgRef.current, { y: -8, scaleX: 1.05, scaleY: 0.95, duration: 0.25, ease: 'power1.out' })
        .to(imgRef.current, { rotation: 6, duration: 0.15 })
        .to(imgRef.current, { rotation: -6, duration: 0.15 })
        .to(imgRef.current, { rotation: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.25 });
    } else {
      // Default to returning to idle smoothly
      if (idleTl.current) idleTl.current.play();
    }
  };

  useImperativeHandle(ref, () => ({ playExpression }));

  useEffect(() => {
    startIdle();
    playExpression(expression);
    return () => {
      if (idleTl.current) idleTl.current.kill();
      if (activeTl.current) activeTl.current.kill();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    playExpression(expression);
  }, [expression]);

  return (
    <div
      ref={containerRef}
      style={{ 
        width: size, 
        height: size, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        transformOrigin: 'bottom center'
      }}
      className={`relative ${className}`}
      aria-label="Kavach the shield mascot"
      data-testid="kavach-mascot"
    >
      {/* 
        Multiply blend mode removes white backgrounds beautifully 
        if the container surface isn't dark.
      */}
      <img 
        ref={imgRef}
        src="/kavach.webp" 
        alt="Kavach Mascot" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain', 
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1))'
        }} 
      />
    </div>
  );
});

Kavach.displayName = 'Kavach';
export default Kavach;
