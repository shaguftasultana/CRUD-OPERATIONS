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
const LOCATION_DATA = gql`
  query GetLocation {
    locations {
      _id
      address
      lng
      lat
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
const CREATE_LOCATION = gql`
  mutation createLocation($input: LocationInput) {
    createLocation(input: $input) {
      address
      lng
      lat
    }
  }
`;

const DELETE_ITEM_MUTATION = gql`
  mutation deleteProduct($_id: ID!) {
    deleteProduct(id: $_id)
  }
`;
const DELETE_LOCATION_MUTATION = gql`
  mutation deleteLocation($_id: ID!) {
    deleteLocation(id: $_id)
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation updateProduct($_id: ID!, $input: ProductInput!) {
    updateProduct(id: $_id, input: $input)
  }
`;

export {
  PRODUCT_DATA,
  CREATE_PRODUCT,
  DELETE_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  LOCATION_DATA,
  DELETE_LOCATION_MUTATION,
  CREATE_LOCATION,
};
