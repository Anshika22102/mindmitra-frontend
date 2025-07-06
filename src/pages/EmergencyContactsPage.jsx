import React, { useEffect, useState } from 'react';
import { Form, Button, ListGroup, Alert } from 'react-bootstrap';
import axios from 'axios';

const EmergencyContactsPage = () => {
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [contacts, setContacts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const userId = "user123"; // Replace with dynamic user ID logic later

  // 1. Load contacts from backend on page load
  useEffect(() => {
    axios.get(`http://localhost:8080/api/contacts/${userId}`)
      .then(response => setContacts(response.data))
      .catch(error => console.error("Failed to fetch contacts", error));
  }, [submitted]); // Refresh contacts after new add

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // 2. Send contact to backend on submit
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.phone) return;

    const contactWithUserId = { ...contact, userId };

    axios.post("http://localhost:8080/api/contacts", contactWithUserId)
      .then(() => {
        setSubmitted(true);
        setContact({ name: '', phone: '' });
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch(err => console.error("Failed to save contact", err));
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
