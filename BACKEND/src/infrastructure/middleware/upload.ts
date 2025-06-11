import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../http/config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products/folder',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp','svg'], 
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  } as any
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});