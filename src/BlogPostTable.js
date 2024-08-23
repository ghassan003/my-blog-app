// src/BlogPostTable.js
import React, { useState, useEffect } from 'react';
import { doc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firebase configuration
import { Modal, Button, Form, Spinner } from 'react-bootstrap'; // Import Modal, Button, and Spinner from react-bootstrap
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; // Import Firebase storage
import './BlogPostTable.css'; // Import the CSS file

const BlogPostTable = ({ posts }) => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [showPost, setShowPost] = useState({}); // Manage hide/show state
  const [selectedPost, setSelectedPost] = useState(null); // State to track selected post
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation dialog
  const [postToDelete, setPostToDelete] = useState(null); // State to track post to delete
  const [editPost, setEditPost] = useState(null); // State for post being edited
  const [newImage, setNewImage] = useState(null); // State to handle new image upload
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const filterPosts = () => {
      const postsByCategory = filterCategory
        ? posts.filter((post) => post.category === filterCategory)
        : posts;
      setFilteredPosts(postsByCategory);
    };
    filterPosts();
  }, [filterCategory, posts]);

  const categories = Array.from(new Set(posts.map(post => post.category)));
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = posts.filter(post => post.category === category).length;
    return acc;
  }, {});

  const updatePostVisibility = async (postId, newVisibility) => {
    try {
      const postRef = doc(db, 'blogPosts', postId);
      await updateDoc(postRef, { visible: newVisibility });

      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      const updatedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFilteredPosts(filterCategory ? updatedPosts.filter((post) => post.category === filterCategory) : updatedPosts);
      setShowPost(prevState => ({
        ...prevState,
        [postId]: newVisibility,
      }));
    } catch (error) {
      console.error('Error updating post visibility: ', error);
    }
  };

  const togglePostVisibility = (postId) => {
    const currentVisibility = showPost[postId];
    updatePostVisibility(postId, !currentVisibility);
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    setEditPost(null); // Close the modal and reset editPost
    setLoading(false); // Reset loading state
  };

  const handleEditPost = (post) => {
    setEditPost(post);
    setShowModal(true);
  };

  const handleDeletePost = async () => {
    try {
      if (postToDelete) {
        const postRef = doc(db, 'blogPosts', postToDelete.id);
        await deleteDoc(postRef);
        setFilteredPosts(filteredPosts.filter(post => post.id !== postToDelete.id));
        setPostToDelete(null);
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  const handleShowDeleteConfirm = (post) => {
    setPostToDelete(post);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setPostToDelete(null);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      if (editPost) {
        let imageUrl = editPost.imageUrl;
        if (newImage) {
          imageUrl = await handleImageUpload(newImage);
        }
        const postRef = doc(db, 'blogPosts', editPost.id);
        await updateDoc(postRef, {
          title: event.target.title.value,
          description: event.target.description.value,
          category: event.target.category.value,
          imageUrl,
        });
        setFilteredPosts(filteredPosts.map(post => post.id === editPost.id ? { ...post, title: event.target.title.value, description: event.target.description.value, category: event.target.category.value, imageUrl } : post));
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error updating post: ', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="mb-4">
      <div className="mb-3">
        <label htmlFor="categoryFilter" className="form-label">Filter by Category</label>
        <select
          id="categoryFilter"
          className="form-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category} ({categoryCounts[category]})
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-dark-border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Category</th>
              <th>Visible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <React.Fragment key={post.id}>
                <tr>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    <img src={post.imageUrl} alt={post.title} style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td>{post.category}</td>
                  <td>
                    {post.visible ? 'Yes' : 'No'}
                  </td>
                  <td>
                    <button
                      className={`btn ${post.visible ? 'btn-danger' : 'btn-success'} btn-sm me-2`}
                      onClick={() => togglePostVisibility(post.id)}
                    >
                      {post.visible ? 'Hide' : 'Show'}
                    </button>
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleViewPost(post)}>
                      View Post
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditPost(post)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleShowDeleteConfirm(post)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for detailed view */}
      <Modal show={showModal && !editPost} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Description:</strong> {selectedPost?.description}</p>
          <p><strong>Category:</strong> {selectedPost?.category}</p>
          {selectedPost?.imageUrl && (
            <img src={selectedPost.imageUrl} alt={selectedPost.title} style={{ width: '100%', height: 'auto' }} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing post */}
      <Modal show={showModal && editPost} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitEdit}>
          <Modal.Body>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" defaultValue={editPost?.title} name="title" required />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={editPost?.description} name="description" required />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" defaultValue={editPost?.category} name="category" required>
                <option value="News">News</option>
                <option value="Activities">Activities</option>
                <option value="Partners">Partners</option>
                <option value="Gallery">Gallery</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setNewImage(e.target.files[0])} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Saving...</span>
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogPostTable;
