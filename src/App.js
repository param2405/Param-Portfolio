import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
    background: { default: '#f8f9ff', paper: '#ffffff' }
  },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", sans-serif'
  }
});

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
      />
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Box sx={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
