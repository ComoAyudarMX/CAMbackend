var express = require('express');
var router = express.Router();
const Joi = require("joi");
var models = require("../models/eventBinding");
var messageResponse = require("webservice-tools");
var transaction = require("../transactions/eventTransaction");

/* GET users listing. */
router.post('/', function (req, res, next) {
    var model = req.body;
    var db = req.db;
    res.contentType("application/json");

    Joi.validate(model, models.newEventModel, function (err, validModel) {
        if (err) {
            var Ok = {};
            Ok = messageResponse.OkReponse(messageResponse.InvalidModel());
            err.details.forEach(function (v, i) {
                Ok.body.message.push(v.message.split("\"").join(""));
            });
            res.status(Ok.statusCode);
            res.json(Ok.body);
            return;
        }
        else {
            transaction.createNewEvent(db, validModel, function (result) {
                if (result.transactionDone) {
                    var Ok = {};
                    Ok = messageResponse.OkReponse(messageResponse.RegisterCreated());
                    Ok.body.content = result.content;
                    res.status(200);
                    res.json(Ok.body);
                    return;
                }
            });
        }
    });

});

module.exports = router;
