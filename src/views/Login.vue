<template>
  <div>
    <div class="headtop">
          <div style="text-align: center;font-size: 20px;top: 200px;position: relative;co">还未登录，先登录！！</div>
           <div style="text-align: center;">
            <button @click="hanleLogin" style="
            color: aqua; font-size: 20px; width: 100%;top: 250px;position: relative;color: black;
            ">立即登录</button>
           </div>
      </div>

  </div>
</template>
<script>
import http from '@/util/http'
export default {
  methods: {

    hanleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', '后端返回的字段')
        // this.$router.back() // 返回
        // 1,获取query字段
        // console.log(this.$route.query.redirect)
        // 2,跳转到当时想要的页面去
        this.$router.push(this.$route.query.redirect)
      }, 0)
    }
  },

  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=9809864`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {})
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
