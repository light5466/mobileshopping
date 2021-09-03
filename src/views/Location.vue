<template>
  <div class="location">
      <!-- navbar  使用插槽-->
    <!-- <van-nav-bar :fixed='true' :left-text="city" left-arrow @click-left='$router.back()' z-index='9'>
    </van-nav-bar> -->
    <van-nav-bar :fixed='true' @click-left='$router.back()'>
      <template #left >
          <van-icon name="arrow-left" color='#0ef8e1' size="20" />
          <span style="color:#0ef8e1">{{city}}</span>
      </template>
      </van-nav-bar>

    <!-- 展示区域 -->
    <main class="main">
        <van-index-bar :sticky-offset-top='46'>
            <template v-for="(key,value) in cityList">
                <van-index-anchor :index="value" :key="value"/>
                    <van-cell :title="item.name" v-for="item in key" :key="item.id" @click="changeCity(item.name)"/>
            </template>
        </van-index-bar>
    </main>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name : 'Location',
    data() {
        return {
            cityList:{},
        }
    },
    created() {
        this.getCitys()
    },
    methods: {
        ...mapMutations(['changeCitys']),
        // 获取城市列表
        getCitys() {
            this.$http.getCitys().then(data => {
                this.cityList = data.data.data.cities
            })
        },
        // 获点击切换城市
        changeCity(city) {
            this.changeCitys(city)
            this.$router.back()
        }
    },
    computed:{
        ...mapState(['city'])
    }

}
</script>

<style lang='less' scoped>
.location{
    .main {
        margin-top: 46px;
    }
}

</style>