var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('api/blogs', function(req, res) {

});

app.post('api/blogs', function(req, res) {
  Blog
});

var port = 3000;

app.listen(port);

console.log('Server on', port);
