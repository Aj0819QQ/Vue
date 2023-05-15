<template>
    <div>
        <van-list
          v-model="loading"
         :finished="finished"
         finished-text="没有更多了"
         @load="onLoad"
         :immediate-check="false"
>
            <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangepahe(data.filmId)">
              <img :src="data.poster"/>
              <div>
                <div class="title">
                  {{ data.name }}
                 <span>{{ data.filmType.name}}</span>
                </div>
                <div class="content">
                  <!-- 主演，演员 -->
                  <div class="actors">
                    主演: {{ data.actors | actorsFilter }}
                  </div>
                  <div>
                    {{ data.nation }} | {{ data.runtime }}分钟
                  </div>
                </div>
                <div class="nowPlayingFilm-buy" style="float: right;">
                  预售
                </div>
              </div>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
import Vue from 'vue'
// import axios from 'axios'
import http from '@/util/http'
Vue.filter('actorsFilter', (data) => {
  // 映射，join转换成字符串
  // console.log(data.map(item => item.name).join(''))
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join('')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
      // 定义一个新数组，用来添加datalist和res.data.data.films合并传来的
      // newdata: []
    }
  },
  mounted () {
    http({
      url: '/gateway?cityId=440100&pageNum=1&pageSize=10&type=2&k=7812883',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      // console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    onLoad () {
      console.log('到底了')
      // 总长度匹配，禁用懒加载
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      this.current++

      http({
        // eslint-disable-next-line no-template-curly-in-string
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=9809864`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        // console.log(res.data.data.films)

        // 新数据和老数据合并展开合并
        this.datalist = [...this.datalist, ...res.data.data.films]
        // this.newdata = this.datalist.concat(res.data.data.films)

        // 将loading设置成false
        this.loading = false
      })
    },
    handleChangepahe (myid) {
      console.log(myid)
      // 编程式导航
      //   location.href = '#/detail'

      // 1-通过路径跳转
      //   this.$router.push(`/detail/${myid}`)

      // 2-通过命名路由跳转
      this.$router.push({
        name: 'liaojie',
        params: {
          myid: myid
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.van-list{
  .van-cell{
    overflow: hidden;
    padding: 0.9375rem;
    img{
      float: left;
      width: 4.125rem;

    }
    .title{
      font-size: 16px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       width: 10.5rem;
      span{
       font-size: 9px;
       color: #fff;
       background-color: #d2d6dc;
       height: 0.875rem;
       line-height:  0.875rem;
       padding: 0 2px;
       border-radius: 0.125rem;
      }

    }
    .content{
      font-size: 13px;
      color: #797d82;
      .actors{
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       width: 8.5rem;
      }
    }
  }
  .hidden{
    visibility: hidden;
  }
  .nowPlayingFilm-buy{
    line-height: 25px;
    height: 25px;
    width: 50px;
    color: #ffb232;
    font-size: 13px;
    text-align: center;
    border-radius: 0.125rem;
    position: relative;
    top:-2.875rem;
  }
  .nowPlayingFilm-buy:after {
    content: " ";
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    position: absolute;
    border: 1px solid #ffb232;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border-radius: 4px;
}

}
</style>
