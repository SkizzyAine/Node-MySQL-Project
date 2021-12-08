const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const colors = require('colors');

dotenv.config({ path: "./.env" });

const server = express();

const dataBase = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

server.use(express.static(path.join(__dirname, 'public')));

server.use(express.urlencoded({extended: false}));
server.use(express.json());

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

dataBase.connect( (error) => {
    if(error) {
        console.log(Error);
    } else {
        console.log("MySQL Connected...".green);
    }
});

server.use("/", require("./routes/pages"));
server.use("/auth", require("./routes/auth"));

server.listen(3000, () => {
    console.log("Server running on port 3000".green);
});