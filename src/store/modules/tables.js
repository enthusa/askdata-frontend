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
    url: '/api/bi/tables'
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

    getInstanceById({ state }, { id, cb = Hex.empty }) {
      req.get(`${state.url}/${id}`, d => {
        state.instance = d;
        cb(state.instance);
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
