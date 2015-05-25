let $ = require('jquery'),
    Backbone = require('backbone');

let homeTemplate = require('./templates/home.hbs'),
    setupTemplate = require('./templates/setup.hbs'),
    viewsTemplate = require('./templates/views.hbs'),
    modelsTemplate = require('./templates/models.hbs'),
    eventsTemplate = require('./templates/events.hbs');

class MainView extends Backbone.View {
  templateMap() {
    return {
      'home': homeTemplate,
      'setup': setupTemplate,
      'views': viewsTemplate,
      'models': modelsTemplate,
      'events': eventsTemplate
    };
  }
  events() {
    return {
      'click a.article-nav': 'navigate'
    };
  }
  navigate(e) {
    e.preventDefault();
    Backbone.history.navigate($(e.currentTarget).data('target'), {trigger: true});
    window.scrollTo(0, 0);
  }
  updateTemplate(target) {
    this.template = this.templateMap()[target];
  }
  render(target) {
    this.updateTemplate(target);
    this.$el.html(this.template());
    return this;
  }
}

module.exports = MainView;
