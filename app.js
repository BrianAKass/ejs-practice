const express = require ("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let item = '';
let items = [];
app.get("/", (req,res)=>{
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    const day = today.toLocaleDateString("en-us",options);

    res.render("list",{
        today:day,
        newListItems:items,
    });

});

app.post("/", (req,res)=>{
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});


app.listen(4000, ()=>{
    console.log(`Server is running now port 4000`);
});