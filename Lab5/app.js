const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;

const app = express();
const jsonParser = express.json();

const {
    MONGO_DB_HOSTNAME,
    MONGO_DB_PORT,
    MONGO_DB
} = process.env

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}

const url = `mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB}`;


const userScheme = new Schema({ name: String, surname: String, group: String }, { versionKey: false });
const User = mongoose.model("User", userScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect(url, options, function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log("Сервер очікує підключення...");
    });
});

app.get("/api/users", function (req, res) {

    User.find({}, function (err, users) {

        if (err) return console.log(err);
        res.send(users)
    });
});

app.get("/api/users/:id", function (req, res) {

    const id = req.params.id;
    User.findOne({ _id: id }, function (err, user) {

        if (err) return console.log(err);
        res.send(user);
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userSurname = req.body.surname;
    const userGroup = req.body.group;
    const user = new User({ name: userName, surname: userSurname, group: userGroup });

    user.save(function (err) {
        if (err) return console.log(err);
        res.send(user);
    });
});

app.delete("/api/users/:id", function (req, res) {

    const id = req.params.id;
    User.findByIdAndDelete(id, function (err, user) {

        if (err) return console.log(err);
        res.send(user);
    });
});

app.put("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userSurname = req.body.surname;
    const userGroup = req.body.group;
    const newUser = { name: userName, surname: userSurname, group: userGroup };

    User.findOneAndUpdate({ _id: id }, newUser, { new: true }, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
});