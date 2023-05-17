import Product from "../Models/Models";

const resolvers = {
  Query: {
    async products() {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error("Error retrieving products from the database");
      }
    },
  },
  Mutation: {
    createProduct: async (parent, args) => {
      const { input } = args;
      try {
        const newProduct = await Product.create(input);
        return newProduct;
      } catch (error) {
        throw new Error("Error creating a new product");
      }
    },
    deleteProduct: async (parent, args) => {
      const { id } = args;
      try {
        await Product.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error("Error deleting the product");
      }
    },
    updateProduct: async (parent, args) => {
      const { id, input } = args;
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updatedProduct;
      } catch (error) {
        throw new Error("Error updating the product");
      }
    },
  },
};
export default resolvers;
