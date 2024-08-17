// src/BlogPage.js

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import SideNav from './SideNav'; // Import the SideNav component
import AddBlogForm from './AddBlogForm'; // Import the AddBlogForm component

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="container-fluid">
      <div className="row">
        <SideNav /> {/* Add SideNav here */}
        <div className="col-md-10 ms-sm-auto col-lg-10 px-4">
          <AddBlogForm /> {/* Render AddBlogForm component */}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
