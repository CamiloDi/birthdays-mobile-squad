// Libs
const moment = require('moment');
const momentTZ = require('moment-timezone');
// Models
const Employee = require("../models/employe");
const Birthday = require("../models/birthday");


// Utils
const { createResponse, convertLocalDate } = require("../utils/utilities")
const { employeesConnection } = require("../utils/mongo");
const { constants } = require("../utils/config");



exports.getNextBirthday = async (req, res, next) => {
    try {
        const employeesList = await employeesConnection.getAll({ active: true });
        const nowDate = moment(convertLocalDate());
        const employees = employeesList.map((em, index) => {
            let employee = new Employee(em);
            employee.birthday = moment(`${em.birthday}T12:00:00-03:00`).year(nowDate.year()).zone("-03:00");
            console.log('em.birthday',em.birthday)
            console.log('employee.birthday',employee.birthday)
            console.log('example',momentTZ(`${em.birthday}T12:00:00-03:00`).year(nowDate.year()).tz(constants.TIMEZONE))
            employee.index = index;
            return employee;
        }).sort(dateSort);
        const employeeNextBirthday = employees.filter(em => nowDate.isSameOrBefore(em.birthday, 'month,day'))[0];
        const nextBirthday = {
            nextBirthday: employeeNextBirthday.birthday,
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