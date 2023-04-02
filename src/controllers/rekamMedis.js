const Rmschema = require(`../models/rekamMedis`);
const { validationResult } = require(`express-validator`);

exports.createRekamMedisPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error(`input value tidak sesuai`);
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  const nama = req.body.nama;
  const umur = req.body.umur;
  const alamat = req.body.alamat;
  const anamnesa = req.body.anamnesa;
  const diagnosa = req.body.diagnosa;
  const terapi = req.body.terapi;
  const alergiObat = req.body.alergiObat;

  const Rekaman = new Rmschema({
    nama: nama,
    umur: umur,
    alamat: alamat,
    anamnesa: anamnesa,
    diagnosa: diagnosa,
    terapi: terapi,
    alergiObat: alergiObat,
  });

  Rekaman.save()
    .then((result) => {
      res.status(201).json({
        message: "Rekam Medus Success",
        data: result,
      });
    })
    .catch((err) => {
      console.log(`err`, err);
    });
};

exports.getAllRekamMedisPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  Rmschema.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Rmschema.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data blog post berhasil dipanggil",
        data: result,
        total_data: totalItems,
        per_page: parseInt(perPage),
        current_page: parseInt(currentPage),
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRekamMedisPostById = (req, res, next) => {
  const postId = req.params.postId;
  Rmschema.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error(`Blog Post tidak ditemukan`);
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: `Data Blog post Berhasil dipanggil`,
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateRekamMedisPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error(`input value tidak sesuai`);
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }
  const nama = req.body.nama;
  const umur = req.body.umur;
  const alamat = req.body.alamat;
  const anamnesa = req.body.anamnesa;
  const diagnosa = req.body.diagnosa;
  const terapi = req.body.terapi;
  const alergiObat = req.body.alergiObat;

  Rmschema.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error(`Blog post tidak ditemukan`);
        err.status = 404;
        throw err;
      }
      post.nama = nama;
      post.umur = umur;
      post.alamat = alamat;
      post.anamnesa = anamnesa;
      post.diagnosa = diagnosa;
      post.terapi = terapi;
      post.alergiObat = alergiObat;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "update Sukses",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteRekamMedisPost = (req, res, next) => {
  const postId = req.params.postId;
  Rmschema.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error(`Blog post tidak ditemukan`);
        err.status = 404;
        throw err;
      }
      return RekamMedisPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Delate Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
