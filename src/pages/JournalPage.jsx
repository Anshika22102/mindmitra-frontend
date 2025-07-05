// src/pages/JournalPage.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;
    // TODO: Save journal to backend
    setSubmitted(true);
    setEntry('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h2 className="mb-4">Daily Journal</h2>
      {submitted && <Alert variant="success">Your journal entry was saved!</Alert>}
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
