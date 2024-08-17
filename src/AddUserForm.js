import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { toast } from 'react-toastify';

const AddUserForm = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('');
  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  const [kartaWarat, setKartaWarat] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'users'), {
        fullName,
        phoneNumber,
        email,
        batch,
        profession,
        education,
        paymentStatus,
        kartaWarat,
        photoUrl,
      });

      toast.success('User added successfully');
      setShowModal(false); // Close the modal after successful addition
    } catch (error) {
      toast.error('Error adding user: ' + error.message);
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <button onClick={handleOpenModal} className="btn btn-primary">Add New User</button>

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New User</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Batch</label>
                  <input
                    type="text"
                    className="form-control"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profession</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Educational Background</label>
                  <input
                    type="text"
                    className="form-control"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Karta Warat</label>
                  <input
                    type="text"
                    className="form-control"
                    value={kartaWarat}
                    onChange={(e) => setKartaWarat(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Payment Status</label>
                  <select
                    className="form-select"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Add User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;
