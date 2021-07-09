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
            employee.birthday =  moment(momentTZ.tz(em.birthday, "YYYY-MM-DD HH:mm Z", constants.TIMEZONE)).year(nowDate.year());
            console.log('em.birthday',em.birthday)
            console.log('employee.birthday',employee.birthday)
            employee.index = index;
            return employee;
        }).sort(dateSort);
        const employeeNextBirthday = employees.filter(em => nowDate.isSameOrBefore(em.birthday, 'month,day'))[0];
        console.log(employeeNextBirthday)
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
        console.log(e)
        next(e);
    }
};
const dateSort = (employeA, employeB) => {
    const dateA = new Date(employeA.birthday);
    const dateB = new Date(employeB.birthday);
    return dateA.getTime() - dateB.getTime()
}