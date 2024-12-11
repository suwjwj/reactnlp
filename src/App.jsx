import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { lightTheme, darkTheme } from './theme';
import TextAnalyzer from './components/TextAnalyzer';
import ThemeToggle from './components/ThemeToggle';
import ParticlesBackground from './components/ParticlesBackground';

// 动画关键帧
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
`;

const glowingAnimation = keyframes`
  0%, 100% { opacity: 0.3; filter: blur(20px); }
  50% { opacity: 0.7; filter: blur(15px); }
`;

const scanlineAnimation = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <ParticlesBackground />
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: theme => 
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #E3F2FD, #F5F5F7)'
              : 'linear-gradient(135deg, #0A1929, #1A1A2B)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme =>
              theme.palette.mode === 'light'
                ? `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
                    rgba(124, 207, 255, 0.2) 0%,
                    rgba(77, 208, 225, 0.2) 25%,
                    rgba(54, 191, 250, 0.2) 50%,
                    rgba(47, 212, 182, 0.2) 75%,
                    rgba(255, 255, 255, 0) 100%)`
                : `radial-gradient(circle at ${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%, 
                    rgba(54, 191, 250, 0.25) 0%,
                    rgba(47, 212, 182, 0.25) 25%,
                    rgba(77, 208, 225, 0.2) 50%,
                    rgba(124, 207, 255, 0.15) 75%,
                    rgba(0, 0, 0, 0) 100%)`,
            animation: `${glowingAnimation} 4s ease-in-out infinite`,
            pointerEvents: 'none',
          },
          // 添加浮动的光斑效果
          '& .floating-orbs': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            '& ::before, & ::after': {
              content: '""',
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: theme =>
                theme.palette.mode === 'light'
                  ? 'radial-gradient(circle, rgba(124, 207, 255, 0.2) 0%, rgba(124, 207, 255, 0) 70%)'
                  : 'radial-gradient(circle, rgba(54, 191, 250, 0.2) 0%, rgba(54, 191, 250, 0) 70%)',
              animation: `${floatingAnimation} 6s ease-in-out infinite`,
              filter: 'blur(20px)',
            },
            '& ::before': {
              top: '20%',
              left: '20%',
              animationDelay: '-2s',
            },
            '& ::after': {
              bottom: '20%',
              right: '20%',
              animationDelay: '-1s',
            },
          },
          // 添加扫描线效果
          '& .scanlines': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme =>
              theme.palette.mode === 'light'
                ? 'linear-gradient(to bottom, transparent 50%, rgba(124, 207, 255, 0.05) 51%)'
                : 'linear-gradient(to bottom, transparent 50%, rgba(54, 191, 250, 0.05) 51%)',
            backgroundSize: '100% 4px',
            pointerEvents: 'none',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: theme =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(to bottom, rgba(124, 207, 255, 0.1), transparent)'
                  : 'linear-gradient(to bottom, rgba(54, 191, 250, 0.1), transparent)',
              animation: `${scanlineAnimation} 8s linear infinite`,
            },
          },
          // 添加网格效果
          '& .grid': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme =>
              theme.palette.mode === 'light'
                ? `linear-gradient(90deg, rgba(124, 207, 255, 0.05) 1px, transparent 1px),
                   linear-gradient(0deg, rgba(124, 207, 255, 0.05) 1px, transparent 1px)`
                : `linear-gradient(90deg, rgba(54, 191, 250, 0.05) 1px, transparent 1px),
                   linear-gradient(0deg, rgba(54, 191, 250, 0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
          },
          padding: { xs: 2, md: 4 },
        }}
      >
        <div className="floating-orbs" />
        <div className="scanlines" />
        <div className="grid" />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <TextAnalyzer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
