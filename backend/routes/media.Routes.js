const express = require("express");

const {
  getAllMedia,
  uploadMedia,
  updateMedia,
  deleteMedia,
  replaceMedia,
} = require("../controllers/media.Controller");

const {
  protect,
  adminOnly,
} = require("../middleware/auth.middleware");
const upload = require("../middleware/uploadmiddleware");

const router = express.Router();


// 🌍 Public Routes

router.get("/", getAllMedia);


// 🔐 Admin Routes

router.post(
  "/upload",
  protect,
  adminOnly,
  upload.single("media"),
  uploadMedia
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateMedia
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMedia
);

router.put(
  "/:id/replace",
  protect,
  adminOnly,
  upload.single("media"),
  replaceMedia
);

module.exports = router;