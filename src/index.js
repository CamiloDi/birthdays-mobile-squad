require("dotenv").config();
const yaml = require("js-yaml");
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");

global.GYML = yaml.safeLoad(fs.readFileSync("config.yml", "utf8"));

// utilities
const { handleError } = require("./utils/errorHandler");
const { convertLocalDate } = require("./utils/utilities");

const app = express();

// routes
const api = require("./routes");

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', api);

// ERROR HANDLER
app.use((err, req, res, next) => {
  err.internalCode = err.internalCode || global.GYML.code.codeErrorServer;
  err.status = err.status || global.GYML.message.messageErrorServer;
  handleError(err, res);
});
app.set("port", process.env.PORT);

app.listen(app.get("port"), () => {
  console.log("--------------------------------------");
  console.log(`| PUERTO ${app.get("port")} | Ambiente: ${process.env.NODE_ENV ? process.env.NODE_ENV : 'LOCAL'} |`);
  console.log(`| Subido el ${convertLocalDate(null, "DD-MM-YYYY HH:mm:ss")}      |`);
});