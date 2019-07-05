const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const DevoteeController = require('./devotee/DevoteeController');
const PostController = require('./devotee/PostController');
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  // Pass to next layer of middleware
  next();
});
app.use('/devotees', DevoteeController);
app.use('/posts', PostController);
//app.use('/posts', PostController);
router.post('/authenticate', function(req, res) {
 res.status(200).send(true);
});

module.exports = app;