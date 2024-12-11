import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import { darkTheme } from './theme';
import TextAnalyzer from './components/TextAnalyzer';
import ThemeToggle from './components/ThemeToggle';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glowAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.5; }
  100% { opacity: 0.3; }
`;

// 只保留深色模式的样式配置
const styles = {
  background: 'linear-gradient(135deg, #0A1929, #1A1A2B)',
  beforeBackground: (mouseX, mouseY) => `
    radial-gradient(circle at ${50 + mouseX * 10}% ${50 + mouseY * 10}%, 
      rgba(54, 191, 250, 0.15) 0%,
      rgba(47, 212, 182, 0.15) 25%,
      rgba(77, 208, 225, 0.1) 50%,
      rgba(124, 207, 255, 0.05) 75%,
      rgba(0, 0, 0, 0) 100%)
  `,
  afterBackground: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
  grid: `
    linear-gradient(90deg, rgba(54, 191, 250, 0.05) 1px, transparent 1px),
    linear-gradient(0deg, rgba(54, 191, 250, 0.05) 1px, transparent 1px)
  `,
  gridOpacity: 0.7,
  card: {
    background: 'rgba(17, 25, 40, 0.75)',
    border: '1px solid rgba(54, 191, 250, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  }
};

function App() {
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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: styles.background,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: styles.beforeBackground(mousePosition.x, mousePosition.y),
            animation: `${glowAnimation} 4s ease-in-out infinite`,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: styles.afterBackground,
            backgroundSize: '200% 200%',
            animation: `${gradientAnimation} 15s ease infinite`,
            pointerEvents: 'none',
          },
          '& .grid': {
            position: 'absolute',
            inset: 0,
            background: styles.grid,
            backgroundSize: '50px 50px',
            opacity: styles.gridOpacity,
            pointerEvents: 'none',
          },
          '& .MuiCard-root': {
            background: styles.card.background,
            backdropFilter: 'blur(20px)',
            border: styles.card.border,
            boxShadow: styles.card.boxShadow,
          },
          padding: { xs: 2, md: 4 },
        }}
      >
        <div className="grid" />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <TextAnalyzer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
