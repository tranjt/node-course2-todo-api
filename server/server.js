require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { authenticate } = require("./middleware/authenticate");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get("/todos", authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {        
        res.send({todos});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// GET /todos/12345

app.get("/todos/:id", authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        // return needed to break
        return res.status(404).send({ text: "Id not valid"});
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            // return to break
            return res.status(404).send({ text: "Id not found"});
        }
        res.status(200).send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
    
}); 

app.delete("/todos/:id",authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.patch("/todos/:id", authenticate, (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();        
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    
    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((error) => {
        res.status(400).send();
    });
});

// POST /users

app.post("/users", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);    
    var user = new User(body);  

    user.save().then(() => {
        
        return user.generateAuthToken();
    }).then((token) => {
        
        res.header("x-auth", token).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});


app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
});


// POST /users/login { email, password }
app.post("/users/login", (req, res) => {
    const body = _.pick(req.body, ["email", "password"]);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
             res.header("x-auth", token).send(user);
        });
    }).catch((error) => {
        res.status(400).send();
    });    
});
    
app.delete("/users/me/token", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((error) => {
        res.status(400).send();
    });
});


app.listen(port, () => {
    console.log(`Start up at port ${port}`);
});


module.exports = { app };