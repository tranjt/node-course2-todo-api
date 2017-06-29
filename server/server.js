const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {        
        res.send({todos});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

// GET /todos/12345

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        // return needed to break
        return res.status(404).send({ text: "Id not valid"});
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            // return to break
            return res.status(404).send({ text: "Id not found"});
        }
        res.status(200).send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
    
}); 

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log(`Start up at port ${port}`);
});


module.exports = { app };