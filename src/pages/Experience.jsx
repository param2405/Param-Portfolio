import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ exp, index, isLeft }) => {
  const cardRef = useRef();
  const dotRef = useRef();

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { x: isLeft ? -60 : 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );

    gsap.fromTo(dotRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: dotRef.current,
          start: 'top 85%',
          once: true
        }
      }
    );
  }, [isLeft]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4, position: 'relative' }}>
      {/* Timeline dot */}
      <Box
        ref={dotRef}
        sx={{
          position: 'absolute',
          left: { xs: '0', md: '50%' },
          transform: { xs: 'none', md: 'translateX(-50%)' },
          width: 16, height: 16,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          border: '3px solid white',
          boxShadow: '0 0 0 3px rgba(102,126,234,0.2)',
          zIndex: 2,
          mt: 2
        }}
      />

      {/* Card */}
      <Box
        ref={cardRef}
        sx={{
          ml: { xs: 4, md: isLeft ? 0 : '55%' },
          mr: { xs: 0, md: isLeft ? '55%' : 0 },
          width: { xs: '100%', md: '45%' },
          background: 'white',
          borderRadius: '20px',
          p: 3.5,
          border: '1px solid rgba(102,126,234,0.12)',
          boxShadow: '0 8px 30px rgba(102,126,234,0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 50px rgba(102,126,234,0.15)',
            borderColor: 'rgba(102,126,234,0.25)'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
          <Typography sx={{
            fontFamily: '"Clash Display", sans-serif',
            fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e'
          }}>
            {exp.role}
          </Typography>
          <Chip
            label={exp.period}
            size="small"
            sx={{
              background: 'rgba(102,126,234,0.08)', color: '#667eea',
              fontFamily: '"Space Mono", monospace', fontSize: '0.65rem',
              border: '1px solid rgba(102,126,234,0.2)'
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography sx={{
            fontFamily: '"Space Mono", monospace', fontSize: '0.8rem',
            fontWeight: 700, color: '#667eea'
          }}>
            {exp.company}
          </Typography>
          <Box sx={{ width: '4px', height: '4px', borderRadius: '50%', background: '#c0c0e0' }} />
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#9a9abf' }}>
            {exp.location}
          </Typography>
        </Box>

        {exp.description ? (
          <Typography sx={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.88rem',
            color: '#5a6080', lineHeight: 1.7, mb: 2
          }}
          >
            {exp.description}
          </Typography>
        ) : null}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {exp.tech.map(t => (
            <Chip key={t} label={t} size="small" sx={{
              fontFamily: '"Space Mono", monospace', fontSize: '0.65rem',
              background: 'rgba(118,75,162,0.06)', color: '#764ba2',
              border: '1px solid rgba(118,75,162,0.15)'
            }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const Experience = () => {
  const sectionRef = useRef();
  const headingRef = useRef();
  const lineRef = useRef();

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
    );

    gsap.fromTo(lineRef.current,
      { height: 0 },
      {
        height: '100%', duration: 1.5, ease: 'power2.inOut',
        scrollTrigger: { trigger: lineRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 1 }
      }
    );
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="experience"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'white',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Box ref={headingRef} sx={{ mb: 8, textAlign: 'center' }}>
          <Typography sx={{
            color: '#667eea', fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem', letterSpacing: '4px', mb: 2, textTransform: 'uppercase'
          }}>
            — Journey
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontFamily: '"Clash Display", sans-serif',
            background: 'linear-gradient(135deg, #1a1a2e, #302b63)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            Experience & Education
          </Typography>
        </Box>

        {/* Timeline */}
        <Box sx={{ position: 'relative' }}>
          {/* Timeline line */}
          <Box sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
            background: 'rgba(102,126,234,0.1)', transform: 'translateX(-50%)', zIndex: 1
          }}>
            <Box
              ref={lineRef}
              sx={{
                width: '100%', height: '0%',
                background: 'linear-gradient(180deg, #667eea, #764ba2, #f093fb)',
                borderRadius: '1px'
              }}
            />
          </Box>

          {devData.experience?.map((exp, i) => (
            <ExperienceCard
              key={`${exp.company}-${exp.period}`}
              exp={exp}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </Box>

        {devData.education?.length > 0 && (
  <Box sx={{ mt: { xs: 8, md: 10 } }}>
    <Typography sx={{
      fontFamily: '"Clash Display", sans-serif',
      fontWeight: 700,
      fontSize: { xs: '1.5rem', md: '1.8rem' },
      color: '#1a1a2e',
      mb: 1,
      textAlign: 'center',
    }}>
      Education
    </Typography>
    <Typography sx={{
      textAlign: 'center',
      color: '#9a9abf',
      fontFamily: '"Space Mono", monospace',
      fontSize: '0.75rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      mb: 4,
    }}>
      Academic background
    </Typography>

    <Grid container spacing={3} justifyContent="center">
      {devData.education.map((edu) => (
          <Grid item xs={12} md={8} key={edu.institution}>
            <Box sx={{
              p: { xs: 3, md: 3.5 },
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f8f9ff, #ffffff)',
              border: '1px solid rgba(102,126,234,0.12)',
              boxShadow: '0 8px 30px rgba(102,126,234,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 50px rgba(102,126,234,0.15)',
                borderColor: 'rgba(102,126,234,0.25)'
              }
            }}>
              {/* Degree */}
              <Typography sx={{
                fontFamily: '"Clash Display", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: '#1a1a2e',
                mb: 1,
              }}>
                {edu.degree}
              </Typography>

              {/* Institution */}
              <Typography sx={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#667eea',
                mb: 2,
              }}>
                {edu.institution}
              </Typography>

              {/* Period + Grade chips */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', mb: 2 }}>
                <Chip
                  label={edu.period}
                  size="small"
                  sx={{
                    background: 'rgba(102,126,234,0.08)',
                    color: '#667eea',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.7rem',
                    border: '1px solid rgba(102,126,234,0.2)',
                  }}
                />
                {edu.grade && (
                  <Chip
                    label={edu.grade}
                    size="small"
                    sx={{
                      background: 'rgba(118,75,162,0.08)',
                      color: '#764ba2',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.7rem',
                      border: '1px solid rgba(118,75,162,0.2)',
                    }}
                  />
                )}
              </Box>

              {/* Description (if any) */}
              {edu.description && (
                <Typography sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.88rem',
                  color: '#5a6080',
                  lineHeight: 1.7,
                  mb: 2.5
                }}>
                  {edu.description}
                </Typography>
              )}

              {/* ✅ Tech Stack – exactly like your image buttons */}
              {edu.tech && edu.tech.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {edu.tech.map((techItem) => (
                    <Chip
                      key={techItem}
                      label={techItem}
                      size="small"
                      sx={{
                        fontFamily: '"Space Mono", monospace',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        background: 'rgba(102,126,234,0.1)',
                        color: '#4a4a7a',
                        border: '1px solid rgba(102,126,234,0.2)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white',
                          borderColor: 'transparent',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )}

        {/* Certifications: change `false` to e.g. (devData.certifications?.length > 0) after uncommenting certifications in portfolioData.js */}
        {false && (
          <Box sx={{ mt: 10 }}>
            <Typography sx={{
              fontFamily: '"Clash Display", sans-serif', fontWeight: 700,
              fontSize: '1.8rem', color: '#1a1a2e', mb: 4, textAlign: 'center'
            }}>
              Certifications
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {(devData.certifications || []).map((cert) => (
                <Grid item xs={12} sm={6} md={3} key={cert}>
                  <Box sx={{
                    p: 2.5, textAlign: 'center',
                    background: 'linear-gradient(135deg, #f8f9ff, white)',
                    borderRadius: '16px',
                    border: '1px solid rgba(102,126,234,0.12)',
                    boxShadow: '0 4px 20px rgba(102,126,234,0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 15px 35px rgba(102,126,234,0.15)'
                    }
                  }}
                  >
                    <Typography sx={{ fontSize: '1.5rem', mb: 1 }}>🏆</Typography>
                    <Typography sx={{
                      fontFamily: '"Space Mono", monospace', fontSize: '0.72rem',
                      color: '#4a4a7a', fontWeight: 600, lineHeight: 1.5
                    }}
                    >
                      {cert}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Experience;
