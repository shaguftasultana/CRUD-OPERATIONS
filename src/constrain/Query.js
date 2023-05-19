import { gql } from "@apollo/client";

const PRODUCT_DATA = gql`
  query GetProduct {
    products {
      _id
      productname
      description
      price
      manufacturedDate
      expiryDate
      image
      category
      dropdown
      checkbox
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation createProduct($input: ProductInput) {
    createProduct(input: $input) {
      productname
      description
      price
      manufacturedDate
      expiryDate
      image
      category
      dropdown
      checkbox
    }
  }
`;

export { PRODUCT_DATA, CREATE_PRODUCT };
