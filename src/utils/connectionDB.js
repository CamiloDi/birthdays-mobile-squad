const MongoClient = require('mongodb').MongoClient;

exports.getClient = (mongoConfig) => {
    return new Promise( (resolve, reject) => {
        MongoClient.connect(mongoConfig.host,mongoConfig.mongoOptions,async(err,client) => {
            if (err) {
                reject(err);
            }
            resolve(client);
        });
    })

};
