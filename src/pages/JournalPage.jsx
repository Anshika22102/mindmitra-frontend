// src/pages/JournalPage.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const userId = 'demo-user'; // In production, you'd pull this from auth/session

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    try {
      await axios.post('http://localhost:8080/api/journal', {
        message: entry,
        userId: userId,
      });

      setSubmitted(true);
      setEntry('');
      setError(false);

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Daily Journal</h2>

      {submitted && <Alert variant="success">Your journal entry was saved!</Alert>}
      {error && <Alert variant="danger">Something went wrong. Please try again.</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>How are you feeling today?</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write whatever is on your mind..."
          />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-3">
          Save Entry
        </Button>
      </Form>
    </div>
  );
};

export default JournalPage;
