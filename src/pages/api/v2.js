import nc from "next-connect";
import "../../lib/mongoDb";
import upload from "./Multer";
import Test from "@/Models/Models";

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
handler.use(upload.single("image"));
handler.post(async (req, res) => {
    const data = await Test.create(req.body);
    res.status(201).json({
        status: "success",
        data,
    });
});

// update request api
handler.patch(async (req, res) => {
    const newData = await Test.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(202).json({
        status: "OK",
        data: newData,
    });
});

// delete request api
handler.delete(async(req, res) => {
    console.log('req body',req.body);
    // await Test.findByIdAndDelete(req.body.id);

    res.status(200).json({
        status: "OK",
    });
});

export default handler;
