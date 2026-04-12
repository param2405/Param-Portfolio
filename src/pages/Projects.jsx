import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Grid, Chip, Button } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

/** Resolves project.live to a safe external URL (avoids relative links like www... on localhost). */
function getLiveHref(live) {
  if (live == null || live === '') return null;
  const s = String(live).trim();
  if (s === '#' || s.startsWith('#')) return null;
  if (/^https?:\/\//i.test(s)) return s;
  if (!/[\s/]/.test(s) && /^[\w.-]+\.[\w.-]+$/i.test(s)) return `https://${s}`;
  return null;
}

const FlipCard = ({ project, index }) => {
  const liveHref = getLiveHref(project.live);
  const showLiveDemo = project.liveDemo !== false && liveHref != null;
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.7,
        delay: (index % 3) * 0.15,
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
        height: { xs: '400px', sm: '420px' },
        maxWidth: '100%',
        perspective: '1000px',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        {/* Front */}
        <Box sx={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(145deg, #ffffff, #f8f9ff)',
          borderRadius: '20px',
          border: '1px solid rgba(102,126,234,0.12)',
          boxShadow: '0 8px 30px rgba(102,126,234,0.1)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          p: { xs: 2.5, sm: 3 },
          overflow: 'hidden'
        }}>
          {/* Decorative circle */}
          <Box sx={{
            position: 'absolute', top: -30, right: -30,
            width: '120px', height: '120px', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.06))'
          }} />

          <Typography sx={{ fontSize: '3rem', mb: 1, flexShrink: 0, lineHeight: 1 }}>{project.image}</Typography>

          <Typography sx={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: '1.3rem', fontWeight: 700,
            color: '#1a1a2e', mb: 1, flexShrink: 0, lineHeight: 1.2,
          }}>
            {project.name}
          </Typography>

          <Typography sx={{
            fontSize: '0.88rem', color: '#6a6a8e', lineHeight: 1.7,
            fontFamily: '"DM Sans", sans-serif',
            flex: '1 1 0%',
            minHeight: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}>
            {project.description.substring(0, 100)}...
          </Typography>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.75,
            alignContent: 'flex-start',
            mt: 'auto',
            pt: 1.5,
            flexShrink: 0,
            maxHeight: { xs: '118px', sm: '132px' },
            overflowY: 'auto',
            pr: 0.25,
            '&::-webkit-scrollbar': { width: 5 },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(102,126,234,0.25)',
              borderRadius: 3,
            },
          }}>
            {project.tech.map(t => (
              <Chip key={t} label={t} size="small" sx={{
                fontFamily: '"Space Mono", monospace', fontSize: '0.65rem',
                background: 'rgba(102,126,234,0.08)', color: '#667eea',
                border: '1px solid rgba(102,126,234,0.2)',
                height: 'auto',
                '& .MuiChip-label': { py: 0.45, px: 0.9, whiteSpace: 'normal' },
              }} />
            ))}
          </Box>

          <Typography sx={{
            mt: 1.5, flexShrink: 0, fontSize: '0.72rem', color: '#b0b0d0',
            fontFamily: '"Space Mono", monospace', textAlign: 'center'
          }}>
            Hover to see more ✦
          </Typography>
        </Box>

        {/* Back */}
        <Box sx={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, #1a1a2e, #302b63)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
          p: { xs: 2.5, sm: 3 },
          overflow: 'hidden'
        }}>
          <Typography sx={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: { xs: '1.15rem', sm: '1.3rem' },
            fontWeight: 700,
            color: 'white',
            mb: 1.5,
            flexShrink: 0,
            lineHeight: 1.25,
          }}>
            {project.name}
          </Typography>
          <Typography sx={{
            fontSize: { xs: '0.8rem', sm: '0.88rem' },
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.65,
            fontFamily: '"DM Sans", sans-serif',
            flex: '1 1 0%',
            minHeight: 0,
            overflowY: 'auto',
            pr: 0.5,
            mb: 1.5,
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(102,126,234,0.35)',
              borderRadius: 3,
            },
          }}>
            {project.description}
          </Typography>

          <Box sx={{ flexShrink: 0, mt: 'auto', pt: 0.5 }}>
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0.75,
              alignContent: 'flex-start',
              mb: 2,
            }}>
              {project.tech.map(t => (
                <Chip key={t} label={t} size="small" sx={{
                  fontFamily: '"Space Mono", monospace', fontSize: '0.65rem',
                  background: 'rgba(102,126,234,0.2)', color: '#a0b4ff',
                  border: '1px solid rgba(102,126,234,0.3)',
                  height: 'auto',
                  '& .MuiChip-label': { py: 0.5, px: 1, whiteSpace: 'normal' },
                }} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                href={project.github}
                size="small"
                variant="outlined"
                sx={{
                  color: 'white', borderColor: 'rgba(255,255,255,0.3)',
                  fontFamily: '"Space Mono", monospace', fontSize: '0.7rem',
                  textTransform: 'none', borderRadius: '20px', px: 2,
                  '&:hover': { borderColor: '#667eea', background: 'rgba(102,126,234,0.2)' }
                }}
              >
                GitHub →
              </Button>
              {showLiveDemo && (
                <Button
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    fontFamily: '"Space Mono", monospace', fontSize: '0.7rem',
                    textTransform: 'none', borderRadius: '20px', px: 2,
                    '&:hover': { background: 'linear-gradient(135deg, #5a72e0, #6a4296)' }
                  }}
                >
                  Live Demo
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Projects = () => {
  const sectionRef = useRef();
  const headingRef = useRef();

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      }
    );
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="projects"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f2ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* BG pattern */}
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `radial-gradient(#667eea 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      <Container maxWidth="lg">
        <Box ref={headingRef} sx={{ mb: 8, textAlign: 'center' }}>
          <Typography sx={{
            color: '#667eea', fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem', letterSpacing: '4px', mb: 2, textTransform: 'uppercase'
          }}>
            — My Work
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontFamily: '"Clash Display", sans-serif',
            background: 'linear-gradient(135deg, #1a1a2e, #302b63)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            mb: 2
          }}>
            Projects That Speak
          </Typography>
          <Typography sx={{ color: '#7a7aa0', fontFamily: '"DM Sans", sans-serif', fontSize: '1rem' }}>
            Hover over cards to explore — built with passion and purpose
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {devData.projects.map((project, i) => (
            <Grid item xs={12} sm={6} md={4} key={project.name}>
              <FlipCard project={project} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
