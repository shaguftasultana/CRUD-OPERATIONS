import nc from "next-connect";
import "../../lib/mongoDb";
import Location from "./Models/LocationModel";
const handler = nc();
export const config = {
  api: {
    bodyParser: true,
  },
};
handler.get(async (req, res) => {
  const allData = await Location.find();
  res.status(200).json({
    status: "OK",
    length: allData.length,
    data: allData,
  });
});
handler.post(async (req, res) => {
  const data = await Location.create(req.body);

  res.status(201).json({
    status: "success",
    data: data,
  });
});
handler.delete("/api/v3", async (req, res) => {
  const data = await Location.findByIdAndDelete(req.body.id);
  res.status(200).json({
    status: "OK",
    data: data,
  });
});

export default handler;
