import nc from "next-connect";
import { writeData, getData, deleteData, updateData } from "./utilities";
import upload from "./Multer";

// handle instance using this we can create/add routes
const handler = nc();

// body parser
export const config = {
  api: {
    bodyParser: false,
  },
};


// get request api
handler.get((req, res) => getData(req, res));

// middleware to handle images in post/patch requests
handler.use(upload.single("image"));

// post request api with images
handler.post((req, res) => writeData(req, res));

// update request api

handler.patch((req, res) => updateData(req, res));

// delete request api
handler.delete((req, res) => {  deleteData(req, res)});

export default handler;