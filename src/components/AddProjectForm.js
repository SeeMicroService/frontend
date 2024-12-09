import React, { useState } from 'react';
import './AddProjectForm.css';

const AddProjectForm = ({ onClose, onSubmit }) => {
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filename) {
      setError('Filename is required');
      return;
    }

    // Append .html if missing
    const validatedFilename = filename.endsWith('.html') ? filename : `${filename}.html`;
    onSubmit(validatedFilename);
  };

  return (
    <div className="add-project-form">
      <form onSubmit={handleSubmit}>
        <h2>Add Project</h2>
        <input
          type="text"
          placeholder="Enter filename (e.g., project.html)"
          value={filename}
          onChange={(e) => {
            setFilename(e.target.value);
            setError('');
          }}
        />
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;