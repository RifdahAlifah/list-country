require("dotenv").config();
const express = require("express");

const router = express.Router();

// import middleware
const { uploadAnImage } = require("../middlewares/upload-image");
const storyMiddleware = require("../middlewares/story");

// Route menambahkan data pada endndpoint /
router.post("/", uploadAnImage, storyMiddleware.add);

// Route menampilkan semua data pada endndpoint /
router.get("/", storyMiddleware.getAll);

// Route menampilkan data berdasarkan id pada endndpoint /:id
router.get("/:id", storyMiddleware.getById);

// Route untuk mengubah data pada endndpoint /:id
router.post("/:id", uploadAnImage, storyMiddleware.update);

// Route menghapus data berdasarkan id pada endndpoint /:id
router.delete("/:id", storyMiddleware.deleteById);

module.exports = router;