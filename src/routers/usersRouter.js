import express from 'express';
import { registerUser, verifyUser, promoteToPremium, uploadDocuments } from '../controllers/userController.js';
import multer from 'multer';

const userRouter = express.Router();

// Configuración de Multer para guardar archivos en diferentes carpetas
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profile') {
      cb(null, 'uploads/profiles');
    } else if (file.fieldname === 'product') {
      cb(null, 'uploads/products');
    } else if (file.fieldname === 'document') {
      cb(null, 'uploads/documents');
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

userRouter.post('/register', registerUser);
userRouter.post('/:uid/documents', upload.array('documents'), uploadDocuments);
userRouter.put('/premium/:uid', promoteToPremium);

export default userRouter;