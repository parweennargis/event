require('dotenv').config();
require('./src/utils/db');

const express = require('express');
// const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const responseTime = require('response-time');

const { checkToken } = require('./src/utils/common');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
   
const upload = multer({ storage: storage });

const app = express();
app.upload = upload;

const router = express.Router();

const routes = require('./src/routers')(app, router);

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb' }));
app.use(checkToken);
app.use(responseTime());

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'MulterError') {
    if (err.code === "LIMIT_UNEXPECTED_FILE")
    return res
        .status(err.status || 500)
        .json({ errors: 'No of file upload exceeded' });
  } else {
    return res
        .status(err.status || 500)
        .json({ errors: err.message });
  }
})


const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Running on http://localhost:${port}`) });
