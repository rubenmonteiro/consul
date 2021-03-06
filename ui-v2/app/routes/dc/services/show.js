import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
  repo: service('repository/service'),
  settings: service('settings'),
  queryParams: {
    s: {
      as: 'filter',
      replace: true,
    },
  },
  model: function(params) {
    const repo = get(this, 'repo');
    const settings = get(this, 'settings');
    return hash({
      item: repo.findBySlug(params.name, this.modelFor('dc').dc.Name),
      urls: settings.findBySlug('urls'),
    });
  },
  setupController: function(controller, model) {
    controller.setProperties(model);
  },
});
