// Module that depends on the postServices module and that controller which uses the postFactory, $scope and $routeParams
angular
  .module("singleController", ["postServices"])
  .controller("singleController", function(postFactory, $routeParams, $scope) {
    // Setting instance and scope variables
    const self = this;
    const id = $routeParams.id;
    $scope.comments = [];
    $scope.upVotes = [];
    $scope.upVotesNumber = 0;

    // Articles method that will send the id of the article to getArticle method in the postFactory module
    postFactory.getArticle(id).then(function(response) {
      // Store the response in the scope
      $scope.article = response.data;
    });

    // Comments function that will return all the comments related to the single article
    // Uses the getComments() method from the postFactory module
    postFactory.getComments(id).then(function(response) {
      // Add the returned comments to the scope.comments variable
      $scope.comments.push(response.data);
    });

    // Method used when a comment is made
    self.comment = function(data) {
      // Sends the id and data from the request to the postComment method in the postFactory module
      postFactory.postComment(id, data).then(function(response) {
        // Push the data of the comment to the $scope.comments variable
        $scope.comments[0].push(response.data.data);
        // set instance attributes
        self.form = {};
        self.form.title = "";
      });
    };

    // UpVotes Section that sends the id variable to the getUpVotes method in the postFactory module
    postFactory.getUpVotes(id).then(function(response) {
      // Add the returned data to the $scope.upVotes variable
      $scope.upVotes.push(response.data);
      $scope.upVotesNumber = response.data.length;
    });

    // Method that will send the id and data variables to the postUpVotes method in the postFactory module.
    self.upVotes = function(data) {
      postFactory.postUpVote(id, data).then(function() {
        postFactory.getUpVotes(id).then(function(response) {
          $scope.upVotes.push(response.data);
          $scope.upVotesNumber = response.data.length;
        });
      });
    };
  });
