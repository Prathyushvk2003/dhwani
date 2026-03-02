import React from 'react';
import './PhotoGrid.css';

const PhotoGrid = ({ photos, onPhotoClick }) => {
  return (
    <div className="photo-grid">
      {photos.map(photo => (
        <div 
          key={photo._id} 
          className="photo-item fire-glow"
          onClick={() => onPhotoClick(photo)}
        >
          <img src={photo.url} alt={photo.caption || 'Gallery photo'} />
          {photo.caption && (
            <div className="photo-caption">{photo.caption}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;