import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { gsap } from 'gsap';
import Logo from './Logo';

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

const Navbar = () => {
  const navRef = useRef();
  const logoRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 3.5 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(n => n.toLowerCase());
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        ref={navRef}
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(255,255,255,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(102,126,234,0.1)' : 'none',
          transition: 'all 0.4s ease',
          boxShadow: scrolled ? '0 4px 30px rgba(102,126,234,0.08)' : 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 1 }}>
          <Logo ref={logoRef} compact onClick={() => scrollTo('home')} />

          {/* Desktop nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {navItems.map(item => (
              <Button
                key={item}
                onClick={() => scrollTo(item)}
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.72rem',
                  textTransform: 'none',
                  color: activeSection === item.toLowerCase() ? '#667eea' : '#4a4a7a',
                  fontWeight: activeSection === item.toLowerCase() ? 700 : 400,
                  position: 'relative',
                  px: 1.5, py: 0.5,
                  '&::after': {
                    content: '""',
                    position: 'absolute', bottom: 2, left: '50%',
                    transform: 'translateX(-50%)',
                    width: activeSection === item.toLowerCase() ? '80%' : '0%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    borderRadius: '1px',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover::after': { width: '80%' },
                  '&:hover': { color: '#667eea', background: 'rgba(102,126,234,0.05)' }
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* CTA */}
          <Button
            onClick={() => scrollTo('Contact')}
            variant="contained"
            sx={{
              display: { xs: 'none', md: 'flex' },
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white', fontFamily: '"Space Mono", monospace',
              fontSize: '0.72rem', textTransform: 'none', fontWeight: 700,
              borderRadius: '20px', px: 2.5,
              boxShadow: '0 4px 15px rgba(102,126,234,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(102,126,234,0.4)' }
            }}
          >
            Hire Me
          </Button>

          {/* Mobile menu */}
          <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, color: '#667eea' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280, background: 'linear-gradient(135deg, #f8f9ff, white)', p: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Logo onClick={() => scrollTo('home')} />
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#667eea' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ p: 0 }}>
          {navItems.map(item => (
            <ListItem key={item} sx={{ p: 0, mb: 1 }}>
              <Button
                fullWidth onClick={() => scrollTo(item)}
                sx={{
                  justifyContent: 'flex-start', py: 1.5, px: 2, borderRadius: '12px',
                  fontFamily: '"Space Mono", monospace', fontSize: '0.85rem', textTransform: 'none',
                  color: activeSection === item.toLowerCase() ? '#667eea' : '#4a4a7a',
                  fontWeight: activeSection === item.toLowerCase() ? 700 : 400,
                  background: activeSection === item.toLowerCase() ? 'rgba(102,126,234,0.08)' : 'transparent',
                  '&:hover': { background: 'rgba(102,126,234,0.08)', color: '#667eea' }
                }}
              >
                {item}
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
