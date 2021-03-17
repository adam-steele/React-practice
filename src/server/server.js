import express from "express";
import cors from "cors";
import {bodyParser} from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";

let port = 7777;

let app = express(); 
app.listen(port, console.log("server listening on", port));

/*app.get('/', (req,res)=>{
    res.send('Hello world!');
})*/

app.use(
    cors(),
   express.urlencoded({
        extended: true
      }),
    express.json()
);

authenticationRoute(app);

export const updateTask = async task =>{
    let {id, group, isComplete, name} = task
    let db = await connectDB();
    let collection = db.collection(`tasks`);
   
    if(group){
        await collection.updateOne({id},{$set:{group}})
    }

    if(name){
        await collection.updateOne({id},{$set:{name}})
    }

    if(isComplete !== undefined){
        await collection.updateOne({id},{$set:{isComplete}})
    }
}

export const addNewTask = async task =>{
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    await collection.insertOne(task);
}

app.post('/task/new',async (req,res)=>{
    let task = req.body.task;
    await addNewTask(task);
    res.status(200).send();
});

app.post('/task/update', async(req,res)=>{
    let task = req.body.task;
    await updateTask(task);
    res.status(200).send();
})
