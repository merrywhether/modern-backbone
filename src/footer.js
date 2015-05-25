let Backbone = require('backbone');

let footerViewTemplate = require('./templates/footer.hbs'),
    navItemViewTemplate = require('./templates/navItem.hbs');

let events = require('./events');

class NavItem extends Backbone.Model {
  initialize(options) {
    super.initialize(options);
    this.listenTo(events, 'nav', this.toggleActive);
  }
  toggleActive(target) {
    if (this.get('target') == target) {
      this.set({active: true});
    } else {
      this.set({active: false});
    }
  }
  defaults() {
    return {
      active: false
    };
  }
}

class NavItemView extends Backbone.View {
  initialize(options) {
    super.initialize(options);
    this.listenTo(this.model, 'change:active', this.render);
  }
  tagName() {
    return 'li';
  }
  events() {
    return {
      'click': 'navigate'
    }
  }
  navigate(e) {
    e.preventDefault();
    Backbone.history.navigate(`${this.model.get('target')}.html`, {trigger: true});
    window.scrollTo(0, 0);
  }
  render() {
    this.$el.html(navItemViewTemplate(this.model.attributes));
    if (this.model.get('active')) {
      this.$el.addClass('active');
    } else {
      this.$el.removeClass('active');
    }
    return this;
  }
}

class NavItemList extends Backbone.Collection {
  initialize(models, options) {
    this.model = NavItem;
    super.initialize(models, options);
  }
}

class FooterView extends Backbone.View {
  initialize(options) {
    super.initialize(options);
    this.collection = new NavItemList([
      {title: 'Home', target: 'home'},
      {title: '1: Set-up', target: 'setup'},
      {title: '2: Views', target: 'views'},
      {title: '3: Models', target: 'models'},
      {title: '4: Events', target: 'events'}
    ]);
  }
  render() {
    this.$el.html(footerViewTemplate());
    let $list = this.$el.find('#nav-list');
    this.collection.forEach((item) => {
      $list.append(new NavItemView({model: item}).render().el);
    })
    return this;
  }
}

module.exports = FooterView;
