// require yang dibutuhkan
require("dotenv").config();

const { get } = require("express/lib/response");
// import models
const Country = require("../models/country");

// middleware untuk MENDAPATKAN semua data
const getAll = (req, res) => {
  let countries = Country.all();

  // kirimkan ke client
  res.status(200).json({
    status: "success",
    data: countries,
  });
};

// middleware untuk MENDAPATKAN data by id
const getById = (req, res) => {
  let id = req.params.id;
  let country = Country.find(id);

  if (!country) {
    return res.status(404).json({
      status: "data tidak ditemukan",
    });
  }

  // kirimkan ke client
  res.status(200).json({
    status: "success",
    data: country,
  });
};

// middleware untuk MENGHAPUS data by id
const deleteById = (req, res) => {
  let id = req.params.id;
  let country = Country.delete(id);

  if (!country) {
    return res.status(404).json({
      status: "data tidak ditemukan",
    });
  }

  // kirimkan ke client
  res.status(200).json({
    status: "success deleting data",
  });
};

// middleware untuk MENAMBAH data
const add = (req, res) => {
  // desctucturing object dari request body
  let { name, language, continent } = req.body;
  let urlflag;

  if (req.file?.filename) {
    urlflag = `${req.protocol}://${req.get("host")}/${process.env.UPLOAD_DIR}/${
      req.file.filename
    }`;
  }

  let country = new Country(name, language, continent, urlflag);

  // simpan ke database
  country.save();

  // kirimkan ke client
  res.status(200).json({
    status: "success",
    data: country,
  });
};

// middleware UPDATE data
const update = (req, res) => {
  let id = req.params.id;

  // destructuring object dari request body
  let { name, language, continent } = req.body;
  let urlflag;

  if (req.file?.filename) {
    urlflag = `${req.protocol}://${req.get("host")}/${process.env.UPLOAD_DIR}/${
      req.file.filename
    }`;
  }

  let country = new Country(name, language, continent, urlflag);

  // simpan ke database
  let updateData = country.update(id);
  
  // jika data tidak ditemukan
  if (!updateData) {
    return res.status(404).json({
      status: "data tidak ditemukan",
    });
  }

  // kirimkan ke client
  res.status(200).json({
    status: "success",
    data: country,
  });
}


module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.deleteById = deleteById;
module.exports.add = add;
module.exports.update = update;
