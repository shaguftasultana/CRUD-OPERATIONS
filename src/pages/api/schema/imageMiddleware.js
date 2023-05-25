import { createWriteStream, unlink } from "fs";
import { v4 as uuidv4 } from "uuid";

// Assuming you're using `graphql-upload` library
// import { GraphQLUpload } from "graphql-upload";
const uploadDir = "path/to/upload/directory/";

export const storeUpload = async (upload) => {
  const { createReadStream, filename } = await upload;
  const stream = createReadStream();
  const uniqueFilename = `${uuidv4()}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(`${uploadDir}${uniqueFilename}`))
      .on("finish", () => resolve(uniqueFilename))
      .on("error", (error) => {
        unlink(`${uploadDir}${uniqueFilename}`, () => {
          reject(error);
        });
      })
  );
};
