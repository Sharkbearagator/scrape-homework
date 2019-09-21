var express = require ("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cherrio");
var axios = require("axios");
var PORT = 3000;

axios.get("https://www.nytimes.com/").then(function(response) {

  
  var $ = cheerio.load(response.data);

  
  var results = [];

  $("#div.css-1qj0wac eqveam61").each(function(i, element) {

    
    var title = $("h2").text();

    var summary = $("p").text();

    
    var link = $(element).children().attr("href");

    results.push({
      title: title,
      link: link,
      summary: summary
    });
    console.log(results);
  });
});

mongoose.connect("mongodb://localhost/NYTimes", { useNewUrlParser: true });


db.Library.create({ name: "NYT" })
  .then(function(dbLibrary) {
   
    console.log(dbLibrary);
  })
  .catch(function(err) {
    
    console.log(err.message);
  });

  app.listen(PORT, function() {
    console.log("App running on port http://" + PORT + "!");
  });