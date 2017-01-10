//import chai from 'chai';
import mongo from 'mongoskin';
//import tunnel from 'tunnel-ssh';
import fs from 'file-system';

export default class DbConnection {
    static config = {
        host: '178.0.0.0',              // SSH adress
        port: 22049,                    // SSH port
        username: 'dev',                // SSH username
        dstHost: '172.0.0.0',           // Database host
        dstPort: 27017,                 // Database port
        privateKey: fs.readFileSync('./../../.ssh/id_rsa')
    };
    static dbAdress = 'mongodb://localhost:27017/gtd';

    /*static setMongooseConnection(dbQuery) {
        tunnel(DbConnection.config, (error, server) => {
            let lol = DbConnection.config;
            if (error) console.error("Tunnel initialization error!\n" + error);
            console.log('Tunnel connection initialized');

            let db = mongo.db(DbConnection.dbAdress, {native_parser: true});
            console.log('MongoDb connection established');

            dbQuery(db);

            db.close();
        });
    }*/

    static executeQuery(dbQuery) {
        let db = mongo.db(DbConnection.dbAdress, {native_parser: true});
        dbQuery(db);
        db.close();
    }

    static testQuery(db) {
        db.bind('categories');
        db.categories.find({title: 'Test subcategory'}).toArray(function(err, items) {
            if(err != null) console.log(err);
            console.log(items);
        });
    }
}
