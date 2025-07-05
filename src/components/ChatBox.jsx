// src/components/ChatBox.jsx
import React, { useState } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! I’m MindMitra. How are you feeling today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);

    // Simulate bot reply (we'll replace this with OpenAI API later)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: "Thanks for sharing. I'm here to listen." },
      ]);
    }, 800);

    setInput('');
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
          />
          <Button variant="primary" onClick={handleSend} className="ms-2">
            Send
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default ChatBox;
