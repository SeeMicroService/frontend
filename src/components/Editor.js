import React, { useEffect, useState } from 'react';
import './Editor.css';
import { updateFile } from '../api/files';

const Editor = ({ filename, token, onClose }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/files/get_file?path=${encodeURIComponent(filename)}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch file content: ${response.status}`);
        }

        const data = await response.text(); // Assuming file content is plain text
        setContent(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchContent();
  }, [filename, token]);

  const handleSave = async () => {
    try {
      await updateFile(filename, content, token);
      alert(`File "${filename}" saved successfully.`);
      onClose(); // Close the editor
    } catch (error) {
      alert(`Failed to save file: ${error.message}`);
    }
  };

  return (
    <div className="editor">
      <h2>Editing: {filename}</h2>
      {error && <p className="error">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="20"
        cols="80"
      ></textarea>
      <div className="editor-controls">
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Editor;