const cloudinary = require("../config/cloudinary");
const Media = require("../models/media");
const streamifier = require("streamifier");

// Upload Media
const uploadMedia = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image or video",
      });
    }

    const mediaType = req.file.mimetype.startsWith("video")
      ? "video"
      : "image";

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: mediaType,
          folder: "media-website",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(stream);
    });

    const media = await Media.create({
      title,
      description,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      mediaType,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      message: "Media uploaded successfully 🎉",
      media,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: media.length,
      media,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    res.status(200).json({
      success: true,
      media,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.mediaType,
    });

    await media.deleteOne();

    res.status(200).json({
      message: "Media deleted successfully 🗑️",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMedia = async (req, res) => {
  try {
    const { title, description } = req.body;

    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    media.title = title || media.title;
    media.description =
      description !== undefined
        ? description
        : media.description;

    await media.save();

    res.status(200).json({
      message: "Media updated successfully",
      media,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const replaceMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please select a file",
      });
    }

    // Delete old file from Cloudinary
    await cloudinary.uploader.destroy(media.publicId, {
      resource_type: media.mediaType,
    });

    const newMediaType = req.file.mimetype.startsWith("video")
      ? "video"
      : "image";

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: newMediaType,
          folder: "media-website",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(stream);
    });

    media.url = uploadResult.secure_url;
    media.publicId = uploadResult.public_id;
    media.mediaType = newMediaType;

    await media.save();

    res.status(200).json({
      message: "Media replaced successfully 🔄",
      media,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  uploadMedia,getAllMedia,getSingleMedia,deleteMedia,updateMedia,replaceMedia
};
