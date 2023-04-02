const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);
const multer = require(`multer`);
const path = require(`path`);

const app = express();

const rekamMedisRoutes = require(`./src/routes/rekamMedis`);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `images`);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + `-` + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === `image/png` ||
    file.mimetype === `image/jpg` ||
    file.mimetype === `image/jpeg`
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(`/images`, express.static(path.join(__dirname, `images`)));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single(`image`)
);

app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Orgin`, `*`);
  res.setHeader(
    `Access-Control-Allow-Orgin`,
    `GET, POST, PUT, PATCH, DELETE, OPTIONS`
  );
  res.setHeader(`Access-Control-Allow-Orgin`, `Content-Type, Authorization`);
  next();
});

app.use(`/v1/rekammedis`, rekamMedisRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb://gowarasAPI:50G33B4sDiHfAXuj@ac-ib4xsyu-shard-00-00.9t62azo.mongodb.net:27017,ac-ib4xsyu-shard-00-01.9t62azo.mongodb.net:27017,ac-ib4xsyu-shard-00-02.9t62azo.mongodb.net:27017/?ssl=true&replicaSet=atlas-vy78z5-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => app.listen(4000))
  .then(() =>
    console.log("connected to database and listening to localhost 4000")
  )
  .catch((err) => console.log(err));
