// Libs
const { validationResult } = require("express-validator");

// Models
const Employee = require("../models/employe");


// Utils
const { createResponse, getObjectID } = require("../utils/utilities")
const { ErrorHandler } = require("../utils/errorHandler");
const { employeesConnection } = require("../utils/mongo");
const { constants } = require("../utils/config");
exports.all = async (req, res, next) => {
    try {
        const employeesList = await employeesConnection.getAll();
        const employees = employeesList.map((em) => new Employee(em));
        res.json(
            createResponse(
                global.GYML.code.codeSuccess,
                global.GYML.message.messageSuccess,
                employees
            )
        );
    } catch (e) {
        next(e);
    }
};

exports.one = async (req, res, next) => {
    try {
        // Validate Express - Params
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorBadRequest,
                global.GYML.message.messageErrorBadRequest,
                result.mapped()
            );
        }
        // Query
        const { id } = req.params;
        let employee = {};
        await employeesConnection
            .getOne(id)
            .then((e) => {
                employee = new Employee(e);
            })
            .catch((err) => {
                console.log(err);
                throw new ErrorHandler(
                    global.GYML.code.codeErrorServer,
                    global.GYML.message.messageErrorServer,
                    err
                );
            });
        res.json(
            createResponse(
                global.GYML.code.codeSuccess,
                global.GYML.message.messageSuccess,
                employee
            )
        );
    } catch (e) {
        next(e);
    }
};

exports.new = async (req, res, next) => {
    try {
        // Validate Express - Params - Body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorBadRequest,
                global.GYML.message.messageErrorBadRequest,
                result.mapped()
            );
        }
        if (req.headers.password !== constants.password) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorServer,
                global.GYML.message.messageErrorServer,
                { error: "Wrong password!" }
            );
        }
        // Data
        req.body.id = getObjectID();
        let newEmployeeReq = new Employee(req.body);
        let employeeExists = await employeesConnection.getOneByName(newEmployeeReq.name);
        if (employeeExists) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorServer,
                global.GYML.message.messageErrorServer,
                { error: "Employee exists!" }
            );
        } else {
            const employeeCreated = await employeesConnection.create(newEmployeeReq);
            if (employeeCreated) {
                res.json(
                    createResponse(
                        global.GYML.code.codeSuccess,
                        global.GYML.message.messageSuccess,
                        { message: `${newEmployeeReq.name}, has been created successfully!` }
                    )
                );
            } else {
                throw new ErrorHandler(
                    global.GYML.code.codeErrorServer,
                    global.GYML.message.messageErrorServer,
                    { error: "Error has occurred!" }
                );
            }
        }
    } catch (e) {
        next(e);
    }
};

exports.delete = async (req, res, next) => {
    const result = validationResult(req);
    try {
        if (!result.isEmpty()) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorBadRequest,
                global.GYML.message.messageErrorBadRequest,
                result.mapped()
            );
        }
        const { id } = req.params;
        if (req.headers.password !== constants.password) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorServer,
                global.GYML.message.messageErrorServer,
                { error: "Wrong password!" }
            );
        }
        let employeeExists = await employeesConnection.getOne(id);
        if (employeeExists) {
            const deleteResult = await employeesConnection.delete(id);
            if (deleteResult.deletedCount === 1) {
                res.json(
                    createResponse(
                        global.GYML.code.codeSuccess,
                        global.GYML.message.messageSuccess,
                        { message: "Employee removed successfully!" }
                    )
                );
        } else {
            throw new ErrorHandler(
                global.GYML.code.codeErrorServer,
                global.GYML.message.messageErrorServer,
                { error: "Error has occurred!" }
            );
        }
        } else {
            throw new ErrorHandler(
                global.GYML.code.codeErrorServer,
                global.GYML.message.messageErrorServer,
                { error: "Employee not found!" }
            );
        }
    } catch (e) {
        next(e);
    }
};
exports.update = async (req, res, next) => {
    try {
        // Validate Express - Params - Body
        const result = validationResult(req);
        if (!result.isEmpty()) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorBadRequest,
                global.GYML.message.messageErrorBadRequest,
                result.mapped()
            );
        }
        if (req.headers.password !== constants.password) {
            throw new ErrorHandler(
                global.GYML.code.codeErrorServer,
                global.GYML.message.messageErrorServer,
                { error: "Wrong password!" }
            );
        }
        // Data
        const { id } = req.params;
        const updateEmployee = req.body;
        let employeeExists = await employeesConnection.getOne(id);
        if (employeeExists) {
            const updateResult = await employeesConnection.update(updateEmployee,id);
            if (updateResult.result.n === 1) {
                res.json(
                    createResponse(
                        global.GYML.code.codeSuccess,
                        global.GYML.message.messageSuccess,
                        { message: "Employee updated successfully!" }
                    )
                );
            } else {
                throw new ErrorHandler(
                    global.GYML.code.codeErrorServer,
                    global.GYML.message.messageErrorServer,
                    { error: "Error has occurred!" }
                );
            }
        } else {
            throw new ErrorHandler(
                global.GYML.code.codeErrorServer,
                global.GYML.message.messageErrorServer,
                { error: "Employee not found!" }
            );
        }
        
    } catch (e) {
        console.log(e);
        next(e);
    }
};