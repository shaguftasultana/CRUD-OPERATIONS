// write data to the json file
import fs from "fs";

const writeData = (req, res) => {
  const previousData = JSON.parse(fs.readFileSync("public/data.json", "utf8"));

  if (previousData.length === 0) {
    fs.writeFile("public/data.json", JSON.stringify([req.body]), (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to write data to file." });
      }

      res.status(201).json({
        message: "Data has been written to file.",
        data: [req.body],
      });
    });
  } else {
    previousData.push(req.body);
    fs.writeFile("public/data.json", JSON.stringify(previousData), (err) => {
      if (err) {
        res.status(500).json({ error: "Failed to write data to file." });
      }
      res.status(201).json({
        message: "Data has been written to file.",
        data: previousData,
      });
    });
  }
};

const getData = (req, res) => {
  fs.readFile("public/data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read data from file." });
    }
    res.status(200).json({
      message: "Data has been read from file.",
      length: JSON.parse(data).length,
      data: JSON.parse(data),
    });
  });
};

const deleteData = (req, res) => {
  const previousData = JSON.parse(fs.readFileSync("public/data.json", "utf8"));
  const newData = previousData.filter((item) => item.id !== req.body.id);

  fs.writeFile("public/data.json", JSON.stringify(newData), (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to write data to file." });
    }
    res.status(202).json({
      message: "Data has been Deleted from file.",
      data: newData,
    });
  });
};

const updateData = (req, res) => {
  const previousData = JSON.parse(fs.readFileSync("public/data.json", "utf8"));
  let updatedData = [];

  previousData.forEach((elem, value) => {
    if (elem.id == req.body.id) {
      updatedData.push(req.body);
    } else {
      updatedData.push(elem);
    }
  });

  fs.writeFile("public/data.json", JSON.stringify(updatedData), (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to update data to file." });
    }
    res.status(200).json({
      message: "Data has been updated from file.",
      data: updatedData,
    });
  });
};
export { writeData, getData, deleteData, updateData };
