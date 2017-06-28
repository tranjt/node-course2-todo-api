// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
    if (error) {
        return console.log("Unable to connect to MongoDB server");        
    }
    console.log("Connected to MongoDB server");
   
    // findOneandUpdate
    // db.collection("Todos").findOneAndUpdate({
    //     _id : new ObjectID("595427c526590019fcec41b1")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection("Users").findOneAndUpdate({
        _id : new ObjectID("595194d0bf21570b809f2013")
    }, {
        $set: {
            name: "Cookie"
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    // db.close();
});
