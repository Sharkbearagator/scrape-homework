var express = require ("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("./modules");
var PORT = 3000;

axios.get("https://www.nytimes.com/").then(function(response) {

  
  var $ = cheerio.load(response.data);

  
  var results = [];

  $("h2.css-1qwxefa").each(function(i, element) {

    
    var title = $(element).children("span").text();

    results.push({
      title: title,
    });
});
console.log(results);
});

// mongoose.connect("mongodb://localhost/NYTimes", { useNewUrlParser: true });


// db.Library.create({ name: "NYT" })
//   .then(function(dbLibrary) {
   
//     console.log(dbLibrary);
//   })
//   .catch(function(err) {
    
//     console.log(err.message);
//   });

//   app.listen(PORT, function() {
//     console.log("App running on port http://" + PORT + "!");
//   });