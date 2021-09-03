import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    city:'定位中...'
  },
  mutations: {
    changeCitys(state,city){
      state.city = city
    }
  },
  actions: {
    changeCitym(content,city){
      content.commit('changeCitys',city)
    }
  },
  modules: {
  },
});
