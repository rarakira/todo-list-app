const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();

const year = date.getYear();

app.set("view engine", "ejs");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0-xh2y4.gcp.mongodb.net/todolistDB`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please, add a new task!"]
  }
});

const Item = mongoose.model("Item", itemsSchema);

const itemOne = new Item({
  name: "Welcome to your todolist!"
});

const itemTwo = new Item({
  name: "Hit the + Button to add a new item."
});

const itemThree = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [itemOne, itemTwo, itemThree];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {

  Item.find({}, (err, foundItems) => {

    if (err) {
      console.log(err);
    } else {

      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          (err) ? console.log(err): console.log("Successfully added default items!");
          res.redirect("/");
        });
      } else {
        res.render("list", {listTitle: "Today", newListItems: foundItems, year: year});
      }
    }
  });
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listTitle = req.body.list;

  const itemNew = new Item ({
    name: itemName
  });

  if (listTitle === "Today") {

    itemNew.save();
    console.log("The item \"" + itemNew.name + "\" has been added to the " + listTitle + " list!");
    res.redirect("/");

  } else {

    List.findOneAndUpdate({name: listTitle}, {$push: {items: itemNew}}, (err, foundList) => {
      if (!err) {
        console.log("The item \"" + itemNew.name + "\" has been added to the " + listTitle + " list!");
        res.redirect("/" + listTitle)
      }
    });

  }

});

app.post("/delete", (req, res) => {

  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {

    Item.findByIdAndRemove(checkedItemID, (err) =>{
      if (err) {
        console.log(err);
      } else {
        console.log("The item was successfully deleted!");
        res.redirect("/");
      }
    });

  } else {

    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemID}}}, (err, foundList) => {
      if (!err) {
        res.redirect("/" + listName);
      }
    });

  }

});



app.get("/:customListName", function(req, res) {

  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, (err, foundList) => {
    if (err) {
      console.log(err);
    } else {
      if (!foundList) {

        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        console.log("Added a new list " + customListName + " to DB");
        res.redirect("/" + customListName);

      } else {

        res.render("list", {
          listTitle: customListName,
          newListItems: foundList.items,
          year: year
        });

      }
    }
  });

});

app.get("/about", function(req, res) {
  res.render("about", {
    year: year
  });
})

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
//
// app.listen(port, function() {
//   console.log("The server has started successfully.");
// });

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server is running at http://${process.env.HOST}:${process.env.PORT}/`);
});
