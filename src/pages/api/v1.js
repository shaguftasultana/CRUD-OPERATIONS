import nc from "next-connect";
import "../../lib/mongoDb";
import Test from "@/pages/api/Models/Models";

const handler = nc();
// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// update request api
handler.patch(async (req, res) => {
  const { data } = req.body;

  const newData = await Test.findByIdAndUpdate(data._id, data, {
    new: true,
    runValidators: true,
  });
  res.status(202).json({
    status: "OK",
    data: newData,
  });
});

// delete request api
handler.delete("/api/v1", async (req, res) => {
  console.log(req.body.id);
  const data = await Test.findByIdAndDelete(req.body.id);

  res.status(200).json({
    status: "OK",
    data: data,
  });
});

export default handler;
