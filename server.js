var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('./mongoose');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var Blog = mongoose();

// Routes
app.get('/api/blogs', function(req, res) {

  Blog.find(function(err, docs) {
    if (docs) {
      docs.forEach(function(item) {
        console.log('Recevied a GET request');
      });
      res.send(docs);
    }
  });
});

app.post('/api/blogs', function(req, res) {
  console.log('Revevied a POST request blog!');

  for (var key in req.body) {
    console.log(key + ':' + req.body[key]);
  }

  var blog = new Blog(req.body);
  blog.save(function(err, doc) {
    res.send(doc);
  });
});

app.delete('/api/blogs/:id', function(req, res) {
  console.log('Recevied a delete request for id', req.params.id);
  Blog.remove({_id: req.params.id}, function() {
    res.send({_id: req.params.id});
  });
});

app.put('/api/blogs/:id', function(req, res) {
  console.log('Recevied an UPDATE request for id', req.params.id);
  Blog.update({_id: req.params.id}, req.body, function(err) {
    res.send({_id: req.params.id});
  });
});

var port = 3000;

app.listen(port);

console.log('Server on', port);
