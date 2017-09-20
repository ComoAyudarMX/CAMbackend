var mongodb = require("mongodb");
const config = require("../config/settings.js");

var client = mongodb.MongoClient;

exports.cn = function (app, opts) {
    opts = opts || {};
    var property = opts.property || "db";
    var connection;

    return function MongoDb(req, res, next) {
        if (!connection) {
            connection = client.connect(config.db_uri, opts);
        }
        connection
            .then(function (db) {
                req[property] = db;
                app.set("mongodb", db);
                next();
            })
            .catch(function (err) {
                connection = undefined;
                next(err);
            });
    };
};
