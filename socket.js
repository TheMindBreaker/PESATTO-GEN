const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const cors = require('cors');
const jwt = require('jsonwebtoken');

const morgan=require('morgan');
const io = require('socket.io')(httpServer, {
    cors: {origin : '*'}
});
const device = require('./schemas/device');
const user = require("./schemas/user");

module.exports = () => {
    httpServer.listen(5001, () => console.log(`listening on port 3001}`));

    io.on('connection', (socket) => {
        socket.join(socket.handshake.headers.devices.toLowerCase());
    });




    device.model.watch().on('change', data => {
        if(data.operationType == "update") {
            io.to(data.documentKey._id.toString()).emit('details',JSON.stringify(data.updateDescription.updatedFields.DEVICE_VALUE));
        }

    })


    app.listen(5000,()=>{
        console.log(`Server listening on port 3000}`);
    });
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(cors());



    app.post("/auth/sign-up", (req,res)=> {
        let user = require('./schemas/user');
        user.model({
            name: req.body.fullName,
            password: req.body.password,
            email: req.body.email
        }).save((err,result) => {
            if(err) {
                res.json(err)
            } else {
                res.json({
                    data: result,
                    token: jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email
                    }, "pesatto",{},()=>{})
                })
            }
        });
    })

    app.post("/auth/sign-in", (req,res)=> {
        let user = require('./schemas/user');

        user.model.findOne({email:req.body.email},(err,result) => {
            if(result){
                if(result.password == req.body.password) {
                    console.log("ok");
                    jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email
                    }, "pesatto",{},(err, token)=>{
                        console.log(err);
                        console.log(token)
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


    app.get("/device/:id",(req,res) => {
        let deviceId = req.params.id
        device.model.findById(deviceId,(err,result)=> {
            res.json(result);

        })
    })



}

function getActiveRooms(io) {
    // Convert map into 2D list:
    // ==> [['4ziBKG9XFS06NdtVAAAH', Set(1)], ['room1', Set(2)], ...]
    const arr = Array.from(io.sockets.adapter.rooms);
    // Filter rooms whose name exist in set:
    // ==> [['room1', Set(2)], ['room2', Set(2)]]
    const filtered = arr.filter(room => !room[1].has(room[0]))
    // Return only the room name:
    // ==> ['room1', 'room2']
    const res = filtered.map(i => i[0]);
    return res;
}
