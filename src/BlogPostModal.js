import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Make sure to install react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogPostModal = ({ show, onHide, post }) => {
  if (!post) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{post.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Description</h5>
        <p>{post.description}</p>
        {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ width: '100%', height: 'auto' }} />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogPostModal;
