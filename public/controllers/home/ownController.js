// Moudle that uses postServices and the controller that uses postFactory and scope
angular
  .module("ownController", ["postServices"])
  .controller("ownController", function(postFactory, $scope) {
    // Setting instance variables
    const info = JSON.parse(localStorage.getItem("userData"));

    // User id passed to the getArticlesById method in the postFactory module
    postFactory.getArticlesById(info.userData.id).then(function(response) {
      // Reverse the order of the articles returned so that the latest comes up first
      $scope.articles = response.data.reverse();
    });

    // If an article is requested to be deleted
    $scope.deleteArticle = function(id) {
      // Send the id of the article to the deleteArticle method in the postFactory module
      postFactory.deleteArticle(id).then(function(response) {
        // Reload the current location of the browser
        location.reload();
      });
    };
    // If an article is requested to be edited
    $scope.editArticle = function(id) {
      // Redirect the user to the directory with only the requested blog information
      location.href = "#!/article/edit/" + id;
    };
  });
