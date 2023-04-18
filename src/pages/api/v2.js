import nc from "next-connect";
import "../../lib/mongoDb";
import upload from "./Multer";
import Test from "@/pages/api/Models/Models";



const handler = nc();
export const config = {
  api: {
    bodyParser: false,
  },
};

// get request api
handler.get(async (req, res) => {
    const allData = await Test.find();

    res.status(200).json({
        status: "OK",
        length: allData.length,
        data: allData,
    });
});

// post request api with images
handler.post(upload.single("image"), async (req, res) => {
  const data = await Test.create(req.body);

  res.status(201).json({
    status: "success",
    data,
  });
});



export default handler;
