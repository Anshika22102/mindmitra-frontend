// src/pages/EmergencyContactsPage.jsx
import React, { useState } from 'react';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';

const EmergencyContactsPage = () => {
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [contacts, setContacts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.phone) return;

    setContacts([...contacts, contact]);
    setContact({ name: '', phone: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h2 className="mb-4">Emergency Contacts</h2>
      {submitted && <Alert variant="success">Contact added!</Alert>}

      <Form onSubmit={handleAddContact}>
        <Form.Group className="mb-3">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Contact</Button>
      </Form>

      {contacts.length > 0 && (
        <ListGroup className="mt-4">
          <ListGroup.Item active>Saved Contacts</ListGroup.Item>
          {contacts.map((c, idx) => (
            <ListGroup.Item key={idx}>
              {c.name} - {c.phone}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default EmergencyContactsPage;
