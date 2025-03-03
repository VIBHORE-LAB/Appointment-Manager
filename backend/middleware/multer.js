const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'business_images', 
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
        public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0] // Ensure unique filename
    }
});


const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
});
module.exports= upload;
