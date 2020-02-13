const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

const year = date.getYear();

app.set("view engine", "ejs");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

app.get("/", (req, res) => {

  Item.find({}, (err, dbItems) => {

    if (err) {
      console.log(err);
    } else {

      if (dbItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          (err) ? console.log(err): console.log("Successfully added default items!");
          res.redirect("/");
        });
      } else {
        res.render("list", {listTitle: "Today", newListItems: dbItems, year: year});
      }
    }
  });
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work list") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work list",
    newListItems: workItems,
    year: year
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    year: year
  });
})

app.listen(3000, function() {
  console.log("The server is running on port 3000.");
});
