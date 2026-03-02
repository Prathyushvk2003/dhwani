const Gallery = require('../models/Gallery');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all gallery photos
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find({}).sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload a new photo
const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const photo = new Gallery({
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`, // URL to access the image
      caption: req.body.caption
    });

    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a photo
const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const photo = await Gallery.findById(id);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }
    
    // Delete the physical file
    const filePath = path.join(__dirname, '..', photo.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllPhotos,
  upload: upload,
  uploadPhoto,
  deletePhoto
};