const express = require ("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date= require(__dirname + "/date.js");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



const items = [];
const workItems = [];

app.get("/", (req,res)=>{
    const day = date.getDay();
    res.render("list",{
        listTitle:day,
        newListItems:items,
    });

});

app.post("/",(req,res)=>{
    const item = req.body.newItem;
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/Work")
    } else {
        items.push(item);
        res.redirect("/")
    };
});

app.get("/work", (req,res)=>{
    res.render("list",{listTitle:"Work List", newListItems:workItems});
});

app.get("/about", (req,res)=>{
    res.render("a")
});

app.listen(4000, ()=>{
    console.log(`Server is running now port 4000`);
});