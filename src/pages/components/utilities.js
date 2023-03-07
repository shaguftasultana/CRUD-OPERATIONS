import * as Yup from "yup";

// random no generation for unique ID.
function generateRandomId() {
  const idLength = Math.floor(Math.random() * 20) + 1;
  let id = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
}
const validationSchema = Yup.object().shape({
  productname: Yup.string()
    .required("Name is required")
    .min(5, "At Least 5 characters are required"),
  price: Yup.number()
    .typeError("Price is required and must be in Numbers")
    .required("Price is required"),
  expiryDate: Yup.date()
    .typeError("Expiray Date is required")
    .required("Expiry date is required"),
  manufacturedDate: Yup.date()
    .typeError("manufactured date is required")
    .required("manufactured date is required"),
  description: Yup.string().required("description is required"),
  // image:Yup.mixed().required().test("fileType", "Image is required and file type must be an image", (value) => {
  //   return (
  //     value.length && ["image/jpeg", "image/png"].includes(value[0].type)
  //   );
  // }),
  category: Yup.string().required("category is required"),
});
export { generateRandomId, validationSchema };
