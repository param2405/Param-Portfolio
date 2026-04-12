import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container, Chip, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { devData } from '../data/portfolioData';

const Home = () => {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ctaRef = useRef();
  const tagsRef = useRef([]);
  const scrollHintRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(titleRef.current,
      { y: 80, opacity: 0, skewX: -5 },
      { y: 0, opacity: 1, skewX: 0, duration: 1, ease: 'power4.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    , '-=0.5')
    .fromTo(tagsRef.current,
      { y: 30, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' }
    , '-=0.3')
    .fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    , '-=0.2')
    .fromTo(scrollHintRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );

    // Scroll hint bounce
    const scrollTween = gsap.to(scrollHintRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut'
    });

    return () => {
      scrollTween.kill();
      tl.kill();
    };
  }, []);

  const tags = ['React.js', 'Node.js', 'TypeScript', 'Python', 'Machine Learning', 'AI', 'LLMs', 'NLP', 'Scikit-Learn', 'Deep Learning',  'MongoDB', 'AWS', 'Docker'];

  return (
    <Box
      ref={heroRef}
      id="home"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fafbfe',
        backgroundImage: `
          radial-gradient(1200px 800px at 12% 18%, rgba(102, 126, 234, 0.14), transparent 55%),
          radial-gradient(900px 700px at 88% 12%, rgba(240, 147, 251, 0.1), transparent 50%),
          radial-gradient(800px 600px at 70% 85%, rgba(118, 75, 162, 0.08), transparent 55%),
          linear-gradient(180deg, #fafbfe 0%, #f4f6fd 45%, #faf8fc 100%)
        `,
        '@keyframes heroFloat': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        '@keyframes heroPulse': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.03)' },
        },
      }}
    >
      {/* Soft mesh (blurred) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 25% 40%, rgba(102,126,234,0.14) 0%, transparent 42%), radial-gradient(circle at 75% 60%, rgba(118,75,162,0.11) 0%, transparent 40%)',
          filter: 'blur(48px)',
          opacity: 0.85,
        }}
      />

      {/* Atmosphere: soft radials + subtle grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(102,126,234,0.07) 0%, transparent 52%),
            radial-gradient(ellipse at 82% 22%, rgba(118,75,162,0.06) 0%, transparent 48%),
            radial-gradient(rgba(102,126,234,0.11) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, 24px 24px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 42%, black 25%, transparent 72%)',
        }}
      />

      {/* Film grain */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: { xs: 0.03, md: 0.045 },
          mixBlendMode: 'multiply',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 10, md: 0 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center" columnSpacing={{ md: 6 }}>
          <Grid item xs={12} md={6}>
        <Box sx={{ maxWidth: { xs: '100%', md: '640px' } }}>
          {/* Greeting chip */}
          <Chip
            label="👋 Available for opportunities"
            sx={{
              mb: 1,
              mt: { xs: 2, md: 6 },
              background: 'rgba(102,126,234,0.1)',
              border: '1px solid rgba(102,126,234,0.3)',
              color: '#667eea',
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 600,
              backdropFilter: 'blur(10px)'
            }}
          />

          <Typography
            ref={titleRef}
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
              fontWeight: 900,
              fontFamily: '"Clash Display", "Space Grotesk", sans-serif',
              lineHeight: 1.05,
              mb: 2,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #302b63 50%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Hi, I'm<br />
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Param Parikh
            </Box>
          </Typography>

          <Typography
            ref={subtitleRef}
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              color: '#5a6080',
              fontFamily: '"Space Mono", monospace',
              mb: 4,
              lineHeight: 1.7
            }}
          >
            Full Stack & AI-ML Developer crafting <Box component="span" sx={{ color: '#667eea', fontWeight: 700 }}>scalable web apps</Box> and <Box component="span" sx={{ color: '#764ba2', fontWeight: 700 }}>clean architectures</Box> with modern technologies.
          </Typography>

          {/* Skill tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 5 }}>
            {tags.map((tag, i) => (
              <Chip
                key={tag}
                ref={el => tagsRef.current[i] = el}
                label={tag}
                sx={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(102,126,234,0.2)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.7rem',
                  backdropFilter: 'blur(10px)',
                  color: '#4a4a7a',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(102,126,234,0.15)',
                    borderColor: '#667eea',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 15px rgba(102,126,234,0.2)'
                  }
                }}
              />
            ))}
          </Box>

          {/* CTAs */}
          <Box ref={ctaRef} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, pb: 2 }}>
            <Button
              href="#projects"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.85rem',
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: '0 8px 30px rgba(102,126,234,0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 15px 40px rgba(102,126,234,0.5)',
                  background: 'linear-gradient(135deg, #5a72e0 0%, #6a4296 100%)'
                }
              }}
            >
              View My Work →
            </Button>
            <Button
              href="#contact"
              variant="outlined"
              sx={{
                borderColor: 'rgba(102,126,234,0.4)',
                color: '#667eea',
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.85rem',
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 700,
                backdropFilter: 'blur(10px)',
                background: 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  background: 'rgba(102,126,234,0.08)',
                  borderColor: '#667eea',
                  boxShadow: '0 8px 25px rgba(102,126,234,0.2)'
                }
              }}
            >
              Let's Talk
            </Button>
          </Box>
        </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                position: 'relative',
                minHeight: 380,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pr: { md: 2 },
              }}
            >
              {/* Decorative rings */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 320,
                  height: 320,
                  borderRadius: '50%',
                  border: '1px solid rgba(102,126,234,0.12)',
                  animation: 'heroPulse 8s ease-in-out infinite',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 240,
                  height: 240,
                  borderRadius: '50%',
                  border: '1px dashed rgba(118,75,162,0.2)',
                }}
              />
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  maxWidth: 320,
                  animation: 'heroFloat 6s ease-in-out infinite',
                }}
              >
                <Box
                  sx={{
                    borderRadius: '24px',
                    p: 2.5,
                    mb: 2,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(248,249,255,0.95))',
                    border: '1px solid rgba(102,126,234,0.18)',
                    boxShadow: '0 20px 60px rgba(102,126,234,0.12)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.7rem',
                      color: '#764ba2',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      mb: 1.5,
                    }}
                  >
                    Focus
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Clash Display", "Space Grotesk", sans-serif',
                      fontWeight: 800,
                      fontSize: '1.35rem',
                      lineHeight: 1.2,
                      background: 'linear-gradient(135deg, #1a1a2e, #667eea)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Full Stack & AI/ML
                  </Typography>
                  <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#6a6a8e', mt: 1, lineHeight: 1.6 }}>
                    Shipping products end-to-end — from UI and APIs to models and deployment.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {devData.stats.map((s) => (
                    <Box
                      key={s.label}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        px: 2,
                        py: 1.25,
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.75)',
                        border: '1px solid rgba(102,126,234,0.12)',
                        boxShadow: '0 8px 24px rgba(102,126,234,0.06)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography component="span" sx={{ fontSize: '1.25rem' }}>{s.icon}</Typography>
                        <Typography sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.72rem', color: '#5a6080' }}>
                          {s.label}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#667eea' }}>
                        {s.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll indicator */}
      <Box
        ref={scrollHintRef}
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          zIndex: 2
        }}
      >
        <Typography sx={{ fontSize: '0.65rem', color: '#9a9abf', fontFamily: '"Space Mono", monospace', letterSpacing: '3px' }}>
          SCROLL
        </Typography>
        <Box sx={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(180deg, #667eea, transparent)',
          animation: 'none'
        }} />
      </Box>
    </Box>
  );
};

export default Home;
