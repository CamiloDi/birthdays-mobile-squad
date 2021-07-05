const mongoConfig = {
    host: process.env.HOSTDB.toString().replace('$CREDENCTIALS$', `${process.env.USERDB}:${process.env.PASSWORDDB}`),
    database: process.env.NAMEDB,
    collection: 'Employees',
    mongoOptions: {
        useUnifiedTopology: true, useNewUrlParser: true,
        connectTimeoutMS: 30000, keepAlive: 1,
        poolSize: 2
    }
}
const constants = { password: process.env.PASSWORD };

module.exports = { mongoConfig, constants };