const api = require("express")();


const controller = require("../controllers/employees");
const validator = require('../validations/employees')

api.route("/")
    .get(controller.all)
    .post(validator.new, controller.new);

api.route('/:id')
    .get(validator.one, controller.one)
    .delete(validator.delete, controller.delete)
    .put(validator.update, controller.update)
    .patch(validator.update, controller.update)


module.exports = api;