<template>
    <div style="display: flex;">
      <footer>
        <ul>
          <router-link to="/films" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="isActive ? 'liaojie' : ''" >
              <van-icon name="video" />
              电影</li>
          </router-link>

          <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="isActive ? 'liaojie' : ''">
              <van-icon name="vip-card" />
              影院</li>
          </router-link>

          <router-link to="/center" custom v-slot="{ navigate, isActive }">
            <li @click="navigate" :class="isActive ? 'liaojie' : ''">
              <van-icon name="manager" />
              我的</li>
          </router-link>
        </ul>
      </footer>
    </div>
  </template>
  <style lang="scss" scoped>
      footer{
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3.4456rem;
          background:white;
          z-index: 100;
          ul{
              display: flex;
              li{
                  flex: 1;
                  line-height: 3.4456rem;
                  text-align: center;
                  font-size: 20px;
              }

          }
      }
  .liaojie{
    color:red;
  }
  </style>
