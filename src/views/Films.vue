<template>
    <div>
        <!-- 排头组件 -->
        <film-header class="sticky"></film-header>
      <router-view></router-view>
    </div>

</template>
<script>
import filmHeader from '@/mycomponents/films/FilmHeader'
export default {
  data () {
    return {
    }
  },

  components: {

    filmHeader
  }

}
</script>
<style lang="scss" scoped>

.sticky{
  position: sticky;
  top: 0px;
  background: white;
  z-index: 100;
}

</style>
