<template>
    <div v-if="filmInfo">
      <left-header >
        {{ filmInfo.name }}
      </left-header>
      <!-- <left-header v-scroll="10">
        {{ filmInfo.name }}
      </left-header > -->
      <!-- <img :src="filmInfo.poster"> -->
      <div :style="{
        backgroundImage:'url('+filmInfo.poster+')'
      }" class="poster">
      </div>
      <div class="content">
        <div>{{ filmInfo.name }}</div>
        <div >
          <div class="detail-text">{{ filmInfo.category }}</div>
          <div class="detail-text">{{ filmInfo.premiereAt | dataFilter}}上映</div>
          <div class="detail-text">{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</div>
          <!-- 详情介绍 动态绑定显示 -->
          <div class="detail-text" style="line-height:15px;" :class="isHidden?'hidden':''">
            {{ filmInfo.synopsis }}
          </div>
          <!-- 下拉图标，引入的是vant图标库 -->
          <div style="text-align: center;">
            <i  @click="isHidden=!isHidden" :class="isHidden?'arrow-down':' arrow-up'" style=" width: 20px;height: 8px;">
              <van-icon name="arrow-down" />
            </i>
          </div>
        </div>
        <!-- 演职人员 -->
        <div>
          <div>演职人员</div>
            <div v-for="(data,index) in filmInfo.actors" :key="index" >
                <img :src="data.avatarAddress" class="avat"/>
            </div>
        </div>

        </div>
        <!-- Loading -->
        <div style="height: 100px;width: 100%;"></div>
      </div>
</template>
<script>
// import axios from 'axios'
import http from '@/util/http'
import obj from '@/util/mixinObj'
import moment from 'moment'
import Vue from 'vue'
import LeftHeader from '@/mycomponents/detail/LeftHeader'

// import { ImagePreview } from 'vant'

Vue.filter('dataFilter', (data) => {
  // console.log(moment().format())
  moment.locale('zh-cn') // 设置成中文
  return moment(data * 1000).format('YYYY-MM-DD')
})

// 定义组件
// Vue.directive('scroll', {
//   inserted (el, blind) {
//     // console.log(el)
//     el.style.display = 'none'

//     window.onscroll = () => {
//       if ((document.documentElement.scrollTop || document.body.scrollTop) > blind) {
//         el.style.display = 'block'
//       } else {
//         el.style.display = 'none'
//       }
//     }
//   },
//   // 指令销毁
//   unbind () {
//     window.onscroll = 'none'
//   }
// })

export default {
  mixins: [obj],
  components: { LeftHeader },
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  methods: {
    // handlePrew () {
    //   ImagePreview(this.filmInfo)
    // }
  },
  mounted () {
    // 当前匹配的路由
    console.log('created', this.$route.params.myid)

    // axios利用myid发请求到详细接口,获取详情页面,布局页面
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=5649318`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  }
  // mounted () {
  //   window.onscroll = () => {
  //     console.log('scroll')
  //     if (document.documentElement.scrollTop >= 50) {
  //       console.log('显示')
  //     } else {
  //       console.log('隐藏')
  //     }
  //   }
  // },
  // destroyed () {
  //   window.onscroll = null
  // }
}
</script>
<style scoped lang="scss">
.poster{
  width: 100%;
  height: 13.125rem;
  background-position: center;
  background-size: cover;
}
.content{
  padding: 0.9375rem;
  .detail-text{
    color: #797d82;
    font-size:13px;
    margin-top: 4px;
  }
  .avat{
    width: 4.0625rem;
    height: 5.3125rem;
    float: left;
    padding: -1px;
    margin: 2px;
  }
}
.hidden{
  overflow: hidden;
  height: 1.875rem;
}

</style>
