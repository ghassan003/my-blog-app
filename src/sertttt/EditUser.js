import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          toast.error('User not found');
          navigate('/user-table');
        }
      } catch (error) {
        toast.error('Error fetching user: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'users', id), user);
      toast.success('User updated successfully');
      navigate('/user-table');
    } catch (error) {
      toast.error('Error updating user: ' + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return null;

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </div>
        {/* Repeat similar blocks for other fields */}
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
