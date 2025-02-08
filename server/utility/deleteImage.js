const cloudinary = require("./cloudinaryConfig");
const cloudinaryDeleteImage = async (public_id) => {
  // Delete image from Cloudinary
  const result = await cloudinary.uploader.destroy(public_id);
  return result.result;
};

module.exports = cloudinaryDeleteImage;
