const { convertLocalDate, getObjectID } = require("../utils/utilities")


class Employee {
    constructor({ id, name, birthday, active } =
        { id: '', name: '', birthday: new Date(), active: false }
    ) {
        this.id = getObjectID(id);
        this.name = name;
        this.birthday = convertLocalDate(birthday, 'MM-DD');
        this.active = active;
    }
}

module.exports = Employee;