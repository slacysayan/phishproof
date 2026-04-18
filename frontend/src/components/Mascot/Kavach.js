import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';

const Kavach = forwardRef(({ size = 120, expression = 'idle' }, ref) => {
  const rootRef = useRef(null);
  const bodyRef = useRef(null);
  const eyesRef = useRef(null);
  const pupilLeftRef = useRef(null);
  const pupilRightRef = useRef(null);
  const mouthRef = useRef(null);
  const armLeftRef = useRef(null);
  const armRightRef = useRef(null);
  const sparkleRef = useRef(null);
  const tearRef = useRef(null);

  const idleTl = useRef(null);
  const blinkTl = useRef(null);

  const startIdle = () => {
    if (idleTl.current) idleTl.current.kill();
    idleTl.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to(bodyRef.current, { y: -6, duration: 1.6, ease: 'sine.inOut' });
    if (blinkTl.current) blinkTl.current.kill();
    blinkTl.current = gsap.timeline({ repeat: -1, repeatDelay: 3.2 })
      .to([pupilLeftRef.current, pupilRightRef.current], { scaleY: 0.1, duration: 0.08, transformOrigin: 'center', ease: 'power1.inOut' })
      .to([pupilLeftRef.current, pupilRightRef.current], { scaleY: 1, duration: 0.08, ease: 'power1.out' });
  };

  const playExpression = (name) => {
    // reset arms / mouth
    gsap.killTweensOf([armLeftRef.current, armRightRef.current, mouthRef.current, bodyRef.current, tearRef.current, sparkleRef.current]);
    gsap.set(tearRef.current, { opacity: 0 });
    gsap.set(sparkleRef.current, { opacity: 0, scale: 0.5 });

    if (name === 'happy') {
      gsap.to(bodyRef.current, { y: -18, duration: 0.3, ease: 'power2.out', yoyo: true, repeat: 1 });
      gsap.to(mouthRef.current, { attr: { d: 'M70 150 Q100 175 130 150' }, duration: 0.25, ease: 'back.out(2)' });
      gsap.to(sparkleRef.current, { opacity: 1, scale: 1.2, duration: 0.4, ease: 'back.out(2)' });
      gsap.to(sparkleRef.current, { opacity: 0, scale: 1.6, delay: 0.45, duration: 0.4 });
    } else if (name === 'sad') {
      gsap.to(bodyRef.current, { y: 6, duration: 0.3 });
      gsap.to(mouthRef.current, { attr: { d: 'M70 160 Q100 140 130 160' }, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(tearRef.current, { opacity: 0, y: 0 }, { opacity: 1, y: 24, duration: 0.8 });
    } else if (name === 'excited') {
      gsap.to(bodyRef.current, { rotation: -6, duration: 0.15, yoyo: true, repeat: 7, transformOrigin: 'center' });
      gsap.to([armLeftRef.current, armRightRef.current], { scaleY: 1.2, duration: 0.2, yoyo: true, repeat: 3 });
      gsap.to(mouthRef.current, { attr: { d: 'M65 145 Q100 180 135 145' }, duration: 0.3 });
      gsap.to(sparkleRef.current, { opacity: 1, scale: 1.5, duration: 0.6, yoyo: true, repeat: 1 });
    } else if (name === 'thinking') {
      gsap.to(bodyRef.current, { rotation: -4, duration: 0.8, transformOrigin: 'center' });
      gsap.to(mouthRef.current, { attr: { d: 'M85 155 L115 155' }, duration: 0.25 });
    } else if (name === 'teaching') {
      gsap.to(bodyRef.current, { rotation: 2, duration: 0.4, transformOrigin: 'center' });
      gsap.to(armRightRef.current, { rotation: -25, transformOrigin: 'top center', duration: 0.4, yoyo: true, repeat: 1 });
      gsap.to(mouthRef.current, { attr: { d: 'M75 155 Q100 168 125 155' }, duration: 0.3 });
    } else {
      // idle
      gsap.to(bodyRef.current, { rotation: 0, duration: 0.3 });
      gsap.to(mouthRef.current, { attr: { d: 'M80 152 Q100 162 120 152' }, duration: 0.3 });
    }
  };

  useImperativeHandle(ref, () => ({ playExpression }));

  useEffect(() => {
    startIdle();
    playExpression(expression);
    return () => {
      if (idleTl.current) idleTl.current.kill();
      if (blinkTl.current) blinkTl.current.kill();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    playExpression(expression);
  }, [expression]);

  return (
    <div
      ref={rootRef}
      style={{ width: size, height: size * 1.2, display: 'inline-block' }}
      aria-label="Kavach the shield mascot"
      data-testid="kavach-mascot"
    >
      <svg viewBox="0 0 200 240" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8E99F3" />
            <stop offset="50%" stopColor="#5C6BC0" />
            <stop offset="100%" stopColor="#3949AB" />
          </linearGradient>
          <radialGradient id="faceGradient" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#C5CAE9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="shieldShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity="0.35" />
          </filter>
        </defs>
        <g ref={bodyRef} filter="url(#shieldShadow)">
          {/* Shield body */}
          <path d="M100 20 L180 60 L180 140 Q180 200 100 220 Q20 200 20 140 L20 60 Z" fill="url(#shieldGradient)" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
          <path d="M100 20 L180 60 L180 140 Q180 200 100 220 Q20 200 20 140 L20 60 Z" fill="url(#faceGradient)" opacity="0.55" />
          {/* Checkmark emblem on chest */}
          <path d="M75 170 L92 185 L125 155" stroke="#FFD700" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />

          {/* Arms */}
          <g ref={armLeftRef}>
            <path d="M22 108 Q-5 120 2 140" stroke="#5C6BC0" strokeWidth="10" fill="none" strokeLinecap="round" />
            <circle cx="2" cy="142" r="8" fill="#C5CAE9" />
          </g>
          <g ref={armRightRef}>
            <path d="M178 108 Q205 120 198 140" stroke="#5C6BC0" strokeWidth="10" fill="none" strokeLinecap="round" />
            <circle cx="198" cy="142" r="8" fill="#C5CAE9" />
          </g>

          {/* Eyes */}
          <g ref={eyesRef}>
            <ellipse cx="70" cy="110" rx="16" ry="18" fill="white" />
            <ellipse cx="130" cy="110" rx="16" ry="18" fill="white" />
            <circle ref={pupilLeftRef} cx="72" cy="114" r="8" fill="#0B1020" />
            <circle ref={pupilRightRef} cx="132" cy="114" r="8" fill="#0B1020" />
            {/* Eye sparkles */}
            <circle cx="75" cy="110" r="3" fill="white" />
            <circle cx="135" cy="110" r="3" fill="white" />
          </g>

          {/* Mouth */}
          <path ref={mouthRef} d="M80 152 Q100 162 120 152" stroke="#0B1020" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Tear */}
          <circle ref={tearRef} cx="72" cy="130" r="3" fill="#4facfe" opacity="0" />

          {/* Sparkles */}
          <g ref={sparkleRef} opacity="0">
            <text x="30" y="45" fontSize="20" fill="#FFD700">✨</text>
            <text x="160" y="50" fontSize="16" fill="#FFD700">⭐</text>
            <text x="170" y="190" fontSize="14" fill="#FFD700">✨</text>
          </g>
        </g>
      </svg>
    </div>
  );
});

Kavach.displayName = 'Kavach';
export default Kavach;
