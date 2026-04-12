import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Box, Typography } from '@mui/material';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const dotsRef = useRef([]);
  const counterRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(loaderRef.current, { opacity: 1 });

    // Animate dots
    tl.to(dotsRef.current, {
      scaleY: 1.5,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 3
    }, 0);

    // Animate counter
    let count = { val: 0 };
    tl.to(count, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(count.val) + '%';
        }
      }
    }, 0);

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0);

    // Text reveal
    tl.fromTo(textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    , 0.3);

    // Fade out loader
    tl.to(loaderRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.3,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <Box
      ref={loaderRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Animated background circles */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${150 + i * 100}px`,
            height: `${150 + i * 100}px`,
            borderRadius: '50%',
            border: `1px solid rgba(255,255,255,${0.05 - i * 0.008})`,
            animation: `pulse ${2 + i * 0.5}s ease-in-out infinite alternate`,
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)', opacity: 0.3 },
              '100%': { transform: 'scale(1.1)', opacity: 0.1 }
            }
          }}
        />
      ))}

      {/* Logo / Name */}
      <Box ref={textRef} sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
        <Typography
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 900,
            fontFamily: '"Space Mono", monospace',
            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-2px',
            lineHeight: 1
          }}
        >
          PARAM
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 900,
            fontFamily: '"Space Mono", monospace',
            background: 'linear-gradient(90deg, #f093fb, #f5576c, #667eea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-2px',
            lineHeight: 1
          }}
        >
          PARIKH
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem',
            letterSpacing: '6px',
            mt: 1,
            textTransform: 'uppercase'
          }}
        >
          Software & AI-ML Developer
        </Typography>
      </Box>

      {/* Equalizer bars */}
      <Box sx={{ display: 'flex', gap: '6px', mb: 4, alignItems: 'center', height: '40px' }}>
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            ref={el => dotsRef.current[i] = el}
            sx={{
              width: '4px',
              height: `${15 + Math.random() * 25}px`,
              background: `linear-gradient(180deg, #667eea, #764ba2)`,
              borderRadius: '2px',
              animation: `equalizer ${0.4 + Math.random() * 0.6}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.08}s`,
              '@keyframes equalizer': {
                '0%': { transform: 'scaleY(0.3)', opacity: 0.5 },
                '100%': { transform: 'scaleY(1.5)', opacity: 1 }
              }
            }}
          />
        ))}
      </Box>

      {/* Progress bar */}
      <Box sx={{ width: '300px', position: 'relative' }}>
        <Box
          sx={{
            width: '100%',
            height: '2px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '1px',
            overflow: 'hidden'
          }}
        >
          <Box
            ref={progressRef}
            sx={{
              height: '100%',
              width: '0%',
              background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
              borderRadius: '1px',
              boxShadow: '0 0 10px rgba(102,126,234,0.8)'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 1.5,
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.3)',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.65rem',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}
          >
            Loading
          </Typography>
          <Typography
            ref={counterRef}
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            0%
          </Typography>
        </Box>
      </Box>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: '50%',
            background: `rgba(${102 + Math.random() * 100}, ${126 + Math.random() * 50}, ${234}, ${0.3 + Math.random() * 0.5})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.5 },
              '50%': { transform: `translateY(${-20 - Math.random() * 30}px) rotate(180deg)`, opacity: 1 }
            }
          }}
        />
      ))}
    </Box>
  );
};

export default Loader;
