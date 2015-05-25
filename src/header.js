let Backbone = require('backbone');

let headerViewTemplate = require('./templates/header.hbs');

class HeaderView extends Backbone.View {
  events() {
    return {
      'click a': 'navigate'
    };
  }
  navigate(e) {
    e.preventDefault();
    Backbone.history.navigate('', {trigger: true});
    window.scrollTo(0, 0);
  }
  render() {
    this.$el.html(headerViewTemplate());
    return this;
  }
}

module.exports = HeaderView;
