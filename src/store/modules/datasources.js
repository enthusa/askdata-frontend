import { Hex } from 'hui-vue';
import { req } from '@/utils';

export default {
  namespaced: true,

  state: {
    catalogs: [],
    instance: {},
    rules: {},
    params: {},
    page: 1,
    pageSize: 20,
    total: 0,
    list: [],
    loading: false,
    url: '/api/bi/datasources'
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
    save({ state }, { cb = Hex.empty }) {
      const { id } = state.instance;
      if (Hex.validId(id)) {
        req.put(`${state.url}/${id}`, state.instance, d => {
          state.instance = d;
          cb(state.instance);
        });
      } else {
        req.post(state.url, state.instance, d => {
          state.instance = d;
          cb(state.instance);
        });
      }
    },

    getAllCatalogs({ state }, { cb = Hex.empty }) {
      req.get('/api/bi/catalogs', d => {
        state.catalogs = d || [];
        cb(state.catalogs);
      });
    },

    getInstanceById({ state }, { id, cb = Hex.empty }) {
      req.get(`${state.url}/${id}`, ({ dataSource, catalogs }) => {
        state.instance = dataSource || {};
        cb(catalogs);
      });
    },

    getListByPage({ state }, payload = {}) {
      state.params = payload.params || state.params;
      const page = payload.page || state.page;
      const pageSize = payload.pageSize || state.pageSize;
      const cb = payload.cb || Hex.empty;
      state.loading = true;
      req.get(state.url, { page, pageSize }, d => {
        state.page = d.page;
        state.pageSize = d.pageSize;
        state.total = d.total;
        state.list = d.list || [];
        state.loading = false;
        cb(state.list);
      });
    }
  }
};
