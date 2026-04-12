import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const SkillCategory = ({ title, skills, icon, color, index }) => {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0, rotateX: 15 },
      {
        y: 0, opacity: 1, rotateX: 0,
        duration: 0.8,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 88%',
          once: true
        }
      }
    );
  }, [index]);

  return (
    <Box
      ref={cardRef}
      sx={{
        background: 'white',
        borderRadius: '24px',
        p: 4,
        border: '1px solid rgba(102,126,234,0.1)',
        boxShadow: '0 8px 30px rgba(102,126,234,0.06)',
        height: '100%',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 25px 50px ${color}25`,
          borderColor: `${color}30`
        },
        '&:hover .skill-glow': {
          opacity: 1
        }
      }}
    >
      {/* BG glow */}
      <Box
        className="skill-glow"
        sx={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          opacity: 0, transition: 'opacity 0.3s ease'
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box sx={{
          width: 48, height: 48, borderRadius: '14px',
          background: `${color}15`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          {icon}
        </Box>
        <Typography sx={{
          fontFamily: '"Clash Display", sans-serif',
          fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e'
        }}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill, i) => (
          <Chip
            key={skill}
            label={skill}
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.7rem',
              background: `${color}08`,
              color: color,
              border: `1px solid ${color}25`,
              transition: 'all 0.2s ease',
              '&:hover': {
                background: `${color}18`,
                transform: 'scale(1.05)',
                boxShadow: `0 4px 12px ${color}20`
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const Skills = () => {
  const sectionRef = useRef();
  const headingRef = useRef();
  const marqueeRef = useRef();

  const categories = [
    { title: 'Frontend', skills: devData.skills.frontend, icon: '🎨', color: '#667eea' },
    { title: 'Backend', skills: devData.skills.backend, icon: '⚙️', color: '#764ba2' },
    { title: 'Machine Learning / AI', skills: devData.skills.MachineLearning, icon: '🧠', color: '#9b59b6' },
    { title: 'Databases', skills: devData.skills.database, icon: '🗄️', color: '#f093fb' },
    { title: 'DevOps & Cloud', skills: devData.skills.devops, icon: '☁️', color: '#4facfe' },
    { title: 'Tools & Others', skills: devData.skills.tools, icon: '🛠️', color: '#43e97b' }
  ];

  const allSkills = Object.values(devData.skills).flat();

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
    );

    // Marquee scroll
    gsap.to(marqueeRef.current, {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1
    });
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="skills"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #f0f2ff 0%, #f8f9ff 100%)',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Box ref={headingRef} sx={{ mb: 8, textAlign: 'center' }}>
          <Typography sx={{
            color: '#667eea', fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem', letterSpacing: '4px', mb: 2, textTransform: 'uppercase'
          }}>
            — My Arsenal
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontFamily: '"Clash Display", sans-serif',
            background: 'linear-gradient(135deg, #1a1a2e, #302b63)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            Skills & Technologies
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {categories.map((cat, i) => (
            <Grid item xs={12} sm={6} md={4} key={cat.title}>
              <SkillCategory {...cat} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Marquee */}
      <Box sx={{ overflow: 'hidden', py: 2, borderTop: '1px solid rgba(102,126,234,0.1)', borderBottom: '1px solid rgba(102,126,234,0.1)' }}>
        <Box ref={marqueeRef} sx={{ display: 'flex', gap: 3, width: 'max-content' }}>
          {[...allSkills, ...allSkills].map((skill, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography sx={{
                fontFamily: '"Space Mono", monospace', fontSize: '0.8rem',
                color: '#9a9abf', whiteSpace: 'nowrap', fontWeight: 500
              }}>
                {skill}
              </Typography>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(102,126,234,0.3)' }} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
