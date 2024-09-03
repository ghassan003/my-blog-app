// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from './firebase';

// const AddBlogModal = ({ show, onHide }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [category, setCategory] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !description || !image || !category) {
//       toast.error('All fields are required!');
//       return;
//     }
//     try {
//       await addDoc(collection(db, 'blogPosts'), {
//         title,
//         description,
//         imageUrl: image,
//         category,
//         visible: true, // Assuming posts should be visible by default
//       });
//       toast.success('Blog post added successfully!');
//       onHide(); // Close the modal after successful submission
//       setTitle('');
//       setDescription('');
//       setImage('');
//       setCategory('');
//     } catch (error) {
//       toast.error('Error adding blog post: ' + error.message);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Blog Post</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formTitle">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formDescription">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Enter description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formImage">
//             <Form.Label>Image URL</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter image URL"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formCategory">
//             <Form.Label>Category</Form.Label>
//             <Form.Control
//               as="select"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="">Select category</option>
//               <option value="News">News</option>
//               <option value="Activities">Activities</option>
//               <option value="Partners">Partners</option>
//               <option value="Gallery">Gallery</option>
//             </Form.Control>
//           </Form.Group>
//           <Button variant="primary" type="submit" className="mt-3">
//             Add Blog Post
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddBlogModal;


import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

const AddBlogModal = ({ show, onHide }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image || !category) {
      toast.error('All fields are required!');
      return;
    }
    try {
      await addDoc(collection(db, 'blogPosts'), {
        title,
        description,
        imageUrl: image,
        category,
        visible: true, // Assuming posts should be visible by default
      });
      toast.success('Blog post added successfully!');
      onHide(); // Close the modal after successful submission
      setTitle('');
      setDescription('');
      setImage('');
      setCategory('');
    } catch (error) {
      toast.error('Error adding blog post: ' + error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Blog Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="News">News</option>
              <option value="Activities">Activities</option>
              <option value="Awolia School">Awolia School</option>
              <option value="Partners">Partners</option>
              <option value="Sponsors">Sponsors</option>
              <option value="Gallery">Gallery</option>
              <option value="About us">About us</option>
              <option value="Annual Get together">Annual Get together</option>
              <option value="Jobs Fair">Jobs Fair</option>
              <option value="Business Lead">Business Lead</option>
              <option value="Honourary Members">Honourary Members</option>
              <option value="Arabic Language Training">Arabic Language Training</option>
              <option value="Vote Poll Gathering form">Vote Poll Gathering form</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Blog Post
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBlogModal;
