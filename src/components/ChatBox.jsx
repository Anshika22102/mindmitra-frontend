// src/components/ChatBox.jsx
import React, { useState } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! I’m MindMitra. How are you feeling today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.text();

      const botMessage = { from: 'bot', text: data };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching AI reply:', error);
      setMessages(prev => [...prev, { from: 'bot', text: 'Oops! Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="p-3 shadow-sm">
      <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }} className="mb-3">
        {messages.map((msg, idx) => (
          <ListGroup.Item
            key={idx}
            className={msg.from === 'bot' ? 'bg-light' : 'text-end'}
          >
            <strong>{msg.from === 'bot' ? 'MindMitra' : 'You'}: </strong>
            {msg.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form>
        <Form.Group className="d-flex">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <Button variant="primary" onClick={handleSend} className="ms-2" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default ChatBox;
