import { useState, useRef } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
  Fade,
} from '@mui/material';
import { keyframes } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HistoryList from './HistoryList';
import EmotionChart from './EmotionChart';
import LoadingAnimation from './LoadingAnimation';

// 动画关键帧
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(54, 191, 250, 0.2); }
  50% { box-shadow: 0 0 20px rgba(54, 191, 250, 0.4); }
  100% { box-shadow: 0 0 5px rgba(54, 191, 250, 0.2); }
`;

const TextAnalyzer = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const textFieldRef = useRef(null);

  const analyzeText = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      const result = {
        text,
        sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString(),
      };
      setHistory(prev => [result, ...prev]);
      setText('');
      setLoading(false);
    }, 1500);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6, mb: 8 }}>
        <Fade in timeout={1000}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 6,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 60,
                background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
                borderRadius: '50%',
                filter: 'blur(30px)',
                opacity: 0.3,
              },
            }}
          >
            <AutoGraphIcon
              sx={{
                fontSize: 40,
                mb: 2,
                animation: `${floatAnimation} 3s ease-in-out infinite`,
                background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 10px rgba(54, 191, 250, 0.3))',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                letterSpacing: '0.5px',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40%',
                  height: 4,
                  background: 'linear-gradient(90deg, #36BFFA, #2FD4B6)',
                  borderRadius: 2,
                  opacity: 0.7,
                },
              }}
            >
              情感分析
            </Typography>
          </Box>
        </Fade>

        <Card
          sx={{
            p: 4,
            mb: 4,
            background: 'rgba(17, 25, 40, 0.75)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.125)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            transition: 'all 0.3s ease-in-out',
            transform: inputFocused ? 'translateY(-4px)' : 'none',
            animation: inputFocused ? `${glowAnimation} 2s ease-in-out infinite` : 'none',
          }}
        >
          <Box sx={{ position: 'relative', mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="请输入要分析的文本..."
              variant="outlined"
              disabled={loading}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              ref={textFieldRef}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover, &.Mui-focused': {
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(54, 191, 250, 0.5)',
                  },
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                right: 12,
                bottom: 12,
                color: 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#36BFFA',
                },
              }}
            >
              <KeyboardIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={clearHistory}
              startIcon={<DeleteIcon />}
              disabled={loading || history.length === 0}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
                '&:not(:disabled):hover': {
                  borderColor: '#FB7185',
                  color: '#FB7185',
                  transform: 'translateY(-2px)',
                  background: 'rgba(251, 113, 133, 0.1)',
                },
              }}
            >
              清除历史
            </Button>
            <Button
              variant="contained"
              onClick={analyzeText}
              disabled={!text.trim() || loading}
              endIcon={loading ? <LoadingAnimation /> : <SendIcon />}
              sx={{
                background: 'linear-gradient(135deg, #36BFFA, #2FD4B6)',
                color: '#fff',
                borderRadius: '12px',
                padding: '8px 24px',
                transition: 'all 0.3s ease',
                '&:not(:disabled):hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(54, 191, 250, 0.3)',
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              分析文本
            </Button>
          </Box>
        </Card>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <HistoryList history={history} />
          </Grid>
          <Grid item xs={12} md={5}>
            <EmotionChart history={history} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TextAnalyzer; 