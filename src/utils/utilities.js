const momentTZ = require('moment-timezone');

// Config
const { constants } = require("./config");

exports.convertStgoTime = (time, format) => {

    if (time) {
        if (format) return momentTZ(time).tz('America/Santiago').format(format);

        return momentTZ(time).tz('America/Santiago').format();
    }
    if (format) {
        return momentTZ().tz('America/Santiago').format(format);
    }
    return momentTZ().tz('America/Santiago').format();
}

exports.createResponse = (internalCode, message, payload) => ({
    internalCode,
    message,
    payload,
});

exports.getObjectID = (id=null) => (new require('mongodb').ObjectID(id));