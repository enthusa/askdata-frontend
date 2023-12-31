import Vue from 'vue';
import Vuex from 'vuex';
import datasources from './modules/datasources';
import venus from './modules/venus';
import posts from './modules/posts';
import tables from './modules/tables';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    datasources,
    venus,
    tables,
    posts
  },

  state: {
    settings: {
      visitedViews: JSON.parse(localStorage.getItem('visitedViews')) || [],
      isCollapsed: JSON.parse(localStorage.getItem('isCollapsed'))
    }
  },

  mutations: {
    addVisitedViews(state, route) {
      const { visitedViews } = state.settings;
      if (visitedViews.some(v => v.fullPath === route.fullPath)) {
        return;
      }
      const idx = visitedViews.findIndex(v => v.name === route.name);
      if (idx > -1) {
        visitedViews[idx].fullPath = route.fullPath;
      } else {
        visitedViews.unshift(route);
      }
      state.settings.visitedViews = visitedViews.slice(0, 5);
      localStorage.setItem('visitedViews', JSON.stringify(state.settings.visitedViews));
    },

    updateSettings(state, settings) {
      state.settings = { ...state.settings, ...settings };
      Object.keys(settings).forEach(key => {
        localStorage.setItem(key, JSON.stringify(settings[key]));
      });
    }
  }
});
