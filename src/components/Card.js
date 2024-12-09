import React from 'react';
import './Card.css';

const Card = ({ filename, onDownload, onDelete, onClick }) => (
  <div className="card" onClick={onClick}>
    <p>{filename}</p>
    <div className="actions">
      <button onClick={(e) => { e.stopPropagation(); onDownload(); }}>Download</button>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
    </div>
  </div>
);

export default Card;