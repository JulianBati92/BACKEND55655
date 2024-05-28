import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profile') {
      cb(null, 'uploads/profiles');
    } else if (file.fieldname === 'product') {
      cb(null, 'uploads/products');
    } else if (file.fieldname === 'document') {
      cb(null, 'uploads/documents');
    } else {
      cb(null, 'uploads/others');
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({ storage });

export default uploader;