const express = require("express");
const mongoose= require('mongoose');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const Message = require("./message.js");
const messages= [];
let currentId = 1;

const mongodbUri='mongodb+srv://anis:anis@cluster0.2eurl7w.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(mongodbUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const run =async ()=> {
    try {
      await client.connect();
      await client.db("Cluster0").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      return client.db("Cluster0");

    } catch(err){
        console.log(err);
    }
  }


router.post("/", async (req, res)=>{
    
    const msg= new  Message(currentId,req.body.content)
    messages.push(msg);
    
    currentId++;
    const database = client.db('Cluster0');
    const collection = database.collection('messages');
    
    try {

        const insertManyResult = await collection.insertMany(messages);
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);

      } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
      }
    res.json({"content": req.body.content })
});
router.put("/:id",(req, res)=>{
    const msg =messages.find(Message =>Message.id===parseInt(req.params.id))
    if(msg){
        msg.poste=req.body.content;
        console.log(messages);
    }
    res.json({"content": req.body.content })

});
// router.delete("/:id", (req, res)=>{
    
//     const index =messages.findIndex(Message =>Message.id===req.params.id)
//     if(index){
//         messages.splice(index,1);
//     }
//     currentId--;
//     console.log(messages);
//     res.json({message: "welcgggooome"})
// });
router.delete("/:id", async(req, res)=>{
    
    const database = client.db('Cluster0');
    const collection = database.collection('messages');
    
    try{
        const cursor = await collection.deleteOne({id:parseInt(req.params.id) });
        
        if (!cursor) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json({message: 'Message deleted successfully'});
    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });

    }
    
    res.status(400).json({ error: 'Internal Server Error' });
});
router.get("/", async(req, res)=>{
    const database = client.db('Cluster0');
    const collection = database.collection('messages');
    try{
        const cursor = collection.find({});
        const allDocuments = await cursor.toArray();
        res.json(allDocuments);
    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });

    }
    
    res.json({message: messages})
}); 

router.get("/:id", async(req, res)=>{
    const database = client.db('Cluster0');
    const collection = database.collection('messages');
    
    try{
        const cursor = await collection.findOne({id:parseInt(req.params.id) });
        
        if (!cursor) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json(cursor);
    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });

    }
    
    res.status(400).json({ error: 'Internal Server Error' });
});

module.exports = router;