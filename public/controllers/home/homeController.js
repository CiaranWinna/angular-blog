// Module that uses postServices and a controller that uses postFactory and $scope
angular
  .module("homeController", ["postServices"])
  .controller("homeController", function(postFactory, $scope) {
    // Call the getAll method in the postFactory module
    postFactory.getAll().then(function(response) {
      // Reverse the order of the articles that are returned to show the latest first
      $scope.articles = response.data.reverse();
    });
  });
