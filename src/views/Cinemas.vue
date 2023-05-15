<template>
  <div>
    <van-nav-bar title="影院" ref="navbar" @click-left="handleLeft" @click-right="handleRight">
      <template #left>
        {{ $store.state.cityName }}<van-icon name="arrow-down" />
      </template>
      <template #right>
        <van-icon name="search" size="28"  color="black"/>
      </template>
    </van-nav-bar>
    <div class="box" :style="{height:height}">
       <ul>
            <li v-for="data in $store.state.cinemasList" :key="data.cinemaId">
               <div class="left" >
                  <div class="cinemsa_name">{{ data.name }}</div>
                  <div class="cinemsa_text">{{ data.address }}</div>
                  <span>
                  <van-icon name="location-o"/>
                  {{ data.Distance  | DistanceFilter}}km
                 </span>
                </div>
              <!-- 价格 -->
              <div class="right cinemsa_name">
                <div style="color: red;" >￥{{ data.lowPrice/100 }}起</div>
                 <div class="nowPlayingFilm-buy" style="float: right;" >购票</div>
              </div>
             </li>
        </ul>
    </div>
    </div>

</template>
<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
import Vue from 'vue'
Vue.filter('DistanceFilter', (data) => {
  data = Number(data).toFixed(1)
  if (data === parseInt(data)) {
    data = parseInt(data)
  }
  return data
})
export default {
  data () {
    return {
      cinemasList: [],
      height: '0px'
    }
  },
  mounted () {
    // console.log(this.$refs.navbar.$el.offsetHeight)
    // 动态计算高度
    this.height = document.documentElement.clientHeight - this.$refs.navbar.$el.offsetHeight - document.querySelector('footer').offsetHeight + 'px'

    // 分发
    if (this.$store.state.cinemasList.length === 0) {
      this.$store.dispatch('getCinemaData', this.$store.state.cityId).then((res) => {
        this.$nextTick(() => {
          // console.log(document.getElementsByTagName('li').length)
          new BetterScroll('.box', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
    // demo创建完，开始
      this.$nextTick(() => {
      // console.log(document.getElementsByTagName('li').length)
        new BetterScroll('.box', {
          scrollbar: {
            fade: true
          }
        })
      })
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=9604063`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then((res) => {
    // //   console.log(res.data.data.cinemas)
    //   this.cinemasList = res.data.data.cinemas

    // demo创建完，开始
    // this.$nextTick(() => {
    //   // console.log(document.getElementsByTagName('li').length)
    //   new BetterScroll('.box', {
    //     scrollbar: {
    //       fade: true
    //     }
    //   })
    // })
    // })
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=9809864`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {})
  },
  methods: {
    handleLeft () {
      // 跳转到city页面
      this.$router.push('/city')

      // 清空cinemasList
      this.$store.commit('clearcinemas')
    },
    handleRight () {
      this.$router.push('/cinemas/search/')
    }

  }
}
</script>
<style lang="scss" scoped>
.box{
    // height: 38.6875rem;
    overflow: hidden;
    position: relative;//修正滚动条的位置
}
li{
    padding: 0.9375rem;
    border-bottom: 1px solid #ededed;
    display: flex;
    justify-content:space-between;
    .left{
        width: 13.25rem;
        span{
          color: #797d82;
        }

    }
    .cinemsa_name{
        font-size: 15px;

    }
    .cinemsa_text{
        color: #797d82;
        font-size: 12px;
        margin-top: 5px;
    }
    .cinemsa_text{
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       width: 12.5rem;
      }
      .nowPlayingFilm-buy{
    line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ff5f16;
    font-size: 13px;
    text-align: center;
    border-radius: 0.125rem ;
    position: relative;
    top:1.125rem;
  }
  .nowPlayingFilm-buy:after {
    content: " ";
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    position: absolute;
    border: 1px solid #ff5f16;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 4px;
}
}
</style>
