import * as Yup from "yup";

const formDataFormat = (data: any, _id?: string) => {
  if (_id) {
    const form = new FormData();
    form.append("_id", _id);
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
  } else {
    const form = new FormData();
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
  }
};

function validationSchemaForm(val: any) {
  if (val) {
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
      dropdown: Yup.mixed().required("Please select an option"),
    });

    return validationSchema;
  } else {
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
        .test("fileType", "Unsupported file type", (value: any) => {
          return (
            value.length &&
            ["image/jpeg", "image/png", "image/avif"].includes(value[0].type)
          );
        }),
      category: Yup.string().required("Category is required"),
      checkbox: Yup.boolean()
        .oneOf([true], "Please agree to the terms and conditions")
        .required("Please agree to the terms and conditions")
        .typeError("Please agree to the terms and conditions"),
      dropdown: Yup.mixed().required("Please select an option"),
    });

    return validationSchema;
  }
}
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 3,
};

export { validationSchemaForm, formDataFormat, modalStyle };
