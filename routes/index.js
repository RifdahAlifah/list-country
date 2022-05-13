require("dotenv").config();
const express = require("express");

const router = express.Router();

// import middleware
const { uploadAnImage } = require("../middlewares/upload-image");
const countryMiddleware = require("../middlewares/country");

// Route menambahkan data pada endndpoint /
router.post("/", uploadAnImage, countryMiddleware.add);

// Route menampilkan semua data pada endndpoint /
router.get("/", countryMiddleware.getAll);

// Route menampilkan data berdasarkan id pada endndpoint /:id
router.get("/:id", countryMiddleware.getById);

// Route untuk mengubah data pada endndpoint /:id
router.post("/:id", uploadAnImage, countryMiddleware.update);

// Route menghapus data berdasarkan id pada endndpoint /:id
router.delete("/:id", countryMiddleware.deleteById);

module.exports = router;