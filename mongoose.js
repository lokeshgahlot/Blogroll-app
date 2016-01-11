module.exports = function() {
  'use strict';
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/blogroll');

  var Schema = mongoose.Schema;
  var BlogSchema = new Schema({
    author: String,
    title: String,
    url: String
  });

  mongoose.model('Blog', BlogSchema);

  var Blog = mongoose.model('Blog');

  /*var blog = new Blog({
    author: 'Lokesh',
    title:'Lokesh\'s blog',
    url:'https://loki.com'
  });

  blog.save();*/

  return Blog;
};
