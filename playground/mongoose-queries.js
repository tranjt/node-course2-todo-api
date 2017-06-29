const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// const id = "5955044a82773fdc1676f63011";
// if (!ObjectID.isValid(id)) {
//     console.log("ID not valid");
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos", todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("Todo ", todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log("Id not found");
//     }
//     console.log("Todo by id", todo);
// }).catch((error) => {
//     console.log(error);
// });

const userId = "5954c81ec1c721e0180797cd";

User.findById(userId).then((user) => {
    if (!user) {
        console.log("User not found");
    }
    console.log("User ", user);
}).catch((error) => {
    console.log(error);
});