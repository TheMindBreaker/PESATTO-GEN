const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const user = require("./schemas/user");
const jwt = require("jsonwebtoken");
const device = require("./schemas/device");
const commands = require("./schemas/commands");
const models = require("./schemas/models");

module.exports.api = (app) => {


    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors({
        origin: '*'
    }));


    app.delete("/auth/sign-out", (req, res) => {
        res.json({token: "", success: true})
    })
    app.post("/auth/sign-up", (req, res) => {
        let user = require('./schemas/user');
        user.model({
            name: req.body.fullName,
            password: req.body.password,
            email: req.body.email

        }).save((err, result) => {
            if (err) {
                res.json(err)
            } else {
                res.json({
                    data: result,
                    token: jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email,
                        devices: result.devices,
                        role: result.role
                    }, "pesatto", {}, () => {
                    })
                })
            }
        });
    })
    app.post("/auth/sign-in", (req, res) => {
        let user = require('./schemas/user');

        user.model.findOne({email: req.body.email}, (err, result) => {
            if (result) {
                if (result.password == req.body.password) {
                    jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email,
                        devices: result.devices,
                        role: result.role
                    }, "pesatto", {}, (err, token) => {
                        res.status(200).json({
                            token: token
                        })
                    });


                } else {

                    res.status(500).json({
                        error: "Password Invalid",
                    })
                }
            } else {
                res.status(500).json({
                    error: "Email Invalid",
                })
            }
        })
    })


    app.get("/device/:id", (req, res) => {
        let deviceId = req.params.id
        device.model.findById(deviceId, (err, result) => {
            res.json(result);
        })
    })

    app.post("/device/command", (req, res) => {
        let userId = jwt.decode(removeBearer(req.headers.authorization)).id
        console.log(userId)
        let command = new commands.model({
            DEVICE: req.body.DEVICE,
            COMMAND_NAME: req.body.COMMAND_NAME,
            COMMAND: req.body.COMMAND,
            MADE_BY: userId,
        });
        command.save((error, result) => {
            res.json({result, error});
        });
    })

    app.get("/device/command/:model", (req, res) => {
        models.model.find({MODEL: req.params.model}, (err, result) => {
            res.json(result)
        })
    })

    app.post("/device/command/:model", (req, res) => {
        let model = new models.model({
            MODEL: req.params.model,
            COMMAND: req.body.COMMAND,
            COMMAND_NAME: req.body.COMMAND_NAME
        })
        model.save((err, result) => {
            res.json({result,err})
        })
    })
    app.get("/devices", (req, res) => {
        let devices = jwt.decode(removeBearer(req.headers.authorization)).devices
        device.model.find({_id: {$in: devices}}, "IDENTIFIER ALIAS STATUS LAST_CON LAST_SOCKET LAST_IP STATUS LATITUDE LONGITUDE PASSWORD", (err, result) => {
            res.json(result)
        })
    })

    app.get("/", (req, res) => {
        res.json("Running as planned")
    })


    app.listen(5000,'0.0.0.0', () => {
        console.log(`Server listening on port 5000}`);
    });

}

function removeBearer(string) {
    return string.split("Bearer ")[1];
}
