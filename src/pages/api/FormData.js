import { readData, writeData, updateData, deleteData } from "./utitlities";

export default function handler(req, res) {
  if (req.method == "GET") readData(req, res);
  else if (req.method == "POST") writeData(req ,res);
  else if (req.method == "PATCH") updateData(req, res);
  else if (req.method == "DELETE") deleteData(req, res);
}
