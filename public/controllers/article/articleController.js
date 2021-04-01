/*Module articleController that uses the postServices module and has a controller that uses articleController
which uses the post factory*/
angular
  .module("articleController", ["postServices"])
  .controller("articleController", function(postFactory) {
    // Initializing the instance
    this.form = {};
    this.message = false;

    /* When a new article is being created, the passed information is passed to the newArticle method
    in the post factory script*/
    this.publish = function(data) {
      postFactory.newArticle(data).then(function(response) {
        // If creation is complete then send a success message
        if (response.data.message == "success") {
          // return to the root directory
          location.href = "#";
        }
      });
    };
  });
