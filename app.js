//jshint esversion:6

const express = require("express");
const ejs = require("ejs");

const app = express();

let items = ["Buy Food", "Cook food", "Eat food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-GB", options);

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  let item = req.body.newItem;

  if (req.body.list === "Work list") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function (req, res) {
  res.render("list", {listTitle: "Work list", newListItems: workItems});
});

app.get("/about", function (req, res) {
  res.render("about");
})

app.listen(3000, function(){
  console.log("The server is running on port 3000.");
});
