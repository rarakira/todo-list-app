//jshint esversion:6

const express = require("express");
const ejs = require("ejs");

const app = express();

let items = ["Buy Food", "Cook food", "Eat food"];

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-GB", options);

  res.render("list", {kindOfDay: day, newListItems: items});

});

app.post("/", function(req, res){
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});


app.listen(3000, function(){
  console.log("The server is running on port 3000.");
});
