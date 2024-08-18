import React, { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from './firebase'; // Import storage from firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Modal, Button, Spinner, Card } from 'react-bootstrap';

const AddBlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Set to null initially since it's a file
  const [category, setCategory] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successButtonLabel, setSuccessButtonLabel] = useState('Close'); // Default label
  const [isFormVisible, setIsFormVisible] = useState(true); // To show/hide the form

  // Reference for the file input
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image || !category) {
      alert('All fields are required!');
      return;
    }

    setLoading(true); // Start loading
    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `blogImages/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save blog post to Firestore
      await addDoc(collection(db, 'blogPosts'), {
        title,
        description,
        imageUrl, // Save the image URL
        category,
        visible: true,
      });

      setShowSuccessModal(true); // Show success modal
      setSuccessButtonLabel('Done'); // Change button label to "Done"
      setTitle('');
      setDescription('');
      setImage(null);
      setCategory('');

      // Clear the file input field manually
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert('Error adding blog post: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessButtonLabel('Close'); // Reset button label to "Close"
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <Card className="mb-4 border-dark">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Add New Blog Post</h2>
        <Button variant="secondary" onClick={toggleFormVisibility}>
          {isFormVisible ? 'Hide' : 'Show'} Form
        </Button>
      </Card.Header>
      
      {isFormVisible && (
        <Card.Body>
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
              <label htmlFor="formImage" className="form-label">Image</label>
              <input
                type="file"
                id="formImage"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])} // Get the selected file
                ref={fileInputRef} // Attach the ref to the input
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Add Blog Post'}
            </button>
          </form>
        </Card.Body>
      )}

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
            {successButtonLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default AddBlogForm;
