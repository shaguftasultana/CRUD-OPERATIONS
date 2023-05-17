import { ApolloServer } from "apollo-server";
import typeDefs from "./schema/typeDefs";
import mongoose from "mongoose";
import resolvers from "./schema/resolvers";

const MONGO_URI =
  "mongodb+srv://shaguftasultanapixako:NpmKWqoJYjLC7l71@cluster0.zjwwayy.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Your API is running at ${url}`);
});
