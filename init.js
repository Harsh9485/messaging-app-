const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

let allChat = [
    {
        from : "rahol",
        to : "jgdish",
        msg : "hi",
        created_at : new Date(),
    },
    {
        from : "raj",
        to : "ram",
        msg : "give me your best photo",
        created_at : new Date(),
    },
    {
        from : "himanshu",
        to : "rohan",
        msg : "kha pa ha",
        created_at : new Date(),
    },
    {
        from : "varon",
        to : "raj",
        msg : "what is your from",
        created_at : new Date(),
    },
    
]

Chat.insertMany(allChat);