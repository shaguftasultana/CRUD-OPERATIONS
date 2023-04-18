 import multer, { diskStorage } from "multer";
 import path from "path";

const upload = multer({
  storage: diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = file.mimetype.split("/")[1];
      const filename = `${file.fieldname}-${uniqueSuffix}.jpeg`;
      req.body.image = filename
      cb(null, filename);
    },
  }),
});

export default upload;

