const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image
const uploadImage = async (file) => {
    try {
        // Create custom filename
        const fileName = `${Date.now()}-${file.name}`;

        // Upload to cloudinary using temp file path
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            use_filename: true,
            unique_filename: false,
            folder: 'blog-images',
            filename_override: fileName
        });

        return {
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Error uploading to Cloudinary');
    }
};

// Delete image
const deleteImage = async (public_id) => {
    try {
        await cloudinary.uploader.destroy(public_id);
        return { message: "Image deleted successfully" };
    } catch (error) {
        throw new Error(`Error deleting image: ${error.message}`);
    }
};

module.exports = { uploadImage, deleteImage }; 