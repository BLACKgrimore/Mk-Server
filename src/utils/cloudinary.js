import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a local file to Cloudinary.
 *
 * @param {string} localFilePath - The absolute path to the file on disk.
 * @returns {Object|null} - Cloudinary response object if upload is successful, or null if it fails.
 */
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.warn("No file path provided for upload.");
      return null;
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect type (image, video, etc.)
    });

    // Optional: remove the local file after successful upload
    fs.unlinkSync(localFilePath);

    // Log the Cloudinary response (optional in production)
    if (process.env.NODE_ENV !== "test") {
      console.info("✅ File uploaded successfully:", response.secure_url);
    }

    return response;
  } catch (error) {
    // Attempt to clean up local file if upload fails
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (fsErr) {
      console.error("Failed to delete local file after upload error:", fsErr.message);
    }

    // Optional: log the error using a logging service
    console.error("Cloudinary upload failed:", error.message);

    return null;
  }
};

/**
 * Delete a file from Cloudinary using its publicId
 * @param {string} publicId - Cloudinary public identifier
 * @returns {object|null} Deletion result or null
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion failed:", error.message);
    return null;
  }
};

/**
 * Generate a transformed image URL
 * @param {string} publicId - Cloudinary public ID
 * @param {object} options - Transform options (width, height, crop, quality, etc.)
 * @returns {string} Transformed image URL
 */
const getImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        width: options.width || 500,
        crop: options.crop || "scale",
        quality: options.quality || "auto",
        fetch_format: options.fetch_format || "auto",
      },
    ],
  });
};

/**
 * Upload a buffer to Cloudinary
 * @param {Buffer} buffer - File buffer
 * @param {object} options - Additional Cloudinary options
 * @returns {Promise<object|null>} Cloudinary response or null
 */
const uploadBuffer = async (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", ...options },
      (error, result) => {
        if (error) {
          console.error("Cloudinary buffer upload failed:", error.message);
          return reject(null);
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export {
  uploadOnCloudinary,
  uploadBuffer,
  deleteFromCloudinary,
  getImageUrl,
};


// import {v2 as cloudinary} from "clodinary" 
// import fs from "fs" 

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
//   });
  

//   const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the File on Cloudinary 
//         const response = await cloudinary.uploader.upload(localFilePath,{
//             resource_type:"auto"
//         })
//         //file has been uploaded succesfully
//         console.loglog("File is Upload succesful", response.url)
//         return response
//     } catch (error) {
//         fs.unlinkSync (localFilePath) //Removes file as the upload operation got failed
//         return null
//     }
//   }
  

// export {uploadOnCloudinary}