import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { devData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = ({ icon, label, value, index }) => {
  const ref = useRef();
  useEffect(() => {
    gsap.fromTo(ref.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
    );
  }, [index]);

  return (
    <Box ref={ref} sx={{
      display: 'flex', alignItems: 'center', gap: 2, mb: 3,
      p: 2.5, borderRadius: '16px',
      background: 'rgba(102,126,234,0.04)',
      border: '1px solid rgba(102,126,234,0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'rgba(102,126,234,0.08)',
        transform: 'translateX(8px)',
        boxShadow: '0 8px 25px rgba(102,126,234,0.1)'
      }
    }}>
      <Box sx={{
        width: 44, height: 44, borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.1))',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontFamily: '"Space Mono", monospace', fontSize: '0.65rem', color: '#9a9abf', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {label}
        </Typography>
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#1a1a2e', fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const Contact = () => {
  const sectionRef = useRef();
  const headingRef = useRef();
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
    );
    gsap.fromTo(formRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: formRef.current, start: 'top 85%', once: true } }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSnack({
        open: true,
        severity: 'warning',
        message: 'Add REACT_APP_WEB3FORMS_ACCESS_KEY in client/.env (free at web3forms.com) to receive messages in your inbox.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio: message from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Send failed');

      setForm({ name: '', email: '', message: '' });
      setSnack({ open: true, severity: 'success', message: "Message sent! I'll get back to you shortly. 🚀" });
      gsap.to('.submit-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    } catch {
      setSnack({
        open: true,
        severity: 'error',
        message: 'Could not send right now. Try again or email me directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontFamily: '"DM Sans", sans-serif',
      '& fieldset': { borderColor: 'rgba(102,126,234,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(102,126,234,0.4)' },
      '&.Mui-focused fieldset': { borderColor: '#667eea' }
    },
    '& .MuiInputLabel-root': { fontFamily: '"DM Sans", sans-serif' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' }
  };

  return (
    <Box
      ref={sectionRef}
      id="contact"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {/* BG gradient */}
      <Box sx={{
        position: 'absolute', bottom: 0, right: 0, width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(102,126,234,0.06) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <Container maxWidth="lg">
        <Box ref={headingRef} sx={{ mb: 8, textAlign: 'center' }}>
          <Typography sx={{
            color: '#667eea', fontFamily: '"Space Mono", monospace',
            fontSize: '0.75rem', letterSpacing: '4px', mb: 2, textTransform: 'uppercase'
          }}>
            — Get In Touch
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontFamily: '"Clash Display", sans-serif',
            background: 'linear-gradient(135deg, #1a1a2e, #302b63)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', mb: 2
          }}>
            Let's Build Together
          </Typography>
          <Typography sx={{ color: '#7a7aa0', fontFamily: '"DM Sans", sans-serif', maxWidth: '500px', mx: 'auto' }}>
            Have a project in mind? Let's collaborate and create something amazing together.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Typography sx={{
              fontFamily: '"Clash Display", sans-serif', fontSize: '1.5rem',
              fontWeight: 700, color: '#1a1a2e', mb: 3
            }}>
              Contact Details
            </Typography>
            {[
              { icon: '📧', label: 'Email', value: devData.email },
              { icon: '📱', label: 'Phone', value: devData.phone },
            ].map((info, i) => (
              <ContactInfo key={info.label} {...info} index={i} />
            ))}

            {/* Social links */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4 }}>
              {[
                { label: 'GitHub', href: devData.github, color: '#1a1a2e' },
                { label: 'LinkedIn', href: devData.linkedin, color: '#0077b5' },
                // ...(devData.leetcode
                //   ? [{ label: 'LeetCode', href: devData.leetcode, color: '#ffa116' }]
                //   : []),
              ].map(social => (
                <Button
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: `${social.color}30`,
                    color: social.color,
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.7rem',
                    textTransform: 'none',
                    borderRadius: '20px',
                    px: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `${social.color}10`,
                      borderColor: social.color,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {social.label}
                </Button>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box
              ref={formRef}
              component="form"
              onSubmit={handleSubmit}
              sx={{
                background: 'white', borderRadius: '24px', p: 4,
                boxShadow: '0 15px 50px rgba(102,126,234,0.1)',
                border: '1px solid rgba(102,126,234,0.1)'
              }}
            >
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth label="Your Name" variant="outlined"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    required sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth label="Email Address" variant="outlined" type="email"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    required sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth label="Your Message" variant="outlined" multiline rows={5}
                    value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    required sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    className="submit-btn"
                    variant="contained"
                    disabled={submitting}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.85rem',
                      py: 1.8,
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 700,
                      boxShadow: '0 8px 30px rgba(102,126,234,0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 40px rgba(102,126,234,0.5)'
                      }
                    }}
                  >
                    {submitting ? 'Sending…' : 'Send Message →'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snack.open}
        autoHideDuration={snack.severity === 'error' ? 6000 : 5000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          severity={snack.severity}
          sx={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
