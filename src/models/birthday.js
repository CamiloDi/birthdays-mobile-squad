const { convertStgoTime } = require("../utils/utilities")


class Birthday {
    constructor({ nextBirthday, nameNextBirthday,namePreviusBirthday  } =
        { nextBirthday: '', nameNextBirthday: '', namePreviusBirthday: '' }
    ) {
        this.nextBirthday = convertStgoTime(nextBirthday,'MM-DD');
        this.nameNextBirthday = nameNextBirthday;
        this.namePreviusBirthday = namePreviusBirthday;
    }
}

module.exports = Birthday;