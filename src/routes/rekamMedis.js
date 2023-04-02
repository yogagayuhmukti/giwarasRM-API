const express = require("express");
const { body } = require(`express-validator`);

const router = express.Router();

const rekamMedisController = require(`../controllers/rekamMedis`);

router.post(
  `/post`,
  [
    body(`nama`).isLength({ min: 5 }).withMessage(`nama tidak sesuai`),
    body(`umur`).isLength({ min: 5 }).withMessage(`umur tidak sesuai`),
    body(`alamat`).isLength({ min: 5 }).withMessage(`alamat tidak sesuai`),
    body(`anamnesa`).isLength({ min: 5 }).withMessage(`anamnesa tidak sesuai`),
    body(`diagnosa`).isLength({ min: 5 }).withMessage(`diagnosa tidak sesuai`),
    body(`terapi`).isLength({ min: 5 }).withMessage(`terapi tidak sesuai`),
    body(`alergiObat`)
      .isLength({ min: 5 })
      .withMessage(`alergiObat tidak sesuai`),
  ],
  rekamMedisController.createRekamMedisPost
);

router.get(`/posts`, rekamMedisController.getAllRekamMedisPost);
router.get(`/post/:postId`, rekamMedisController.getRekamMedisPostById);
router.put(
  `/post/:postId`,
  [
    body(`nama`).isLength({ min: 5 }).withMessage(`title tidak sesuai`),
    body(`umur`).isLength({ min: 5 }).withMessage(`umur tidak sesuai`),
    body(`alamat`).isLength({ min: 5 }).withMessage(`alamat tidak sesuai`),
    body(`anamnesa`).isLength({ min: 5 }).withMessage(`anamnesa tidak sesuai`),
    body(`diagnosa`).isLength({ min: 5 }).withMessage(`diagnosa tidak sesuai`),
    body(`terapi`).isLength({ min: 5 }).withMessage(`terapi tidak sesuai`),
    body(`alergiObat`)
      .isLength({ min: 5 })
      .withMessage(`alergiObat tidak sesuai`),
  ],
  rekamMedisController.updateRekamMedisPost
);
router.delete(`/post/:postId`, rekamMedisController.deleteRekamMedisPost);

module.exports = router;
