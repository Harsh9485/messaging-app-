const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override")

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"));

//index root
app.get("/chats",async (req,res) => {
    let chats = await Chat.find();
    
    res.render("index.ejs",{chats});
});

//new chat root
app.get("/chats/new",(req,res) => { 
    res.render("new.ejs");
});

//save to db chats
app.post("/chats",(req,res) => {
    let {from , msg , to } = req.body;
    let newChat = new Chat({
        from : from,
        msg : msg,
        to : to,
        created_at : Date()
    });
    
    newChat.save().then((res) => 
    {
        console.log("chat saved");
    }).catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});

//chat edit root
app.get("/chats/:id/edit",async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update root
app.put("/chats/:id",async(req,res) => {   
    let {id} = req.params;
    let {msg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,{msg:msg},{new : true,reuValidators : true});
    res.redirect("/chats");
})
// delete root
app.delete("/chats/:id",async(req,res) => {
    let {id} = req.params;
    let delet = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
    
})

app.get("/",(req,res) => {
    res.send("working root");
});

app.listen(8080,() => {
    console.log("app is listening");
})