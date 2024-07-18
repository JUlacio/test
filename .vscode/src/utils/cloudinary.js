import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.MYCLOUDINARY_CLOUD_NAME,
  api_key: process.env.MYCLOUDINARY_API_KEY,
  api_secret: process.env.MYCLOUDINARY_API_SECRET,
});

export async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "FotosEva",
      use_filename: true,
      unique_filename: false,
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
