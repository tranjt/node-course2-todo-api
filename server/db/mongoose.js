const mongoose = require("mongoose");


// "G:\Program Files\MongoDB\Server\3.4.5\bin\mongod.exe" --dbpath "G:\Program Files\MongoDB\data\mongo-data"
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI);

module.exports =  {
    mongoose
}


// process.env.NODE_ENV === "production"
// process.env.NODE_ENV === "development"
// process.env.NODE_ENV === "test"