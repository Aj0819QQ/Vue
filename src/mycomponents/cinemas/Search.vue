<template>
  <div>
    <form action="/"  class="searche">
    <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    :label="$store.state.cityName"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>
    <ul v-if="value">
      <li v-for="data in computedList" :key="data.cinemaId">
        <div class="left">
          <div class="cinemsa_name">{{ data.name }}</div>
          <div class="cinemsa_text">{{ data.address }}</div>
        </div>

        <!-- 价格 -->
        <div class="right cinemsa_name">
          <div style="color: red">￥{{ data.lowPrice / 100 }}起</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted () {
    if (this.$store.state.cinemasList.length === 0) {
      this.$store.dispatch('getCinemaData', this.$store.state.cityId)
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    onSearch () {
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemasList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  }
}
</script>
<style lang="scss" scoped>
.searche{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
li{
    padding: 0.9375rem;

    display: flex;
    justify-content:space-between;
    .left{
        width: 13.25rem;
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

}
</style>
