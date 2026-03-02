const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getAllPhotos, 
  upload, 
  uploadPhoto, 
  deletePhoto 
} = require('../controllers/galleryController');

const router = express.Router();

// Public routes
router.route('/').get(getAllPhotos);

// Admin routes
router.route('/').post(protect, upload.single('image'), uploadPhoto);
router.route('/:id').delete(protect, deletePhoto);

module.exports = router;