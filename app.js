const express = require ("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const date= require(__dirname + "/date.js");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema =  new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "gotta put something in amigo."],
    }, //you can add more later here if need be. 
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
    name: "welcome to your to-do list!",
});

const item2 = new Item ({
    name: "Hit the + button to add a new item.",
});

const item3 = new Item ({
    name: "<--- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "gotta put something in amigo."],
    }, //you can add more later here if need be. 
    items: [itemsSchema],
});

const List = mongoose.model("List", listSchema);

const workItems = [];

app.get("/", (req,res)=>{
    //const day = date.getDay();

    Item.find({},(e,foundItems)=>{
        if(foundItems.length===0){
            Item.insertMany(defaultItems, (e)=>{
                if (e){
                    console.log(e);
                }else{
                    console.log("saved to db");
                }
            });
            res.redirect("/"); //loops again to load the updated info
        }else{
            //render everything in here
            res.render("list",{
                listTitle: "Today", //day,
                newListItems:foundItems,
            });
        }
    });

    

});

app.get("/:customListName", function(req,res){
    const customListName = req.params.customListName;
    List.findOne({name:customListName},(e,foundList)=>{
        if (!e) {
            if(!foundList){
                
                //create list of defaults
                const list = new List ({
                    name: customListName,
                    items: defaultItems,
                });
            
                list.save();
                res.redirect(`/${customListName}`)
            } else{
                //show existing list
                res.render("list", {listTitle: customListName, newListItems: foundList.items});
            }
        } 
    });
});

app.post("/",(req,res)=>{
    //post new items to the DB
    //select the target
    const itemName = req.body.newItem;
    //helps differentiate pages via name of the button
    const listName = req.body.list;
    const item = new Item({
        name: itemName,
    });

    if (listName === "Today"){
        item.save();
        res.redirect("/");
    } else {
        //find the list and save there
        List.findOne({name: listName},(e,foundList)=>{
            foundList.items.push(item);
            foundList.save();
            //redirect to requested target not the desired page. same but different.
            res.redirect(`/${listName}`);
        });
    }

});

app.post("/delete", (req,res)=>{
    //when u cant find what u want to select.
    // console.log(req.body);
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId, (e)=>{
        if(e){
            console.log(e);
        }else{
            res.redirect("/");
        }
    });
});


app.get("/about", (req,res)=>{
    res.render("a")
});

app.listen(4000, ()=>{
    console.log(`Server is running now port 4000`);
});