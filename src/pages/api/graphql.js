import { ApolloServer } from "apollo-server-micro";
import typeDefs from "./schema/typeDefs";
import mongoose from "mongoose";
import resolvers from "./schema/resolvers";
import cors from "cors";

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

const startServer = server.start();
async function handler(req, res) {
  const corsMiddleware = cors();
  await new Promise((resolve) => corsMiddleware(req, res, resolve));

  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
