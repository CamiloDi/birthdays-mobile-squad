const { mongoConfig } = require('./config');
const { getClient } = require('./connectionDB');
const { getObjectID } = require('./utilities');



let client = null;

const initConnectionDB = async () => {
    client = await getClient(mongoConfig);
    console.log('|       Connected to mongoDB         |');
    console.log("--------------------------------------");
}

initConnectionDB();

exports.employeesConnection = {
    getAll: (filter={}) =>
        new Promise(async (resolve, reject) => {
            try {
                // await client.connect();
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.find(filter).toArray();
                resolve(data);

            } catch (err) {
                reject(err);
            }
        }),
    getOne: (idParam) =>
        new Promise(async (resolve, reject) => {
            try {
                let id = getObjectID(idParam);
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.findOne({ id });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }),
    getOneByName: (name) =>
        new Promise(async (resolve, reject) => {
            try {
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.findOne({ name });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }),
    create: (employee) =>
        new Promise(async (resolve, reject) => {
            try {
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.insertOne(employee);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }),
    delete: (idParam) =>
        new Promise(async (resolve, reject) => {
            try {
                let id = getObjectID(idParam);
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.deleteOne({ id });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }),
    update: (employee,idParam) =>
        new Promise(async (resolve, reject) => {
            try {
                let id = getObjectID(idParam);
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.updateOne({id},{$set:employee});
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
};

