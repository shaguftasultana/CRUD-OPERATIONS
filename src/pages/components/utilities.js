import * as Yup from "yup";

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

const dateString = "2023-03-01T19:00:00.000Z";
const dateObject = new Date(dateString);

const validationSchema = Yup.object().shape({
  productname: Yup.string()
    .required("Name is required")
    .min(5, "At least 5 characters are required"),
  price: Yup.number()
    .typeError("Price is required and must be in numbers")
    .required("Price is required"),
  expiryDate: Yup.date()
    .required("Expiry date is required"),
  manufacturedDate: Yup.date()
    .min(dateObject, "Manufactured date must be after or equal to today")
    .required("Manufactured date is required"),
  description: Yup.string().required("Description is required"),
  // image:Yup.mixed().required().test("fileType", "Image is required and file type must be an image", (value) => {
  //   return (
  //     value.length && ["image/jpeg", "image/png"].includes(value[0].type)
  //   );
  // }),
  category: Yup.string().required("Category is required"),
});

export { generateRandomId, validationSchema };
