$(document).ready(function () {

    $(document).on("click", "#scrape-articles", scrapeArticles);
    $(document).on("click", "#save-article", saveArticle);
  
    $(document).on("click", "#delete-article", deleteArticle);
    $(document).on("click", "#comment-article", commentArticle);
    $(document).on("click", "#save-comment", saveComment);
    $(document).on("click", "#clear-articles", clearArticles);
  
    function scrapeArticles() {
  
      $.get("/scrape").then(function (data) {
        console.log(data);
        window.location.href = "/";
      });
    };
  
    function saveArticle() {
      
      const articleToSave = $(this)
        .parents(".card")
        .data();
  
      // Remove card from page
      $(this)
        .parents(".card")
        .remove();
  
      articleToSave.saved = true;
      // Using a patch method to be semantic since this is an update to an existing record in our collection
      console.log(articleToSave)
      $.ajax({
        method: "PUT",
        url: "/api/headlines/" + articleToSave._id,
        data: articleToSave
      }).then(function (data) {
        console.log(data)
        // If the data was saved successfully
        if (data) {
          // Run the initPage function again. This will reload the entire list of articles
          // initPage();
          location.reload();
        }
      });
    }
  
    function deleteArticle() {
      const articleToDelete = $(this)
        .parents(".card")
        .data();
  
      // Remove card from page
      $(this)
        .parents(".card")
        .remove();
      // Using a delete method here just to be semantic since we are deleting an article/headline
      console.log(articleToDelete._id)
      $.ajax({
        method: "DELETE",
        url: "/api/delete/" + articleToDelete._id
      }).then(function (data) {
        // If this works out, run initPage again which will re-render our list of saved articles
        if (data) {
          // initPage();
          window.load = "/saved"
        }
      });
    }
  
  
    function commentArticle(event) {
     
      var currentArticle = $(this)
        .parents(".card")
        .data();
      console.log(currentArticle)
      // Grab any notes with this headline/article id
      $.get("/api/notes/" + currentArticle._id).then(function(data) {
        console.log(data)
       
        var noteData = {
          _id: currentArticle._id,
          notes: data || []
        };
        console.log('noteData:' + JSON.stringify(noteData))
       
        $(".btn.save").data("article", noteData);
      
        renderNotesList(noteData);
      });
    }
  
  
    
    function saveComment() {
      
        const noteData;
        const newNote = $("#form8").val().trim();
        
        if (newNote) {
          noteData = { _headlineId: $(this).data("article")._id, noteText: newNote };
          $.post("/api/notes", noteData).then(function() {
           
          });
        }
    }
  
    function clearArticles() {
      $.get("api/clear").then(function(data) {
        console.log(data)
        $("#handlebars-sandbox").empty();
       
        location.reload();
      });
    }
  })