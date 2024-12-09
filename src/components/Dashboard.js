// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import Editor from './Editor';
import AddProjectForm from './AddProjectForm';
import { getFile, deleteFile } from '../api/files';
import { deleteUser, changePassword } from '../api/users';
import ChangePasswordForm from './ChangePasswordForm';
import './Dashboard.css';

const Dashboard = ({ token, uuid, onLogout }) => {
  const [filenames, setFilenames] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);


  const fetchFilenames = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/files/get_filenames?` +
        new URLSearchParams(
          {
            id: uuid
          }
        ), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch filenames: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFilenames(data.filenames);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchFilenames()
  }, [token, uuid]);


  const handleAddProject = async (filename) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/files/attach_file`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: uuid,
          name: filename,
          content: '',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add file: ${response.status}`);
      }

      await fetchFilenames();
      setShowAddForm(false);
    } catch (err) {
      alert(`Error adding project: ${err.message}`);
    }
  };

  const handleDownload = async (filename) => {
    try {
      await getFile(filename, token);
      alert(`File "${filename}" downloaded successfully.`);
    } catch (error) {
      alert(`Failed to download "${filename}": ${error.message}`);
    }
  };

  const handleDelete = async (filename) => {
    if (window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      try {
        await deleteFile(filename, token, uuid);
        setFilenames((prev) => prev.filter((file) => file !== filename));
        alert(`File "${filename}" deleted successfully.`);
      } catch (error) {
        alert(`Failed to delete "${filename}": ${error.message}`);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser(token, uuid);
        alert('Account deleted successfully.');
        onLogout();
      } catch (error) {
        alert(`Failed to delete account: ${error.message}`);
      }
    }
  };

  const handleChangePassword = async (newPassword) => {
    try {
      await changePassword(newPassword, token, uuid);
      alert('Password changed successfully.');
      setShowChangePasswordForm(false);
    } catch (error) {
      alert(`Failed to change password: ${error.message}`);
    }
  };

  return (
    <div className="dashboard">
      <h2>Your Files</h2>
      {error && <p className="error">{error}</p>}
      {selectedFile ? (
        <Editor filename={selectedFile} token={token} onClose={() => setSelectedFile(null)} />
      ) : filenames.length === 0 ? (
        <p className="empty-message">No files available. Add your first project!</p>
      ) : (
        <div className="card-container">
          {filenames.map((filename) => (
            <Card
              key={filename}
              filename={filename}
              onDownload={() => handleDownload(filename)}
              onDelete={() => handleDelete(filename)}
              onClick={() => setSelectedFile(filename)}
            />
          ))}
        </div>
      )}
      <div className="dashboard-controls">
        <button onClick={() => setShowAddForm(true)}>Add Project</button>
        <button onClick={() => setShowChangePasswordForm(true)}>Change Password</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
        <button onClick={onLogout}>Logout</button>
      </div>
      {showAddForm && (
        <AddProjectForm
          onClose={() => setShowAddForm(false)}
          onSubmit={(filename) => {
            handleAddProject(filename);
            setShowAddForm(false);
            setFilenames((prev) => prev);
          }}
        />
      )}
      {showChangePasswordForm && (
        <ChangePasswordForm
          onClose={() => setShowChangePasswordForm(false)}
          onSubmit={handleChangePassword}
        />
      )}
    </div>
  );
};

export default Dashboard;