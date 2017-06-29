const mongoose = require("mongoose");


// "G:\Program Files\MongoDB\Server\3.4.5\bin\mongod.exe" --dbpath "G:\Program Files\MongoDB\data\mongo-data"
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

module.exports =  {
    mongoose
}