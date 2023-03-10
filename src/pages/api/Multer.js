const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = file.mimetype.split("/")[1];
      req.body.image = `${file.fieldname}-${uniqueSuffix}.${ext}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    },
  }),
});

module.exports = upload;
