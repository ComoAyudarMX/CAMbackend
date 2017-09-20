var config = {};

var mongoConnection = "";

if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging") {
    mongoConnection = process.env.MongoConnection;
    secretKey = process.env.SecretKey;
}
else {
    mongoConnection = "mongodb://sa:123456789@localhost:27017/camx";
}

config.mongoConnection = mongoConnection;

module.exports = config;