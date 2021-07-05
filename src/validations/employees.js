const { body, param, header } = require("express-validator");

exports.new = [
    body("name").isString().notEmpty().trim(),
    body("birthday").isISO8601("YYYY-MM-DD").notEmpty(),
    body("active").isBoolean().notEmpty(),
    header("password").isString().notEmpty().trim(),
];

exports.one = [param("id").isString().notEmpty().trim()];

exports.delete = [
    param("id").isString().notEmpty().trim(),
    header("password").isString().notEmpty().trim(),
];

exports.update = [
    body("name").isString().notEmpty().trim(),
    body("birthday").isISO8601("YYYY-MM-DD").notEmpty(),
    body("active").isBoolean().notEmpty(),
    header("password").isString().notEmpty().trim(),
];


