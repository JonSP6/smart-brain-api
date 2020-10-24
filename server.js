const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const home = require("./controllers/home");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//TODO: Home
app.get("/", (req, res) => home.handleHome(req, res, db));

//TODO: Sign In
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//Alternative way to handle Dependency Injection
// app.post("/signin", signin.handleSignin(db, bcrypt));

//TODO: Register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//TODO: Profile
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

//TODO: Image
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

//TODO: Image URL
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

//DB Table 'users':
//wes pword: test
//Mike pword: datass
