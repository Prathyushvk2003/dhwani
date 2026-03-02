import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoGrid from '../components/gallery/PhotoGrid';
import PhotoModal from '../components/gallery/PhotoModal';
import './Gallery.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch gallery photos from backend API
    const fetchGallery = async () => {
      try {
        const response = await axios.get('/api/gallery');
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery photos:', error);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div id="gallery" className="gallery-page">
      <div className="container">
        <h1 className="page-title">PHOTO GALLERY</h1>
        {loading ? (
          <div className="loading">Loading gallery...</div>
        ) : (
          <PhotoGrid photos={photos} onPhotoClick={openPhotoModal} />
        )}
      </div>
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={closePhotoModal} />
      )}
    </div>
  );
};

export default Gallery;