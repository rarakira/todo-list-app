//jshint esversion:6

const express = require("express");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-GB", options);

  res.render("list-colour", {kindOfDay: day});
});

app.listen(3000, function(){
  console.log("The server is running on port 3000.");
});
