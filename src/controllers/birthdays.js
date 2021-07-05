// Libs
const moment = require('moment');
// Models
const Employee = require("../models/employe");
const Birthday = require("../models/birthday");


// Utils
const { createResponse, convertStgoTime } = require("../utils/utilities")
const { ErrorHandler } = require("../utils/errorHandler");
const { employeesConnection } = require("../utils/mongo");


exports.getNextBirthday = async (req, res, next) => {
    try {
        const employeesList = await employeesConnection.getAll({ active: true });
        const nowDate = moment(convertStgoTime());
        const employees = employeesList.map((em, index) => {
            let employee = new Employee(em);
            employee.birthday = moment(em.birthday).year(nowDate.year());
            employee.index = index;
            return employee;
        }).sort(dateSort);
        const employeeNextBirthday = employees.filter(em => nowDate.isSameOrBefore(em.birthday, 'month,day'))[0];
        const nextBirthday = {
            nextBirthday: employeeNextBirthday.Birthday,
            nameNextBirthday: employeeNextBirthday.name,
            namePreviusBirthday: employees[employeeNextBirthday.index - 1].name
        }
        res.json(
            createResponse(
                global.GYML.code.codeSuccess,
                global.GYML.message.messageSuccess,
                new Birthday(nextBirthday)
            )
        );
    } catch (e) {
        next(e);
    }
};
const dateSort = (employeA, employeB) => {
    const dateA = new Date(employeA.birthday);
    const dateB = new Date(employeB.birthday);
    return dateA.getTime() - dateB.getTime()
}