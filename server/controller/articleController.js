//Importing the required modules
const Articles = require("../dataset/articles");

// Function that is called when all articles are needed for display
function getArticles(res) {
  Articles.find(function(err, Articles) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }
    // respond with a json version of the articles retirned form the
    res.json(Articles); // return all todos in JSON format
  });
}

// If a new article is created
module.exports.new = function(req, res) {
  // Get the information from the body
  const title = req.body.title;
  const title_sub = title.split(" ").join("-");

  // See if the article already exists
  Articles.find(req.body, (err, response) => {
    // If the query shows that it doesn't exists
    if (response && response.length == 0) {
      // Run the query to create a new article in the database
      Articles.create(
        {
          //Add the attributes from the request to the article schema
          title: title,
          title_sub: title_sub,
          content: req.body.desc,
          articleby: req.session.data.name,
          articleid: req.session.data.id
        },
        //Callback
        function(err, data) {
          // If there is an error, send the error
          if (err) res.send(err);
          // If a success then send the success message
          res.send({ message: "success", data: data });
        }
      );
    }
    //);
  });
};

// If an article is deleted
module.exports.deleteArticle = function(req, res) {
  // Run the query to remove the article from the database
  Articles.remove(
    {
      // Removes the article based on the passed id
      _id: req.params.id
    },
    // Callback
    function(err, article) {
      // Send if a error is encounted
      if (err) res.send(err);
      // Respond with a json file of the article
      res.json(article);
    }
  );
};

// If an article is deleted
module.exports.deleteArticle1 = function(req, res) {
  // Run the query to remove the article from the database
  Articles.find(
    {
      // Removes the article based on the passed id
      _id: req.params.id
    },
    // Callback
    function(err, article) {
      // Send if a error is encounted
      if (err) res.send(err);
      // Respond with a json file of the article
      res.json(article);
    }
  );
};

// Get an article by a specific id
module.exports.getById = function(req, res) {
  // Run the query that will find the article by an id
  Articles.find({ articleid: req.params.id }, function(err, article) {
    // If the query fails
    if (err) res.send(err);
    // Return a json form of the article
    res.json(article);
  });
};

// If an article needs to be updated
module.exports.updateArticle = function(req, res) {
  // Get the information from the body
  const title = req.body.title;
  const title_sub = title.split(" ").join("-");
  // Query to find only one article based on the passed id
  Articles.findOneAndUpdate(
    { _id: req.params.id },
    { title: title, title_sub: title_sub, content: req.body.desc },
    { upsert: true },
    // callback
    function(err) {
      // error message
      if (err) return res.send(500, { error: err });
      // Return json format of update being successful
      res.json({ success: true });
    }
  );
};

// Get all the articles
module.exports.getAll = function(req, res) {
  getArticles(res);
};
