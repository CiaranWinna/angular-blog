// Module loginController that depends on the postServices module
angular
  .module("loginController", ["postServices"])
  // controller loginController that will use the postFactory and rootScrope
  .controller("loginController", function(postFactory, $rootScope) {
    // store the instance
    const self = this;
    // if a login attempt is made
    this.login = function(data) {
      // send the data to the login function in the postfactory module
      postFactory.login(data).then(function(response) {
        // If the login is successful
        if (response.data.success == true) {
          // set the localStorage data
          localStorage.setItem("isLogin", 1);
          localStorage.setItem("userData", JSON.stringify(response.data));
          $rootScope.login = true;
          $rootScope.data = response.data;
          // return to the root directory
          location.href = "#";
        } else {
          self.message = true;
        }
      });
    };
  });
