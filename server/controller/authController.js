// Import required modules
const User = require("../dataset/users.js");

// signup module that is called when someone creates a user
module.exports.signup = function(req, res) {
  // See if person already exists
  User.find(req.body, (err, response) => {
    // If not, then create a new user
    if (response && response.length == 0) {
      // Query to the database that will add the user
      User.create(
        {
          email: req.body.email,
          name: req.body.name,
          password: req.body.password
        },
        // Callback
        function(err, data) {
          // If there is an error in the query
          if (err) res.send(err);
          // If successful in adding user
          res.send({ message: "success", data: data });
        }
      );
    }
  });
};

// module that handles a person logging in
module.exports.login = function(req, res) {
  // Query to see of the person exists
  User.find(req.body, function(err, results) {
    const result = {};
    // If an error is returned from the query
    if (err) {
      console.log("Error !!");
    }
    // If the query result returns a result
    if (results && results.length == 1) {
      // Assign session data
      req.session.data = { id: results[0]._id, name: results[0].name };
      result["success"] = true;
      result["userData"] = {
        username: results[0].username,
        id: results[0]._id,
        name: results[0].name,
        email: results[0].email
      };
    }
    // If the query does not return a existing user
    else {
      result["success"] = false;
    }
    // return the results in json format
    res.json(result);
  });
};
