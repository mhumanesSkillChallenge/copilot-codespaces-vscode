// Create web server
// Run node comments.js
// Open browser and go to http://localhost:3000
// Enter comments and click submit
// Comments will be displayed on the same page
// Comments are stored in comments.json file

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create web server
var app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up public directory
app.use(express.static('public'));

// Set up view engine
app.set('view engine', 'ejs');

// Set up routes
app.get('/', function(req, res) {
  // Read comments from comments.json file
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  // Render index.ejs with comments
  res.render('index', { comments: comments });
});

app.post('/new', function(req, res) {
  // Read comments from comments.json file
  var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
  // Add new comment to comments
  comments.push(req.body);
  // Write comments to comments.json file
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  // Redirect to home page
  res.redirect('/');
});

// Start web server
app.listen(3000, function() {
  console.log('Listening on port 3000');
});