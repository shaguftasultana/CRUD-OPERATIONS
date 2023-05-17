import { gql } from "apollo-server";
import Product from "../Models/Models";

const typeDefs = gql`
  scalar ID

  type Product {
    _id: ID
    productName: String
    description: String
    price: Float
    manufacturedDate: String
    expiryDate: String
    image: String
    category: String
    dropdown: Int
    checkbox: String
  }

  input ProductInput {
    productName: String
    description: String
    price: Float
    manufacturedDate: String
    expiryDate: String
    image: String
    category: String
    dropdown: Int
    checkbox: String
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    deleteProduct(id: ID): Boolean
    updateProduct(id: ID, input: ProductInput): Product
  }
`;

export default typeDefs;
