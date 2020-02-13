const express = require("express");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook food", "Eat food"];
const workItems = [];

const year = date.getYear();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  const day = date.getDate();
  res.render("list", {listTitle: day, newListItems: items, year: year});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work list") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function (req, res) {
  res.render("list", {listTitle: "Work list", newListItems: workItems, year: year});
});

app.get("/about", function (req, res) {
  res.render("about", {year: year});
})

app.listen(3000, function(){
  console.log("The server is running on port 3000.");
});
