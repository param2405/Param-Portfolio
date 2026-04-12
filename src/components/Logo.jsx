import React, { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

const Logo = forwardRef(function Logo({ onClick, compact = false }, ref) {
  return (
    <Box
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 1 : 1.25,
        userSelect: 'none',
        outline: 'none',
        '&:focus-visible': {
          borderRadius: 2,
          boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.45)',
        },
      }}
    >
      <Box
        sx={{
          width: compact ? 36 : 40,
          height: compact ? 36 : 40,
          borderRadius: compact ? '12px' : '14px',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          background: 'linear-gradient(145deg, #667eea 0%, #764ba2 55%, #f093fb 100%)',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
          color: '#fff',
          fontFamily: '"Space Mono", monospace',
          fontWeight: 800,
          fontSize: compact ? '0.85rem' : '0.95rem',
          letterSpacing: '-0.06em',
          lineHeight: 1,
        }}
      >
        PP
      </Box>
      {compact ? (
        <Typography
          sx={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.65rem',
            color: '#9a9abf',
            letterSpacing: '0.35em',
            fontWeight: 600,
            textTransform: 'uppercase',
            lineHeight: 1.2,
          }}
        >
          Param Parikh
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontWeight: 800,
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              background: 'linear-gradient(135deg, #2d2a55, #667eea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Param Parikh
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              color: '#9a9abf',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              mt: 0.25,
            }}
          >
            Dev
          </Typography>
        </Box>
      )}
    </Box>
  );
});

export default Logo;
