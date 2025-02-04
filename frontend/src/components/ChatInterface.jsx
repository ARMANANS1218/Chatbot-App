// src/components/ChatInterface.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Container,
  Typography
} from '@mui/material';

const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { query: input });
      setMessages([
        ...messages,
        { text: input, isBot: false },
        { text: response.data.response, isBot: true }
      ]);
      setInput('');
    } catch (err) {
      console.error('Chat error:', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Supplier & Product Chatbot
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <List sx={{ height: '400px', overflow: 'auto', mb: 2 }}>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={msg.isBot ? 'Bot' : 'You'}
                secondary={msg.text}
                sx={{
                  textAlign: msg.isBot ? 'left' : 'right',
                  bgcolor: msg.isBot ? '#f5f5f5' : 'transparent',
                  p: 1,
                  borderRadius: 2
                }}
              />
            </ListItem>
          ))}
        </List>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Ask about products or suppliers..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Send
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ChatInterface;