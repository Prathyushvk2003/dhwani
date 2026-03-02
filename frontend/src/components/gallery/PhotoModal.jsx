import React from 'react';
import './PhotoModal.css';

const PhotoModal = ({ photo, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <img src={photo.url} alt={photo.caption || 'Gallery photo'} className="modal-image" />
        {photo.caption && (
          <div className="modal-caption">{photo.caption}</div>
        )}
      </div>
    </div>
  );
};

export default PhotoModal;