// Importing required modules
const Comments = require("../dataset/comments");

// Function that is called to retirve stored comments for a post
function getComments(req, res) {
  // Find comments based on postid
  Comments.find({ postid: req.params.id }, function(err, Comments) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(Comments); // return all comments in JSON format
  });
}

// Function used when creating a new comment
module.exports.new = function(req, res) {
  // Stores the id from the request
  const id = req.params.id;
  const user = req.session.data.name;
  // Query to create a new comment for a blog post
  Comments.create(
    {
      postid: id,
      name: user,
      comment: req.body.desc
    },
    // Callback
    function(err, data) {
      // if the query fails
      if (err) res.send(err);
      // If the query is successful
      res.send({ message: "success", data: data });
    }
  );
};

// Function that will pass the req, res to the getComments method above
module.exports.getComments = function(req, res) {
  getComments(req, res);
};
