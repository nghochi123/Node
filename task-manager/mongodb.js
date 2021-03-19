// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = process.env.MONGO_STRING;
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client)=>{
    if(error){
        return console.log("Unable to connect to database!");
    }
    const db = client.db(databaseName);

    // db.collection('users').deleteMany({
    //     age:20
    // }).then(result=>{
    //     console.log(result);
    // }).catch(error=>{
    //     console.log(error);
    // });

    db.collection('tasks').deleteOne({
        description: 'Clean the room'
    }).then(res=>console.log(res))
    .catch(err=>console.log(err));
});