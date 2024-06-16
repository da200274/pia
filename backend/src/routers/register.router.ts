import express from 'express'
import multer from 'multer'
import { RegisterController } from '../controllers/register.controller'

import path from 'path';

const registerRouter = express.Router()

registerRouter.route("/register").post(
    (req,res)=>new RegisterController().register(req,res)
)

registerRouter.route("/update_photo").post(
  (req,res)=>new RegisterController().update_photo(req,res)
)

const destinationPath = path.join(__dirname, './../../../frontend/src/assets/profile_pics');
console.log(__dirname)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename the uploaded file
    },
  });
  const upload = multer({ storage: storage });

  registerRouter.post('/add_photo', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ poruka: 'not ok' });
    }

    res.status(200).json({ poruka: file.filename });
  });

export default registerRouter;