const { createResponse } = require("../utils/utilities");

exports.health = (req, res) => {
  res.json(
    createResponse(
      global.GYML.code.codeSuccess,
      global.GYML.message.messageSuccess,
      ""
    )
  );
};

exports.error404 = (req, res) => {
  res.json(
    createResponse(
      global.GYML.code.codeErrorNotFound,
      global.GYML.message.messageErrorNotFound,
      ""
    )
  );
};

exports.error500 = (req, res) => {
  res.json(
    createResponse(
      global.GYML.code.codeErrorServer,
      global.GYML.message.messageErrorServer,
      ""
    )
  );
};
