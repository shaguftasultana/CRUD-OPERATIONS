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
// convert date to structured format data using formData API.
const formDataFormat = (data, id) => {
  const form = new FormData();
  form.append("id", id);
  form.append("productname", data.productname);
  form.append("price", data.price);
  form.append("description", data.description);
  form.append("manufacturedDate", data.manufacturedDate);
  form.append("expiryDate", data.expiryDate);
  form.append("category", data.category);
  form.append("checkbox", data.checkbox);
  form.append("image", data.image[0]);
  form.append("dropdown", data.dropdown);
  return form;
};

function validationSchemaForm(val) {
  if(val){
    const validationSchema = Yup.object().shape({
      productname: Yup.string()
        .required("Name is required")
        .min(5, "At least 5 characters are required"),
      price: Yup.number()
        .typeError("Price is required and must be in numbers")
        .required("Price is required"),
      expiryDate: Yup.string()
        .typeError("enter a valid date")
        .required("Expiry date is required"),
      manufacturedDate: Yup.string().required("Manufactured date is required"),
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
      checkbox: Yup.boolean()
        .oneOf([true], "Please agree to the terms and conditions")
        .required("Please agree to the terms and conditions")
        .typeError("Please agree to the terms and conditions"),
      dropdown: Yup.mixed()
        .required("Please select an option"),
    });

    return validationSchema
  }else{
    const validationSchema = Yup.object().shape({
      productname: Yup.string()
        .required("Name is required")
        .min(5, "At least 5 characters are required"),
      price: Yup.number()
        .typeError("Price is required and must be in numbers")
        .required("Price is required"),
      expiryDate: Yup.string()
        .typeError("enter a valid date")
        .required("Expiry date is required"),
      manufacturedDate: Yup.string().required("Manufactured date is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed()
      .required("Please upload an image")
        .test("fileType", "Unsupported file type", (value) => {
          console.log( value.length );
          return (
            value.length && ["image/jpeg", "image/png"].includes(value[0].type)
          );
        }) ,
      category: Yup.string().required("Category is required"),
      checkbox: Yup.boolean()
        .oneOf([true], "Please agree to the terms and conditions")
        .required("Please agree to the terms and conditions")
        .typeError("Please agree to the terms and conditions"),
      dropdown: Yup.mixed()
        .required("Please select an option"),
    });

    return validationSchema
  }
}

export { generateRandomId, validationSchemaForm, formDataFormat };