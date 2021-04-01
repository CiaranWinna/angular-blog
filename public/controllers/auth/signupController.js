// Module and controller that uses the postServices and postFactory modules
angular
  .module("signupController", ["postServices"])
  .controller("signupController", function(postFactory) {
    // Store instance information
    this.name = "2940836";
    this.form = {};
    this.message = false;
    const self = this;

    // This function is called when a user tries to signup
    this.registration = function(data) {
      // Send the data to the post function in the postFactory module
      postFactory.post(data).then(function(response) {
        // if the signup is successful
        if (response.data.message == "success") {
          // Set instance and localstorage data
          self.form = {};
          self.message = true;
          localStorage.setItem("isLogin", 1);
          localStorage.setItem("userData", JSON.stringify(response.data));
          $rootScope.login = true;
          // return to the root directory
          location.href = "#";
        }
      });
    };
  });
