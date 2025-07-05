// src/components/AlertModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertModal = ({ show, onConfirm, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Are You Okay?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          It seems like you're going through a really tough time. 💔 <br />
          Would you like us to notify someone you trust?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          No, I'm okay
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Yes, alert my contact
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
