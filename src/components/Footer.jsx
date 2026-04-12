import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const footerNav = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Footer = () => (
  <Box sx={{
    background: 'linear-gradient(135deg, #1a1a2e, #302b63)',
    py: 6, px: 3
  }}>
    <Container maxWidth="lg">
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexWrap: 'wrap',
        gap: 3,
      }}
      >
        <Box>
          <Typography sx={{
            fontFamily: '"Space Mono", monospace', fontWeight: 900, fontSize: '1.5rem',
            background: 'linear-gradient(135deg, #667eea, #f093fb)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}
          >
            Param Parikh
          </Typography>
          <Typography sx={{ fontFamily: '"DM Sans", sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', mt: 0.5 }}>
            Full Stack & AI-ML Developer
          </Typography>
        </Box>

        <Box
          component="nav"
          aria-label="Footer sections"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 1.5, sm: 2 },
            alignItems: 'center',
          }}
        >
          {footerNav.map((label) => (
            <Typography
              key={label}
              component="button"
              type="button"
              onClick={() => scrollToSection(label.toLowerCase())}
              sx={{
                fontFamily: '"Space Mono", monospace',
                color: 'rgba(255,255,255,0.55)',
                fontSize: '0.72rem',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: 0,
                textDecoration: 'none',
                textTransform: 'none',
                letterSpacing: '0.04em',
                '&:hover': { color: '#f093fb' },
                '&:focus-visible': { outline: '2px solid rgba(102,126,234,0.8)', outlineOffset: 4, borderRadius: 1 },
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        <Typography sx={{
          fontFamily: '"Space Mono", monospace', color: 'rgba(255,255,255,0.3)',
          fontSize: '0.7rem', textAlign: { xs: 'left', md: 'right' },
        }}
        >
          © {new Date().getFullYear()} Param Parikh. Built with ❤️
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
