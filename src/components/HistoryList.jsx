import {
  Card,
  List,
  ListItem,
  Typography,
  Box,
  Chip,
  Collapse,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { keyframes } from '@mui/system';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryIcon from '@mui/icons-material/History';

// 动画关键帧
const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(54, 191, 250, 0.1); }
  50% { box-shadow: 0 0 15px rgba(54, 191, 250, 0.2); }
  100% { box-shadow: 0 0 5px rgba(54, 191, 250, 0.1); }
`;

const sentimentConfig = {
  positive: {
    icon: <SentimentSatisfiedAltIcon />,
    label: '正面',
    gradient: ['#36BFFA', '#2FD4B6'],
    glow: 'rgba(54, 191, 250, 0.3)',
  },
  neutral: {
    icon: <SentimentNeutralIcon />,
    label: '中性',
    gradient: ['#818CF8', '#C084FC'],
    glow: 'rgba(129, 140, 248, 0.3)',
  },
  negative: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: '负面',
    gradient: ['#FB7185', '#F472B6'],
    glow: 'rgba(251, 113, 133, 0.3)',
  },
};

const commonCardStyles = {
  background: 'rgba(17, 25, 40, 0.75)',
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.125)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
};

const HistoryList = ({ history }) => {
  if (history.length === 0) {
    return (
      <Card
        sx={{
          ...commonCardStyles,
          p: 4,
          height: '100%',
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            animation: `${pulseAnimation} 3s ease-in-out infinite`,
          }}
        >
          <HistoryIcon
            sx={{
              fontSize: 40,
              color: '#818CF8',
              filter: 'drop-shadow(0 0 8px rgba(129, 140, 248, 0.5))',
            }}
          />
        </Box>
        <Typography
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          暂无分析记录
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ ...commonCardStyles }}>
      <Typography
        variant="h6"
        sx={{
          p: 3,
          pb: 2,
          background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&::before': {
            content: '""',
            width: 4,
            height: 24,
            background: 'linear-gradient(to bottom, #36BFFA, #2FD4B6)',
            borderRadius: 2,
          },
        }}
      >
        分析历史
      </Typography>
      <List sx={{ p: 0, maxHeight: 600, overflow: 'auto' }}>
        <TransitionGroup>
          {history.map((item) => (
            <Collapse key={item.timestamp}>
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 3,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.03)',
                    '&::before': {
                      opacity: 0.2,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${sentimentConfig[item.sentiment].gradient[0]}, ${sentimentConfig[item.sentiment].gradient[1]})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                }}
              >
                <Typography
                  sx={{
                    mb: 2,
                    color: 'rgba(255, 255, 255, 0.9)',
                    position: 'relative',
                    width: '100%',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: -12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 3,
                      height: '70%',
                      background: `linear-gradient(to bottom, ${sentimentConfig[item.sentiment].gradient[0]}, ${sentimentConfig[item.sentiment].gradient[1]})`,
                      borderRadius: 4,
                    },
                  }}
                >
                  {item.text}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Chip
                    icon={sentimentConfig[item.sentiment].icon}
                    label={sentimentConfig[item.sentiment].label}
                    sx={{
                      background: `linear-gradient(135deg, ${sentimentConfig[item.sentiment].gradient[0]}, ${sentimentConfig[item.sentiment].gradient[1]})`,
                      color: '#fff',
                      fontWeight: 500,
                      animation: `${glowAnimation} 2s ease-in-out infinite`,
                      '& .MuiChip-icon': {
                        color: '#fff',
                      },
                    }}
                    size="small"
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <AccessTimeIcon fontSize="inherit" />
                    {new Date(item.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Card>
  );
};

export default HistoryList; 