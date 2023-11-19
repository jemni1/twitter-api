const express = require('express');
const mongoose= require('mongoose');
const port =3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/login",require("./router/login"));
app.use("/api/tweets",require("./router/tweets"));


// // const Message = require('./tweet/message.js');
// // const messages= [];
// // const msg= new  Message("4","dcsvd")
// // const msg1= new  Message("3","dcsvd")
// // messages.push(msg,msg1);
// // const msg3 =messages.findIndex(Message =>Message.id==="3")
// // if(msg3){
// //     messages.splice(msg3,1);
// // }
// // console.log(messages);






  app.listen(port,()=> console.log("le server a demarrer"));
  



