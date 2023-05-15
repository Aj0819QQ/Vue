<template>
    <div class="swiper-contain liaojie">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/swiper.min.css'
export default {
  props: {
  },
  mounted () {
    new Swiper('.liaojie', {

    })
  }
}
</script>
