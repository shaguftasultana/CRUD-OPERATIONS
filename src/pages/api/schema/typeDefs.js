import { gql } from "apollo-server";

const typeDefs = gql`
  scalar ID
  type Product {
    _id: ID
    productname: String
    description: String
    price: String
    manufacturedDate: String
    expiryDate: String
    image: String
    category: String
    dropdown: String
    checkbox: String
  }
  type Locations {
    _id: ID
    address: String
    lng: Int
    lat: Int
  }

  input ProductInput {
    productname: String
    description: String
    price: String
    manufacturedDate: String
    expiryDate: String
    image: String
    category: String
    dropdown: String
    checkbox: String
  }
  input LocationInput {
    address: String
    lng: Int
    lat: Int
  }

  type Query {
    products: [Product]
    locations: [Locations]
  }

  type Mutation {
    createLocation(input: LocationInput): Locations
    deleteLocation(id: ID): Boolean
    updateLocation(id: ID, input: LocationInput): Locations
    createProduct(input: ProductInput): Product
    deleteProduct(id: ID): Boolean
    updateProduct(id: ID, input: ProductInput): Product
  }
`;

export default typeDefs;
