import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import the modal component
import BlogPostModal from './BlogPostModal'; // Import the blog post modal component
import './BlogPostTable.css'; // Import the CSS file

const BlogPostTable = ({ posts, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filterCategory, setFilterCategory] = useState(''); // State for category filter

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await deleteDoc(doc(db, 'blogPosts', postToDelete));
        toast.success('Blog post deleted successfully!');
      } catch (error) {
        toast.error('Error deleting blog post: ' + error.message);
      }
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const handleToggleVisibility = async (id, visible) => {
    try {
      await updateDoc(doc(db, 'blogPosts', id), { visible: !visible });
      toast.success('Blog post visibility updated!');
    } catch (error) {
      toast.error('Error updating blog post visibility: ' + error.message);
    }
  };

  const handleView = (post) => {
    setSelectedPost(post);
    setShowBlogModal(true);
  };

  const filteredPosts = posts.filter(post => 
    filterCategory === '' || post.category === filterCategory
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center">Blog Posts</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="form-label">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="form-select"
        >
          <option value="">All</option>
          <option value="News">News</option>
          <option value="Activities">Activities</option>
          <option value="Partners">Partners</option>
          <option value="Gallery">Gallery</option>
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="title-column">Title</th>
            <th className="description-column">Description</th>
            <th className="image-column">Image</th>
            <th className="category-column">Category</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td className="title-column">{post.title}</td>
              <td className="description-column">{post.description}</td>
              <td className="image-column">
                {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
              </td>
              <td className="category-column">{post.category}</td>
              <td className="actions-column">
                <button onClick={() => onEdit(post.id)} className="btn btn-warning btn-sm mr-2">
                  Edit
                </button>
                <button 
                  onClick={() => { setPostToDelete(post.id); setShowDeleteModal(true); }} 
                  className="btn btn-danger btn-sm mr-2"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleToggleVisibility(post.id, post.visible)} 
                  className="btn btn-info btn-sm mr-2"
                >
                  {post.visible ? 'Hide' : 'Show'}
                </button>
                <button 
                  onClick={() => handleView(post)} 
                  className="btn btn-primary btn-sm"
                >
                  View Blog
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
      <BlogPostModal
        show={showBlogModal}
        onHide={() => setShowBlogModal(false)}
        post={selectedPost}
      />
    </div>
  );
};

export default BlogPostTable;
