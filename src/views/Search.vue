<template>
  <div class="search">
      <!-- navbar 搜索头部  使用插槽-->
    <van-nav-bar :fixed='true' @click-left='$router.back()'>
      <template #right>
        <van-search
            v-model="valueKey"
            show-action
            placeholder="请输入搜索关键词"
            @input="onSearch"
        >
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
        </van-search>
      </template>
      <template #left >
          <van-icon name="arrow-left" color='#0ef8e1' size="20" />
          <span style="color:#0ef8e1">返回</span>
      </template>

    </van-nav-bar>

    <!-- 展示内容 -->
    <main class="main">
      <div class="content" v-if="searchList.length">
        <div class="good-list" v-for="item in searchList" :key="item.id" @click="toDetail(item.id)">
          <img v-lazy="item.cover" alt="">
          <div class="good-info">
            <h3>{{item.name}}</h3>
            <span>{{item.price | priceFilter }}</span>
          </div>
        </div>  
      </div>
      <div class="tips" style="text-align:center; line-height:80px;" v-else>没有相关内容。。。</div>
    </main>

  </div>
</template>

<script>
export default {
    name : 'Search',
    data() {
        return {
            valueKey:'',
            searchList : []
        }
    },
    methods: {
        // 搜素
        onSearch() {
            clearTimeout(this.sid)
            this.sid = setTimeout(() => {
                this.$http.getSearch(this.valueKey).then(data => {
                    if(this.valueKey.trim() === '') {
                        this.searchList = []
                    }else {
                        this.searchList = data.data.data.data
                    } 
                })
            },500)
        },
        // 跳转详情页
        toDetail(gid){
            this.$router.push({
                path:'/details',
                query:{gid}}
            )
        }
        
    },
}
</script>

<style lang='less' scoped>

    .main{
      width: 100%;
      height: calc(100vh - 46px);
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
</style>