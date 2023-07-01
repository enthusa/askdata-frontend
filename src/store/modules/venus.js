import { Hex } from 'hui-vue';
import { req } from '@/utils';

export default {
  namespaced: true,

  state: {
    instance: {},
    rules: {},
    params: {},
    page: 1,
    pageSize: 20,
    total: 0,
    list: [],
    loading: false,
    url: '/api/bi/venus'
  },

  mutations: {
    updateParams(state, params) {
      state.params = { ...state.params, ...params };
    },

    newInstance(state, instance = {}) {
      state.instance = instance;
    },

    updateInstance(state, instance) {
      state.instance = { ...state.instance, ...instance };
    }
  },

  actions: {
    sqlTranslate({ state }, { tableIds, tablesAndColumn, question, cb = Hex.empty }) {
      req.post(`${state.url}/sqlTranslate`, { tableIds, tablesAndColumn, question }, cb);
    },

    executeQuery({ state }, { tableIds, question, ds, sql, cb = Hex.empty }) {
      req.post(`${state.url}/executeQuery`, { tableIds, question, ds, sql }, cb);
    }
  }
};
