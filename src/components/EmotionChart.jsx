import { useState, useEffect } from 'react';
import { Card, Typography, Box, Fade } from '@mui/material';
import { keyframes } from '@mui/system';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const EmotionChart = ({ history }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, [history]);

  const sentimentCounts = history.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  const total = history.length || 1;
  const getPercentage = (value) => ((value || 0) / total * 100).toFixed(1);

  const data = [
    {
      id: 'positive',
      label: '正面',
      value: sentimentCounts.positive || 0,
      gradient: ['#36BFFA', '#2FD4B6'],
      icon: <SentimentSatisfiedAltIcon />,
    },
    {
      id: 'neutral',
      label: '中性',
      value: sentimentCounts.neutral || 0,
      gradient: ['#818CF8', '#C084FC'],
      icon: <SentimentNeutralIcon />,
    },
    {
      id: 'negative',
      label: '负面',
      value: sentimentCounts.negative || 0,
      gradient: ['#FB7185', '#F472B6'],
      icon: <SentimentVeryDissatisfiedIcon />,
    },
  ];

  if (history.length === 0) {
    return (
      <Card
        sx={{
          p: 4,
          height: '100%',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 3,
          background: 'rgba(17, 25, 40, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.125)',
        }}
      >
        <Box
          sx={{
            width: 180,
            height: 180,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -3,
              background: 'conic-gradient(from 0deg, #36BFFA, #2FD4B6, #818CF8, #36BFFA)',
              borderRadius: '50%',
              animation: `${rotateAnimation} 4s linear infinite`,
              filter: 'blur(8px)',
              opacity: 0.4,
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 6,
              background: 'rgba(17, 25, 40, 0.95)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: `${pulseAnimation} 3s ease-in-out infinite`,
            }}
          >
            <SentimentNeutralIcon 
              sx={{ 
                fontSize: 64,
                color: '#818CF8',
                filter: 'drop-shadow(0 0 10px rgba(129, 140, 248, 0.5))',
              }} 
            />
          </Box>
        </Box>
        <Typography
          variant="h6"
          sx={{
            background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          暂无分析数据
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        p: 4,
        minHeight: 400,
        background: 'rgba(17, 25, 40, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
        }}
      >
        情感分布
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ width: 240, height: 240, position: 'relative' }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <defs>
              {data.map((item) => (
                <linearGradient
                  key={`gradient-${item.id}`}
                  id={`gradient-${item.id}`}
                >
                  <stop offset="0%" stopColor={item.gradient[0]} />
                  <stop offset="100%" stopColor={item.gradient[1]} />
                </linearGradient>
              ))}
            </defs>
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const offset = data
                .slice(0, index)
                .reduce((acc, curr) => acc + (curr.value / total) * 100, 0);
              const radius = 40;
              const circumference = 2 * Math.PI * radius;
              const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`;
              const rotation = offset * 3.6; // 360 / 100

              return (
                <circle
                  key={item.id}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={`url(#gradient-${item.id})`}
                  strokeWidth="12"
                  strokeDasharray={animate ? strokeDasharray : '0 100'}
                  transform={`rotate(${-90 + rotation} 50 50)`}
                  style={{
                    transition: 'stroke-dasharray 1s ease-in-out',
                    transform: hoveredId === item.id ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: 'center',
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );
            })}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="rgba(17, 25, 40, 0.95)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          </svg>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {data.map((item) => (
          <Fade key={item.id} in timeout={500}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                padding: '8px 16px',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: hoveredId === item.id
                  ? `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`
                  : 'rgba(255, 255, 255, 0.05)',
                color: hoveredId === item.id ? '#fff' : 'text.primary',
                '&:hover': {
                  background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
                  color: '#fff',
                  transform: 'translateY(-2px)',
                },
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {item.icon}
              <Typography sx={{ fontWeight: 500 }}>
                {item.label}: {getPercentage(item.value)}%
              </Typography>
            </Box>
          </Fade>
        ))}
      </Box>
    </Card>
  );
};

export default EmotionChart; 