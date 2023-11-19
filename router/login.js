const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())
 
let secretkey = "hhh"
function CreateToken(req, res,next){

    const user = {email:req.body.email,password:req.body.password};
    jwt.sign(user,secretkey,(err,resultat)=>{
        if(err){
            res.json({error:err})
        }else{
            res.json({token : resultat})
        }
    });
    next();
}
router.post("/",CreateToken,(req,res)=>{
    // const email = req.body.email;
    // const password = req.body.password;
    // if(!email ||!password){
    //     return res.status(400).json({ error: "Les champs email et dmp sont requis." });
    // }
    // else{
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if(emailPattern.test(email)){
    //         res.json({message: "welcgggooome"})
    //     }
    // }
    // try{
    //     const User = await User.findUser(req.body.email,req.body.password)
    //     res.end(user)
    // }catch(err){
    //     res.status(400).send()
    // }

});


module.exports = router;