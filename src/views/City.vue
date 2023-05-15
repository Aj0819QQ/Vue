<template>
  <div class="city">
      <van-index-bar :index-list="computedList" @select="handleChange">
      <div v-for="data in cityList" :key="data.type">
      <van-index-anchor :index="data.type" style="background-color: #f4f4f4;color: #797d82;padding: 0 -1px;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;" />
      <van-cell :title="item.name"  v-for="item in data.list" :key="item.cityId" @click="handleClick(item)"/>
    </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '@/util/mixinObj'
export default {
  // 混入
  mixins: [obj],
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedList () {
      // 映射成type对象
      return this.cityList.map(item => item.type)
    }
  },

  mounted () {
    // this.$store.commit('hide')
    http({
      url: '/gateway?k=2940679',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      console.log(res.data.data.cities)

      this.cityList = this.renderCity(res.data.data.cities)
      // 1、数据进行字母分组，转化
      // 2、结合组件库渲染
    })
  },
  methods: {
    renderCity (list) {
      const cityList = []
      const letterList = []
      for (let i = 65; i < 91; i++) {
        // console.log(String.fromCharCode(i))
        letterList.push(String.fromCharCode(i))
      }
      letterList.forEach((letter) => {
        const newList = list.filter((item) => item.pinyin.substring(0, 1).toUpperCase() === letter)
        console.log(newList)
        newList.length > 0 && cityList.push({
          type: letter,
          list: newList
        })
      })
      return cityList
    },
    handleChange (data) {
      Toast(data)
    },
    handleClick (item) {
      // vuex-状态管理模式
    //   this.$store.state.cityName = item.name

      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
.van-toast--html, .van-toast--text{
min-width: 30px;
}
</style>
