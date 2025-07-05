// src/pages/MoodTrackerPage.jsx
import React, { useState } from 'react';
import { ButtonGroup, Button, Alert } from 'react-bootstrap';

const moods = ['Happy 😊', 'Sad 😢', 'Anxious 😰', 'Angry 😠', 'Tired 😴', 'Okay 🙂'];

const MoodTrackerPage = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    // TODO: Save mood to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h2 className="mb-4">Mood Tracker</h2>
      {submitted && (
        <Alert variant="info">
          Mood "{selectedMood}" logged successfully!
        </Alert>
      )}
      <ButtonGroup vertical>
        {moods.map((mood, idx) => (
          <Button
            key={idx}
            variant="outline-primary"
            className="mb-2"
            onClick={() => handleMoodClick(mood)}
          >
            {mood}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default MoodTrackerPage;
