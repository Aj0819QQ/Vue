<template>
    <div class="header">
        <i @click="handleBack">
          <van-icon name="arrow-left"/></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.75rem;
    line-height: 2.75rem;
    text-align: center;
    background: white;
    i{
        position: fixed;
        left: 0.625rem;
        top: 0px;
        font-size: 30px;
        height: 2.75rem;
        line-height: 2.75rem;
    }
}
</style>
