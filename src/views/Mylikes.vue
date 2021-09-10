<template>
  <div class="likes">
                  <!-- 头部 -->
        <van-nav-bar title="我的收藏" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <main class="main">
    
                <div class="content" v-if="likeList">
                    <van-row v-for="item in likeList" :key="item.id">
                        <van-col span="6">
                            <img v-lazy="item.cover" style="width:80px; height:80px; padding:8px" alt="">
                        </van-col>
                        <van-col span="18">
                            <van-cell :title="item.name.substring(0, 6)" is-link :label="item.name" @click="toDetail(item.id)"/>
                        </van-col>
                    </van-row>
                </div>
                <div class="error" v-else>
                    收藏列表为空哦<br>
                    <h3 @click="toG">去挑选一些商品收藏吧</h3>
                </div>
        </main>
        </van-pull-refresh>

  </div>
</template>

<script>
export default {
    name : 'Mylikes',
    data() {
        return {
            likeList:[],
            isLoading: false,
        }
    },
    created() {
        this.getLikes()
    },
    methods: {
        // 下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
        // 去首页
        toG() {
            this.$router.push('/home')
        },
        // 获取收藏
        getLikes() {
            this.$http.getLikes().then (data => {
                this.likeList = data.data.data
                // 渲染
            })
        },
        // 跳转至详情页
        toDetail(gid){
            this.$router.push({
                path:'/details',
                query:{gid:gid}
            })
        }
    },
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 46px);
        overflow: scroll;
        .error{
            text-align: center;
            padding-top: 100px;
            h3 {
                color: #0ef8e1;
                font-size: 20px;
            }
        }
    }
</style>