let $ = require('jquery'),
    Backbone = require('backbone'),
    Handlebars = require('hbsfy/runtime');

Backbone.$ = $;

let HeaderView = require('./header'),
    MainView = require('./main'),
    FooterView = require('./footer');

let events = require('./events');

class AppRouter extends Backbone.Router {
  initialize(options) {
    super.initialize(options);
    this.route('*path', 'homeRedirect');
    this.route('', 'home');
    this.route('setup.html', 'setup');
    this.route('views.html', 'views');
    this.route('models.html', 'models');
    this.route('events.html', 'events');

    this.headerView = new HeaderView({el: $('header')});
    this.headerView.render();

    this.mainView = new MainView({el: $('main')});

    this.footerView = new FooterView({el: $('footer')});
    this.footerView.render();
  }
  start() {
    Backbone.history.start({
      pushState: true,
      root: '/modern-backbone/'
    });
  }
  homeRedirect(options) {
    Backbone.history.navigate('', {trigger: true});
  }
  home(options) {
    events.trigger('nav', 'home');
    this.mainView.render('home');
  }
  setup(options) {
    events.trigger('nav', 'setup');
    this.mainView.render('setup');
  }
  views(options) {
    events.trigger('nav', 'views');
    this.mainView.render('views');
  }
  models(options) {
    events.trigger('nav', 'models');
    this.mainView.render('models');
  }
  events(options) {
    events.trigger('nav', 'events');
    this.mainView.render('events');
  }
}

let app = new AppRouter();
$(app.start);
