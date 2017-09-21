var models = require("../models/eventBinding");
const collection1 = "events";

module.exports.createNewEvent = function (db, model, callback) {
    var resultCallback = {
        transactionDone: false,
        internalError: false
    };
    try {

        db.collection(collection1).insertOne(model, function (err, r) {
            if (err) {
                resultCallback.transactionDone = false;
                resultCallback.internalError = true;
                callback(resultCallback);
                return;
            }
            else {
                if (r.insertedCount == 1) {
                    resultCallback.transactionDone = true;
                    var createdModel = new models.responseCreateEventModel();
                    createdModel.event_id = model._id.toString();
                    resultCallback.content = createdModel;
                    callback(resultCallback);
                    return;
                }
                else {
                    resultCallback.transactionDone = false;
                    resultCallback.internalError = true;
                    callback(resultCallback);
                    return;
                }
            }
        });
    }
    catch (err) {
        resultCallback.transactionDone = false;
        resultCallback.internalError = true;
        callback(resultCallback);
    }
};