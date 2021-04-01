// Importing the required packages for the app
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
// const router=express.Router();
const path = require("path");
const database = require("./config/db");
const session = require("express-session");
const port = process.env.port || 3000;

// Initiating the express app
const app = express();

// controllers
var authController = require("./server/controller/authController");
var articleController = require("./server/controller/articleController");
var commentController = require("./server/controller/commentController");
var upVoteController = require("./server/controller/upVoteController");

// database configuration
mongoose.connect(database.localURL);

// Setting the assets directory
app.use(express.static(path.join(__dirname, "public")));
// Setting the the front-end bower assets directory
app.use("/bower_components", express.static(__dirname + "/bower_components"));
// Allowing the app to parse the body into Json
app.use(bodyParser.json());
// Initiating Session setting
app.use(
  session({
    secret: "Assignment 4 blog app",
    resave: false,
    saveUninitialized: true
  })
);
// Allowing the app to use fileUpload for blog posts
app.use(fileUpload());
// Routing for backend requests to the server
app.post("/api/post", authController.signup);
app.post("/api/login", authController.login);
app.post("/api/articles/new", articleController.new);
app.get("/api/articles/all", articleController.getAll);
app.get("/api/articlesbyId/:id", articleController.getById);
app.post("/api/article/update/:id", articleController.updateArticle);
app.get("/api/articles/delete/:id", articleController.deleteArticle);
app.get("/api/view/:id", articleController.deleteArticle1);
app.post("/api/comments/:id", commentController.new);
app.get("/api/comments/:id", commentController.getComments);
app.post("/api/upVotes/:id", upVoteController.new);
app.get("/api/upVotes/:id", upVoteController.getUpVotes);

// listen to server 3000
app.listen(port, () => {
  app.get("port");
});
