// // src/BlogPage.js

// import React, { useState, useEffect } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from './firebase';
// import SideNav from './SideNav'; // Import the SideNav component
// import AddBlogForm from './AddBlogForm'; // Import the AddBlogForm component
// import BlogPostTable from './BlogPostTable'; // Import the BlogPostTable component



// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
// // import './UserPage.css'; // Ensure you have a CSS file for styling

// const BlogPage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const postsCollection = collection(db, 'blogPosts');
//       const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
//         const postsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setPosts(postsList);
//       });

//       return () => unsubscribe();
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <SideNav /> {/* Add SideNav here */}
//         <div className='main-content'>
//         <div className="col-md-10 ms-sm-auto col-lg-11">
//           <AddBlogForm /> {/* Render AddBlogForm component */}
//           <BlogPostTable posts={posts} /> {/* Render BlogPostTable component */}
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;


import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import SideNav from './SideNav'; // Import the SideNav component
import AddBlogForm from './AddBlogForm'; // Import the AddBlogForm component
import BlogPostTable from './BlogPostTable'; // Import the BlogPostTable component

import { Container, } from 'react-bootstrap'; // Import necessary Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
 
import './UserWebManagement.css'; // Add a CSS file for additional styling
import './blogPage.css'; // Ensure you have a CSS file for styling


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



    // <div className="d-flex">
    //   <SideNav /> {/* Render the SideNav component */}
    //   <div className="main-content">
    //     <Container className="mt-5">
    //         <AddBlogForm /> {/* Render AddBlogForm component */}
    //         <BlogPostTable posts={posts} /> {/* Render BlogPostTable component */}
    //     </Container>
    //   </div>
    // </div>



    <div className="d-flex">
    {/* Side Navigation */}
    <div className="sidebar-wrapper">
      <SideNav />
    </div>
    
    {/* Main Content */}
    <div className="main-content flex-grow-1">
      <Container className="mt-6">
        <AddBlogForm />
        <BlogPostTable posts={posts} />
      </Container>
    </div>
  </div>




  );
};

export default BlogPage;

