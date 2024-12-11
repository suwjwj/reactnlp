import { IconButton, Box } from '@mui/material';
import { keyframes } from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(54, 191, 250, 0.2); }
  50% { box-shadow: 0 0 20px rgba(54, 191, 250, 0.4); }
  100% { box-shadow: 0 0 5px rgba(54, 191, 250, 0.2); }
`;

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: 40,
          height: 40,
          background: 'rgba(17, 25, 40, 0.75)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.125)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'scale(1.1)',
            animation: `${glowAnimation} 2s ease-in-out infinite`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: -1,
            background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
            animation: `${rotateAnimation} 2s linear infinite`,
            opacity: 0.3,
          },
        }}
      >
        {isDarkMode ? (
          <Brightness7Icon
            sx={{
              color: '#FDB813',
              filter: 'drop-shadow(0 0 8px rgba(253, 184, 19, 0.5))',
            }}
          />
        ) : (
          <Brightness4Icon
            sx={{
              color: '#818CF8',
              filter: 'drop-shadow(0 0 8px rgba(129, 140, 248, 0.5))',
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle; 