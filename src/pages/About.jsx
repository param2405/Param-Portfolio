import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, LinearProgress } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// Inline coding animation (SVG lottie-like)
const CodingAnimation = () => (
  <Box sx={{
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    mx: 'auto'
  }}>
    {/* Code editor mockup */}
    <Box sx={{
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(102,126,234,0.25)',
      border: '1px solid rgba(102,126,234,0.2)'
    }}>
      {/* Editor top bar */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        px: 2, py: 1.5,
        background: 'rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
          <Box key={i} sx={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
        ))}
        <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', ml: 1, fontFamily: 'monospace' }}>
          param.js
        </Typography>
      </Box>
      {/* Code lines */}
      <Box sx={{ p: 3, fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', lineHeight: 2 }}>
        {[
          { color: '#764ba2', text: 'const ', accent: '#f093fb', rest: 'developer = {' },
          { indent: true, color: '#667eea', key: '  name:', value: ' "Param Parikh",' },
          { indent: true, color: '#667eea', key: '  skills:', value: ' ["React", "Node", "Python", "Machine Learning", "AI"],' },
          { indent: true, color: '#667eea', key: '  passion:', value: ' "Building great Softwares",' },
          { indent: true, color: '#28c840', key: '  available:', value: ' true' },
          { color: '#ffffff', text: '};' },
        ].map((line, i) => (
          <Box key={i} sx={{
            display: 'flex',
            animation: `fadeInLine 0.5s ease forwards`,
            animationDelay: `${i * 0.15}s`,
            opacity: 0,
            '@keyframes fadeInLine': {
              from: { opacity: 0, x: -10 },
              to: { opacity: 1, x: 0 }
            }
          }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', mr: 2, minWidth: '20px', fontFamily: 'monospace' }}>
              {i + 1}
            </Typography>
            {line.text && (
              <Typography sx={{ color: line.color, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {line.text}<Box component="span" sx={{ color: line.accent }}>{line.rest}</Box>
              </Typography>
            )}
            {line.key && (
              <Typography sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                <Box component="span" sx={{ color: '#667eea' }}>{line.key}</Box>
                <Box component="span" sx={{ color: '#f093fb' }}>{line.value}</Box>
              </Typography>
            )}
          </Box>
        ))}
        {/* Blinking cursor */}
        <Box sx={{
          display: 'inline-block',
          width: '2px',
          height: '16px',
          background: '#667eea',
          ml: 8,
          animation: 'blink 1s step-end infinite',
          '@keyframes blink': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0 }
          }
        }} />
      </Box>
    </Box>

    {/* Floating badges */}
    {[
      { text: '3+ Years Exp.', top: '-20px', right: '-20px', color: '#667eea' },
      { text: '20+ Projects', bottom: '30px', left: '-30px', color: '#764ba2' },
      { text: 'Full Stack / AI-ML', bottom: '-15px', right: '40px', color: '#f093fb' }
    ].map((badge, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          ...badge,
          background: 'white',
          borderRadius: '12px',
          px: 2,
          py: 1,
          boxShadow: `0 8px 25px ${badge.color}30`,
          border: `1px solid ${badge.color}30`,
          animation: `floatBadge ${2 + i * 0.5}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.3}s`,
          '@keyframes floatBadge': {
            '0%': { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(-8px)' }
          }
        }}
      >
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: badge.color, fontFamily: '"Space Mono", monospace', whiteSpace: 'nowrap' }}>
          {badge.text}
        </Typography>
      </Box>
    ))}
  </Box>
);

const SkillBar = ({ skill, level, index }) => {
  const barRef = useRef();
  const fillRef = useRef();

  useEffect(() => {
    gsap.fromTo(fillRef.current,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          once: true
        },
        delay: index * 0.1
      }
    );
  }, [level, index]);

  return (
    <Box ref={barRef} sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.8rem', color: '#4a4a7a', fontWeight: 600 }}>
          {skill}
        </Typography>
        <Typography sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: '#667eea' }}>
          {level}%
        </Typography>
      </Box>
      <Box sx={{ height: '6px', background: 'rgba(102,126,234,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <Box
          ref={fillRef}
          sx={{
            height: '100%',
            width: '0%',
            background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(102,126,234,0.4)'
          }}
        />
      </Box>
    </Box>
  );
};

const About = () => {
  const sectionRef = useRef();
  const headingRef = useRef();
  const textRef = useRef();
  const statsRef = useRef([]);
  const imageRef = useRef();

  const skillLevels = [
    { skill: 'React.js / Next.js', level: 92 },
    { skill: 'Node.js / Express', level: 91 },
    { skill: 'Machine Learning / AI', level: 92 },
    { skill: 'MongoDB / PostgreSQL', level: 82 },
    { skill: 'TypeScript', level: 85 },
    // { skill: 'Docker / Kubernetes', level: 75 },
    // { skill: 'AWS / Cloud Services', level: 78 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
        }
      );

      gsap.fromTo(textRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      gsap.fromTo(imageRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 30, opacity: 0, scale: 0.8 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.5, delay: i * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="about"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* BG decoration */}
      <Box sx={{
        position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102,126,234,0.06) 0%, transparent 70%)'
      }} />

      <Container maxWidth="lg">
        {/* Section label */}
        <Box ref={headingRef} sx={{ mb: 8, textAlign: 'center' }}>
          <Typography sx={{
            color: '#667eea', fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem', letterSpacing: '4px', mb: 2, textTransform: 'uppercase'
          }}>
            — About Me
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontFamily: '"Clash Display", sans-serif',
            background: 'linear-gradient(135deg, #1a1a2e, #302b63)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            The Story Behind the Code
          </Typography>
        </Box>

        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box ref={imageRef}>
              <CodingAnimation />
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box ref={textRef}>
              <Typography sx={{
                fontSize: '1.1rem', color: '#5a6080', lineHeight: 1.9,
                fontFamily: '"DM Sans", sans-serif', mb: 4
              }}>
                {devData.about}
              </Typography>

              {/* Stats */}
              <Grid container spacing={2} sx={{ mb: 5 }}>
                {devData.stats.map((stat, i) => (
                  <Grid item xs={6} sm={3} key={i}>
                    <Box
                      ref={el => statsRef.current[i] = el}
                      sx={{
                        textAlign: 'center', p: 2,
                        background: 'linear-gradient(135deg, #f8f9ff, #ffffff)',
                        borderRadius: '16px',
                        border: '1px solid rgba(102,126,234,0.12)',
                        boxShadow: '0 4px 20px rgba(102,126,234,0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 30px rgba(102,126,234,0.15)'
                        }
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>{stat.icon}</Typography>
                      <Typography sx={{
                        fontFamily: '"Space Mono", monospace', fontWeight: 800,
                        fontSize: '1.3rem', color: '#667eea'
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#9a9abf', fontFamily: '"Space Mono", monospace' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Skill bars */}
              <Typography sx={{
                fontFamily: '"Space Mono", monospace', fontWeight: 700,
                fontSize: '0.8rem', color: '#4a4a7a', mb: 2, letterSpacing: '2px', textTransform: 'uppercase'
              }}>
                Core Proficiency
              </Typography>
              {skillLevels.map((s, i) => (
                <SkillBar key={s.skill} skill={s.skill} level={s.level} index={i} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
