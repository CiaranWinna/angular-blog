// Module and controller that will utilize the postServices(module), postFactory and routeParams(contorller)
angular
  .module("editController", ["postServices"])
  .controller("editController", function(postFactory, $routeParams) {
    // setting instance varibles
    const self = this;
    const id = $routeParams.id;

    // Passing the id of the request to the getArticle function of the postFactory module
    postFactory.getArticle(id).then(function(response) {
      // Setting the instance varibles with the returned data
      self.form = response.data[0];
      self.form.desc = response.data[0].content;
    });
    // Function used when an article is updated
    self.update = function(data) {
      // Sending the id and data information to the updateArticle method in the postFactory module
      postFactory.updateArticle(id, data).then(function() {
        // Redirect to the articles directory
        location.href = "#!/articles";
      });
    };
  });
