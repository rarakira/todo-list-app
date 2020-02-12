//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
// const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

// app.use(express.static("foldername"));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){

  var today = new Date();
  var currentDay = today.getDay();
  var day = "";

  console.log(today, currentDay);

  // if (currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  // } else {
  //   day = "Weekday";
  // }

  switch (currentDay) {
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 0:
      day = "Sunday";
      break;
    default:
    console.log("Error, current day is equal to: " + currentDay);
  }
  res.render("list", {kindOfDay: day});
});

app.listen(3000, function(){
  console.log("The server is running on port 3000.");
});
