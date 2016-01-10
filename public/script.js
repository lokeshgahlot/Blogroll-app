;(function() {
  'use strict';

  // Modals
  var Blog = Backbone.Model.extend({
    defaults: {
      author: '',
      title: '',
      url: ''
    }
  });

  // Collections
  var Blogs = Backbone.Collection.extend({});

  var blogs = new Blogs();

  // View

  var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
      this.template = _.template($('.blogs-list-template').html());
    },
    events: {
      'click .edit-blog': 'edit',
      'click .update-blog': 'update',
      'click .cancel': 'cancel',
      'click .delete-blog': 'delete'
    },
    edit: function() {
      this.$('.edit-blog').hide();
      this.$('.delete-blog').hide();
      this.$('.update-blog').show();
      this.$('.cancel').show();

      var author = this.$('.author');
      var title = this.$('.title');
      var url = this.$('.url');

      var authorVal = author.html();
      var titleVal = title.html();
      var urlVal = url.html();

      // It is not a good practice use template....For this tutorial only, I am using here
      author.html('<input type="text" class="form-control author-update" value="' + authorVal + '">');
      title.html('<input type="text" class="form-control title-update" value="' + titleVal + '">');
      url.html('<input type="text" class="form-control url-update" value="' + urlVal + '">');
    },
    update: function() {
      this.model.set('author', $('.author-update').val());
      this.model.set('title', $('.title-update').val());
      this.model.set('url', $('.url-update').val());
    },
    cancel: function() {
      blogsView.render();
    },
    delete: function() {
      this.model.destroy();
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  // view for all blogs
  var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
      var self = this;
      this.model.on('add', this.render, this);
      this.model.on('remove', this.render, this);
      this.model.on('change', function() {
        // setTimeout should not use .... I will try to figure out other solution
        // Just try to follow tutorial
        setTimeout(function() {
          self.render();
        }, 30);
      });
    },
    render: function() {
      var self = this;
      self.$el.html('');
      _.each(this.model.toArray(), function(blog) {
        self.$el.append(new BlogView({model: blog}).render().$el);
      });
      return this;
    }
  });

  var blogsView = new BlogsView();

  $(function() {
    $('.add-blog').on('click', function() {
      var author = $('.author-input');
      var title = $('.title-input');
      var url = $('.url-input');

      var blog = new Blog({
        author: author.val(),
        title: title.val(),
        url: url.val()
      });
      blogs.add(blog);
      author.val('');
      title.val('');
      url.val('');
    });
  });

})();
