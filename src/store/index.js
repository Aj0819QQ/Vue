import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // state公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemasList: [],
    isTabbarShow: true
  },

  // 支持异步和同步
  actions: {
    getCinemaData (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=9604063`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then((res) => {
      //   console.log(res.data.data.cinemas)
        store.commit('changeCinemasData', res.data.data.cinemas)
      })
    }
  },

  // 统一管理，被devtool记录状态的修改
  // mutations 只支持同步
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemasData (state, data) {
      state.cinemasList = data
    },
    clearcinemas (state) {
      state.cinemasList = []
    },
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }

  }
})

// vux项目应用

// 1.非父子的通信

// 2.后端数据的缓存快照,减少服务器压力,提高用户体验
