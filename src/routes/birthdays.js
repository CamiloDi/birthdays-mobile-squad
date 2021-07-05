const api = require("express")();


const controller = require("../controllers/birthdays");

api.route("/getNextBirthday").get(controller.getNextBirthday);


module.exports = api;