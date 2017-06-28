// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);

// MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
//     if (error) {
//         return console.log("Unable to connect to MongoDB server");        
//     }
//     console.log("Connected to MongoDB server");
//     db.collection("Todos").insertOne({
//         text: "Walk the dog",
//         completed: true
//     }, (error, result) => {
//         if (error) {
//             return console.log("Unable to insert todo", error);
//         }
//         console.log(JSON.stringify(result.ops));
//     });

    // Insert new doc into Users( name, age, location)
    // db.collection("Users").insertOne({        
    //     name: "John",
    //     age: 25,
    //     location: "Sweden"
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    // db.collection("Todos").find().toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((error) => {
    //     console.log("Undable to fetch todos", err);
    // });

    db.close();
});

// "G:\Program Files\MongoDB\Server\3.4.5\bin\mongod.exe" --dbpath "G:\Program Files\MongoDB\data\mongo-data"