import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Modal, Button } from 'react-bootstrap';

const AddBlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image || !category) {
      alert('All fields are required!');
      return;
    }
    try {
      await addDoc(collection(db, 'blogPosts'), {
        title,
        description,
        imageUrl: image,
        category,
        visible: true,
      });
      setShowSuccessModal(true); // Show success modal
      setTitle('');
      setDescription('');
      setImage('');
      setCategory('');
    } catch (error) {
      alert('Error adding blog post: ' + error.message);
    }
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  return (
    <div className="mb-4">
      <h2 className="text-center mb-4">Add New Blog Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formTitle" className="form-label">Title</label>
          <input
            type="text"
            id="formTitle"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formDescription" className="form-label">Description</label>
          <textarea
            id="formDescription"
            className="form-control"
            rows="3"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formImage" className="form-label">Image URL</label>
          <input
            type="text"
            id="formImage"
            className="form-control"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formCategory" className="form-label">Category</label>
          <select
            id="formCategory"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="News">News</option>
            <option value="Activities">Activities</option>
            <option value="Partners">Partners</option>
            <option value="Gallery">Gallery</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Blog Post</button>
      </form>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Blog post added successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddBlogForm;
