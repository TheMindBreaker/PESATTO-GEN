const config = require('./config.json');
const express = require('express');
const db = require("./dbcon");
const path = require("path")
const hbs = require( 'express-handlebars' );
const bodyParser = require("body-parser");

const services = [];



config.protocols.forEach(protocol => {
    if(protocol.enable){
        services.push(require("./protocols/"+protocol.name));
    }
})

const app = express();
const publicDir = path.join(__dirname, './public')
app.engine( 'hbs', hbs.engine( {
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
} ) );
app.set( 'view engine', 'hbs' );

app.use(express.static(publicDir))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/main", (req, res) => {
    db.query("SELECT * FROM devices",(err,rows) => {
        res.render("main",{rows})

    });

})
app.get("/login", (req, res) => {
    res.render("login")
})


app.post("/auth/register", (request, response) => {
    const { name, email, password, password_confirm } = request.body
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if(error){
            console.log(error)
        }

        if( result.length > 0 ) {
            return response.render('register', {
                message: 'This email is already in use'
            })
        } else if(password !== password_confirm) {
            return response.render('register', {
                message: 'This email is already in use'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        console.log(hashedPassword)

        db.query('INSERT INTO users SET?', {name: name, email: email, password: hashedPassword}, (err, result) => {
            if(error) {
                console.log(error)
            } else {
                return res.render('register', {
                    message: 'User registered!'
                })
            }
        })
    })
})


app.listen(5000, ()=> {
    console.log("server started on port 5000")
})


