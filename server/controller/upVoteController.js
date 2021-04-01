// import required modules
const UpVotes = require("../dataset/upVotes");

// Function used to get upVotes for a single post
function getUpVotes(req, res) {
  UpVotes.find({ postid: req.params.id }, function(err, UpVotes) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(UpVotes); // return all upvotes in JSON format
  });
}

module.exports.new = function(req, res) {
  // set variables
  const post_id = req.params.id;
  const user = req.session.data.id;

  // find all votes of certain user
  UpVotes.find({ nameOfUser: user }, (err, response) => {
    // variable to show if vote was already in db
    var anyMatching = false;
    // loop through user's votes if any
    for (r in response) {
      // check if certain post has user's vote
      if (!response[r].postid.localeCompare(post_id)) {
        // if yes then remove it
        UpVotes.findOneAndRemove(
          { nameOfUser: user, postid: post_id },
          function(err, data) {
            res.send("");
          }
        );
        // change if founded
        anyMatching = true;
      }
    }

    // if there was no matching
    if (!anyMatching) {
      // add vote on this post
      UpVotes.create(
        {
          postid: post_id,
          nameOfUser: user
        },
        function(err, postid) {
          if (err) res.send(err);

          res.send({ message: "success", data: postid });
        }
      );
    }
  });
};

module.exports.getUpVotes = function(req, res) {
  getUpVotes(req, res);
};
