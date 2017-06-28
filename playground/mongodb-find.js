// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {
    if (error) {
        return console.log("Unable to connect to MongoDB server");        
    }
    console.log("Connected to MongoDB server");
   

    // db.collection("Todos").find({
    //     _id: new ObjectID("595427c526590019fcec41b1")
    // }).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }).catch((error) => {
    //     console.log("Undable to fetch todos", err);
    // });

     db.collection("Todos").find().count().then((count) => {
        console.log(`Todos count: ${count}`);        
    }).catch((error) => {
        console.log("Undable to fetch todos", error);
    });

    db.collection("Users").find({
        name: "John"
    }).toArray().then((docs) => {
        console.log("Users");
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch((error) => {
        console.log("Undable to fetch todos", error);
    })

    // db.close();
});
