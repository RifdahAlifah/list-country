// fs dan path digunakan untuk mencari file
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// database masih pakai array saja
const database = [];

class StoryOfProphet {
  constructor(name, birth, age, description, place, urlflag) {
    this.name = name;
    this.birth = birth;
    this.age = age;
    this.description = description;
    this.place = place;
    this.urlflag = urlflag;
    // seharusnya ada this id, namun tidak kita memasukannya disini
    // melainkan kita akan generate secara ototmatis sesuai dengan database
  }

  // static method untuk mendapatkan semua data
  // Read All Data
  static all() {
    return database;
  }

  // Read One Data by ID
  static find(id) {
    let data = database.find((data) => data.id === parseInt(id));
    return data;
  }

  // Delete data by ID
  static delete(id) {
    let data = database.find((data) => data.id === parseInt(id));
    if (!data) {
      return;
    }
    // cari index dari data yang dicari
    let index = database.indexOf(data);

    // kita perlu menghapus file gambar benderanya dulu
    if (data.urlflag) {
      // parse url dari string
      let url = new URL(data.urlflag);
      // dapatkan nama file gambar
      let fileName = url.pathname.split("/").pop();
      // dapatkan path file gambar
      let pathFile = path.resolve(
        process.env.PUBLIC_DIR,
        process.env.UPLOAD_DIR,
        fileName
      );

      // Hapus file
      fs.unlink(pathFile, (err) => {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
        } else {
          console.info(`removed`);
        }
      });
    }

    // hapus data dari database
    database.splice(index, 1);

    return true;
  }

  // Create Data
  save() {
    // generate id
    // semisal database masih kosong
    if (database.length === 0) {
      this.id = 1;
    } else {
      this.id = database[database.length - 1].id + 1;
    }

    // push data ke database
    database.push(this);
    return true;
  }

  // Update data
  update(id) {
    let data = database.find((data) => data.id === parseInt(id));
    if (!data) {
      return;
    }

    // cari index dari daa yang dicari
    let index = database.indexOf(data);

    // jika ada data name
    if (this.name) {
      data.name = this.name;
    }
    if (this.birth) {
      data.birth = this.birth;
    }
    if (this.age) {
      data.age = this.age;
    }
    if (this.description) {
      data.description = this.description;
    }
    if (this.place) {
      data.place = this.place;
    }
    if (this.urlflag) {
      data.urlflag = this.urlflag;
    }

    // replace data yang ada di database
    database[index] = data;

    return true;
  }
}

module.exports = StoryOfProphet;
