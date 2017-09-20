var mongodb = require("mongodb");
const config = require("../config/settings.js");

exports.cn = function (app, opts) {
    opts = opts || {};
    var property = opts.property || "db";
    var connection;

    var isProduction = process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging";
    var mongoconnection = isProduction ? process.env.MongoConnection : config.db_uri;

    return function MongoDb(req, res, next) {
        if (!connection) {
            connection = client.connect(mongoconnection, opts);
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
