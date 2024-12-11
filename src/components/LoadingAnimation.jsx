import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

// 定义动画关键帧
const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.5;
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingAnimation = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 旋转的圆环 */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#36BFFA',
          borderRightColor: '#36BFFA',
          animation: `${rotateAnimation} 1s linear infinite`,
        }}
      />
      
      {/* 脉冲效果 */}
      <Box
        sx={{
          width: '40%',
          height: '40%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
          animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
        }}
      />
      
      {/* 涟漪效果 */}
      {[...Array(3)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
            opacity: 0,
            animation: `${rippleAnimation} 2s ease-out infinite`,
            animationDelay: `${index * 0.5}s`,
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingAnimation; 