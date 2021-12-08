const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const dataBase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

    dataBase.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {
        if(error) {
            console.log(error);
        }

        if( results.lenght > 0 ) {
            return res.render("register", {
                message: "That email is already in use"
            });
        } else if( password !== passwordConfirm ) {
            return res.render("register", {
                message: "Passwords do not match"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        dataBase.query("INSERT INTO users SET ?", {name: name, email: email, password: hashedPassword }, (error, results) => {
            if(error) {
                conole.log(error);
            } else {
                return res.render("register", {
                    message: "Registration complete"
                });
            }
        });
    });
}