import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    city:'定位中...',
    userInfo:{},
  },
  mutations: {
    // 修改城市
    changeCitys(state,city){
      state.city = city
    },
    // 修改用户信息
    changeUserInfo(state,userInfo) {
      state.userInfo = userInfo
    },
    // 修改商品信息
    changeLikes(state,p){
      // console.log(typeof p)
      if(typeof p == 'object') {
        state.userInfo.likeList.push({
          product_id:p.product_id,
          name:p.name,
          price:p.price,
          cover:p.cover
        })
      }else {
        state.userInfo.likeList = state.userInfo.likeList.filter((item) => {
            return item.product_id != p
          })
      }
    },
    // 修改地址信息
    changeAddr(state,obj){
      if (obj.type == 'del'){
        // 删除
        state.userInfo.addressList = state.userInfo.addressList.filter(item => {
          return item.id != obj.id
        })
      }else if(obj.type == 'add'){
        // 添加
        state.userInfo.addressList.push(obj)
      }else if(obj.type == 'edit'){
        // 修改
        let index = state.userInfo.addressList.findIndex(item => item.id == obj.id)
        state.userInfo.addressList.splice(index,1,obj)
      }
    }
  },
  actions: {
    changeCitym(content,city){
      content.commit('changeCitys',city)
    },
    // 修改用户信息
    changeUserInfom(content,userInfo) {
      content.commit('changeUserInfo',userInfo)
    }

  },
  getters:{
    isLogin(state) {
      return  JSON.stringify(state.userInfo) == '{}'
    }
  },
  modules: {
  },
});
