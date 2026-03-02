import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminGallery.css';

const AdminGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setPhotos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);

    try {
      setUploading(true);
      await axios.post('/api/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form and fetch updated gallery
      setFile(null);
      setCaption('');
      document.getElementById('fileInput').value = '';
      fetchGallery();
    } catch (error) {
      console.error('Error uploading photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await axios.delete(`/api/gallery/${photoId}`);
        fetchGallery();
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  return (
    <div className="admin-gallery">
      <h2 className="section-title">Upload New Photo</h2>
      <form onSubmit={handleSubmit} className="upload-form card">
        <div className="form-group">
          <label htmlFor="fileInput">Select Image *</label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter a caption for the photo"
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </form>

      <h2 className="section-title">Current Gallery</h2>
      {loading ? (
        <div className="loading">Loading gallery...</div>
      ) : (
        <div className="gallery-grid">
          {photos.length > 0 ? (
            photos.map(photo => (
              <div key={photo._id} className="gallery-item card">
                <img src={photo.url} alt={photo.caption || 'Gallery photo'} />
                <div className="gallery-info">
                  <p>{photo.caption || 'No caption'}</p>
                  <button 
                    onClick={() => handleDelete(photo._id)} 
                    className="btn btn-secondary danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No photos in gallery yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;