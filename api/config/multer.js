import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedFiles = ["image/png", "image/jpg", "image/jpeg"];
  if (!allowedFiles.includes(file.mimetype)) {
    // To reject this file pass `false`
    cb(new Error("Only images are allowed."), false);
  } else {
    // To accept the file pass `true
    cb(null, true);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
