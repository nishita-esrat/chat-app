const cloudinary = require("./cloudinaryConfig");
const cloudinaryUploadImage = async (image, folder_name) => {
  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(image, {
    folder: folder_name,
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

module.exports = cloudinaryUploadImage;
