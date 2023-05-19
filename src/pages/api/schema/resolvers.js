import Product from "../Models/Models";
import Location from "../Models/LocationModel";

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
    async locations() {
      try {
        const locations = await Location.find();
        return locations;
      } catch (error) {
        throw new Error("Error retrieving products from the database");
      }
    },
  },
  Mutation: {
    createLocation: async (parent, args) => {
      console.log(args);
      const { input } = args;
      try {
        const newLocation = await Location.create(input);

        return newLocation;
      } catch (error) {
        throw new Error("Error creating a new product");
      }
    },
    createProduct: async (parent, args) => {
      console.log(args);
      const { input } = args;

      try {
        const newProduct = await Product.create(input);
        console.log(newProduct, "create");
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

    deleteLocation: async (parent, args) => {
      const { id } = args;
      try {
        await Location.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error("Error deleting the product");
      }
    },
    updateLocation: async (parent, args) => {
      const { id, input } = args;
      try {
        const updateLocation = await Location.findByIdAndUpdate(id, input, {
          new: true,
        });
        return updateLocation;
      } catch (error) {
        throw new Error("Error updating the product");
      }
    },
  },
};
export default resolvers;
