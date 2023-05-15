<template>
  <div>
    <div class="van-cell van-cell--clickable">
        <van-icon name="shopping-cart-o"  size="23" style="height: 1.25rem;line-height:1.25rem;"/><span style="width: 13.0625rem;height: 1.25rem;line-height:1.25rem;padding-left: 1.25rem;">电影订单</span><i class="van-icon van-icon-arrow van-cell__right-icon" ></i>
    </div>
    <div class="van-cell van-cell--clickable">
        <van-icon name="bill-o"  size="23" style="height: 1.25rem;line-height:1.25rem;"/><span style="width: 13.0625rem;height: 1.25rem;line-height:1.25rem;padding-left: 1.25rem;">组合红包</span><i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
     <div class="van-cell van-cell--clickable">
        <van-icon name="friends-o"  size="23" style="height: 1.25rem;line-height:1.25rem;"/><span style="width: 13.0625rem;height: 1.25rem;line-height:1.25rem;padding-left: 1.25rem;">帮助与客服</span><i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div> <div class="van-cell van-cell--clickable">
        <van-icon name="setting-o"  size="23" style="height: 1.25rem;line-height:1.25rem;"/><span style="width: 13.0625rem;height: 1.25rem;line-height:1.25rem;padding-left: 1.25rem;">设置</span><i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>

  </div>
</template>
<script>
export default {
  setup () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.van-cell van-cell--clickable{
  position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 16px;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
</style>
