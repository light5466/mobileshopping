<template>
  <div class="home">
    <!-- navbar  使用插槽-->
    <van-nav-bar title="精选" :fixed='true'>
      <template #right>
        <van-icon name="search" color='#0ef8e1' size="20" />
      </template>
      <template #left>
        <van-icon name="location" color='#0ef8e1' size="20" />
        <span>深圳</span>
      </template>
    </van-nav-bar>

    <!-- 主要内容区。 -->
    <main class="main" @scroll="mainScroll" ref="rmain">
      <div class="content">

        <div class="good-list" v-for="item in goodList" :key="item.id" @click="toDetail(item.id)">
          <img v-lazy="item.cover" alt="">
          <div class="good-info">
            <h3>{{item.name}}</h3>
            <span>{{item.price | priceFilter }}</span>
          </div>
        </div>
        

      </div>
    </main>

  </div>
  
</template>

<script>
export default {
  name : 'Home',
  data() {
    return {
      goodList:[],
      totalPages:'',
      currentPage : 1,
      isfinaly: false,
      // 懒加载配置
    
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
    }) 
  },
  methods: {
    // 下拉触底事件
    mainScroll() {
      let {scrollHeight,scrollTop,offsetHeight} = this.$refs.rmain
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
      console.log(gid)
      this.$router.push('/detail')
    }

  },
}
</script>

<style lang='less' scoped>
  .home {
    width: 100vw;
    overflow: hidden;

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
        .good-list {
          width: 48vw;
          padding: 6px;
          box-sizing: border-box;
          // outline: 1px solid rgba(111, 111, 111, .3);
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
  }
  
</style>