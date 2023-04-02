const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const Rmschema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    umur: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    anamnesa: {
      type: String,
      required: true,
    },
    diagnosa: {
      type: String,
      required: true,
    },
    terapi: {
      type: String,
      required: true,
    },
    alergiObat: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(`Rmschema`, Rmschema);
