const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// remove all todos
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({ _id: "595583fa0bb52d5ad36e9db0"}).then((todo) => {
    console.log(todo)
});

Todo.findByIdAndRemove("595583fa0bb52d5ad36e9db0").then((todo) => {
    console.log(todo);
});