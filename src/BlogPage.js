import React, { useState, useEffect } from 'react';
import BlogPostForm from './BlogPostForm';
import BlogPostTable from './BlogPostTable';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { ToastContainer } from 'react-toastify';
import SideNav from './SideNav'; // Import the SideNav component

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  console.log("1111 ", editingPostId);
  

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'blogPosts');
      const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
        const postsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(postsList);
      });

      return () => unsubscribe();
    };

    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    setEditingPostId(id);
  };

  const handleEditComplete = () => {
    console.log("ÄAA",  );
    
    setEditingPostId(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideNav /> {/* Add SideNav here */}
        <div className="col-md-10 ms-sm-auto col-lg-10 px-4">
          <BlogPostForm editingPostId={editingPostId} onEditComplete={handleEditComplete} />
          <BlogPostTable posts={posts} onEdit={handleEdit} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogPage;
