// Module postServices that has a factory for returning objects depending on the methods called.
// The factory is called postFactory and will use the $http in order to function. The http will
// send the request to the express routes in server.js to handle the request
angular.module("postServices", []).factory("postFactory", function($http) {
  var services = {};

  services.get = () => {
    return $http.get("api/posts");
  };

  services.post = data => {
    return $http.post("api/post", data);
  };

  services.login = data => {
    return $http.post("api/login", data);
  };

  services.newArticle = data => {
    return $http.post("api/articles/new", data);
  };

  services.getAll = () => {
    return $http.get("api/articles/all");
  };

  services.getArticlesById = id => {
    return $http.get("api/articlesbyId/" + id);
  };

  services.updateArticle = (id, data) => {
    return $http.post("api/article/update/" + id, data);
  };

  services.deleteArticle = id => {
    return $http.get("api/articles/delete/" + id);
  };

  services.getArticle = id => {
    return $http.get("/api/view/" + id);
  };

  services.postComment = (id, data) => {
    return $http.post("/api/comments/" + id, data);
  };

  services.getComments = (id, data) => {
    return $http.get("/api/comments/" + id);
  };

  // Upvote section
  services.postUpVote = id => {
    return $http.post("/api/upVotes/" + id);
  };

  services.getUpVotes = (id, data) => {
    return $http.get("/api/upVotes/" + id);
  };
  // End of the upvote

  return services;
});
