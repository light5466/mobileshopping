<template>
  <div class="home">
    <!-- navbar  使用插槽-->
    <van-nav-bar title="精选" :fixed='true' @click-left='toLocation' @click-right='toSearch'>
      <template #right>
        <van-icon name="search" color='#0ef8e1' size="20" />
      </template>
      <template #left >
        <van-icon name="location" color='#0ef8e1' size="20" />
        <span>{{city}}</span>
      </template>
    </van-nav-bar>

    <!-- 主要内容区。 -->
    <main class="main" @scroll="mainScroll" ref="rmain" >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="content" ref="rcontent">

        <div class="good-list" v-for="item in goodList" :key="item.id" @click="toDetail(item.id)">
          <img v-lazy="item.cover" alt="">
          <div class="good-info">
            <h3>{{item.name}}</h3>
            <span>{{item.price | priceFilter }}</span>
          </div>
        </div>

      </div>
      </van-pull-refresh>
    </main>

    <!-- 跳转至顶部悬框 -->
    <van-icon name="arrow-up" size='28' class="toup" v-show="isUp" @click='toUp'/>

  </div>
  
</template>

<script>
import {mapState} from 'vuex'
export default {
  name : 'Home',
  data() {
    return {
      goodList:[],
      totalPages:'',
      currentPage : 1,
      isfinaly: false,
      isUp:false,
      activeToup : {},
      isLoading: false,
    
    }
  },
  created() {
    // 打开页面发送数据 
    this.$http.getPage(this.currentPage).then(data => {
      // console.log(data.data.data)
      this.isfinaly = false
      this.goodList = [...this.goodList,...data.data.data.data]
      this.totalPages = data.data.data.totalPages
      this.isfinaly = true
    });


  },
  methods: {
    // 下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
    // 下拉触底事件
    mainScroll() {
      let {scrollHeight,scrollTop,offsetHeight} = this.$refs.rmain
      this.isUp = scrollTop > 1500
      if(scrollHeight - scrollTop < offsetHeight + 2) {
        if(this.currentPage >= 12) {
          this.$toast('没有更多数据了');
          this.isfinaly = false
          return
        }
        this.currentPage ++
        if(this.isfinaly) {
          this.$http.getPage(this.currentPage).then(data => {
            this.isfinaly = false
            this.goodList = [...this.goodList,...data.data.data.data]
            this.isfinaly = true
          }) 
        }
        
      }
    },
    // 跳转详情页
    toDetail(gid){
      this.$router.push({
          path:'/details',
          query:{gid}}
      )
    },
    // 点击跳转至顶部
    toUp(){
      let rscroll = this.$refs.rmain.scrollTop
      // let rtop = rscroll/24
      this.$refs.rmain.scrollTop = 0
    },
    // 点击搜索页面
    toSearch() {
      this.$router.push('/search')
    },
    // 点击去地址页面
    toLocation() {
      this.$router.push('/location')
    }

  },
  computed:{
    ...mapState(['city']),
  }
}
</script>

<style lang='less' scoped>
  .home {
    width: 100vw;
    overflow: hidden;

    // 商品详情样式
    .main{
      width: 100%;
      height: calc(100vh - 96px);
      margin-top: 46px;
      overflow: scroll;
      scroll-behavior: smooth;
      .content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        // transition: all .8s;
        .good-list {
          width: 48vw;
          padding: 6px;
          box-sizing: border-box;
          border: 1px solid rgba(111, 111, 111, .3);
          box-shadow: 0px 1px 2px rgba(111, 111, 111, .4);
          border-radius: 8px;
          margin-top: 6px;
          img {
            width: 100%;
          }
          .good-info {
            h3 {
              font-size: 16px;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span{
              font-size: 14px;
              color: red;
            }
          }
        }
      }
    }
    // 回顶部样式
    .toup {
      position: fixed;
      bottom: 60px;
      right: 10px;
      z-index: 99;
    }
  }
  
</style>