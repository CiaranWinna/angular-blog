//Creating a angular module named blog and providing the dependencies for the module
const angularApp = angular.module("blog", [
  "ngRoute",
  "homeController",
  "editController",
  "ownController",
  "singleController",
  "signupController",
  "loginController",
  "articleController",
  "postServices"
]);

/*Configuring the module in regards to the route chosen. 
Each module states which template module will imported,the controller 
which will control the state and change the title in the header*/

angularApp.config([
  "$routeProvider",
  a => {
    a.when("/", {
      templateUrl: "./partials/home.html",
      controller: "homeController as hc",
      title: "Athenry Dog Park | Welcome to Galway's First Dog Park!"
    })
      .when("/admin", {
        templateUrl: "./partials/login.html",
        controller: "loginController as lc",
        title: "Athenry Dog Park | Login"
      })
      .when("/signup", {
        templateUrl: "./partials/signup.html",
        controller: "signupController as sc",
        title: "Athenry Dog Park | Blog Registration"
      })
      .when("/new", {
        templateUrl: "./partials/newArticle.html",
        controller: "articleController as ac",
        title: "Athenry Dog Park | Publish New Article"
      })
      .when("/articles", {
        templateUrl: "./partials/articles.html",
        controller: "ownController as oc",
        title: "Athenry Dog Park | Blog Articles"
      })
      .when("/:id/:title", {
        templateUrl: "./partials/singlePost.html",
        controller: "singleController as sc",
        title: "Athenry Dog Park | Blog Post"
      })
      .when("/article/edit/:id", {
        templateUrl: "./partials/editArticle.html",
        controller: "editController as ec",
        title: "Athenry Dog Park | Edit Blog Post"
      });
  }
]);

/*This module acts as the main controller for the app and checks the login status of the app.
If the user logouts then the localStorage memory is cleared*/
angularApp.controller("mainController", function($rootScope) {
  var self = this;
  //Accessing session information
  if (localStorage.getItem("isLogin") == 1) {
    $rootScope.login = true;
    $rootScope.data = JSON.parse(localStorage.getItem("userData"));
  } else {
    $rootScope.login = false;
  }
  // If the user logs out
  this.logout = function() {
    localStorage.clear();
    location.reload();
  };
});
// Module called when angular app is started
angularApp.run([
  "$rootScope",
  "$route",
  function($rootScope, $route) {
    $rootScope.$on("$routeChangeSuccess", function() {
      document.title = $route.current.title;
    });
  }
]);
