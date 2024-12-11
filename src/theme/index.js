import { createTheme, alpha } from '@mui/material';

const createCustomTheme = (mode) => {
  const isLight = mode === 'light';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isLight ? '#2D5AF0' : '#7B9AFF',
        light: isLight ? '#5B7FF9' : '#98B2FF',
        dark: isLight ? '#1E3EBE' : '#5F7EE6',
      },
      secondary: {
        main: isLight ? '#FF4D8D' : '#FF7AA7',
        light: isLight ? '#FF74A6' : '#FF9BBE',
        dark: isLight ? '#D93570' : '#E65C8E',
      },
      background: {
        default: isLight ? '#F8FAFF' : '#0A1929',
        paper: isLight ? '#FFFFFF' : '#132F4C',
      },
      text: {
        primary: isLight ? '#0A1929' : '#F8FAFF',
        secondary: isLight ? alpha('#0A1929', 0.7) : alpha('#F8FAFF', 0.7),
      },
      divider: isLight ? alpha('#0A1929', 0.08) : alpha('#F8FAFF', 0.08),
    },
    typography: {
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
        letterSpacing: '-0.01em',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: isLight ? alpha('#0A1929', 0.05) : alpha('#F8FAFF', 0.05),
            },
            '&::-webkit-scrollbar-thumb': {
              background: isLight ? alpha('#0A1929', 0.2) : alpha('#F8FAFF', 0.2),
              borderRadius: '3px',
              '&:hover': {
                background: isLight ? alpha('#0A1929', 0.3) : alpha('#F8FAFF', 0.3),
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            padding: '10px 24px',
            fontSize: '0.9375rem',
            fontWeight: 500,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            background: `linear-gradient(135deg, ${isLight ? '#2D5AF0' : '#7B9AFF'}, ${isLight ? '#FF4D8D' : '#FF7AA7'})`,
            color: '#FFFFFF',
            '&:hover': {
              background: `linear-gradient(135deg, ${isLight ? '#1E3EBE' : '#5F7EE6'}, ${isLight ? '#D93570' : '#E65C8E'})`,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: isLight 
              ? '0 4px 20px rgba(0,0,0,0.08)'
              : '0 4px 20px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(20px)',
            background: isLight
              ? 'rgba(255,255,255,0.9)'
              : 'rgba(19,47,76,0.9)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              transition: 'all 0.2s ease-in-out',
              '&.Mui-focused': {
                boxShadow: `0 0 0 3px ${alpha(isLight ? '#2D5AF0' : '#7B9AFF', 0.2)}`,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            height: '28px',
            fontWeight: 500,
          },
        },
      },
    },
    shape: {
      borderRadius: 12,
    },
  });
};

export const lightTheme = createCustomTheme('light');
export const darkTheme = createCustomTheme('dark'); 