<template>
  <div class="detail">
     <!-- 头部导航 -->
    <van-nav-bar title="产品详情" :fixed='true' @click-left='$router.back()'>
      <template #left >
          <van-icon name="arrow-left" color='#0ef8e1' size="20" />
          <span style="color:#0ef8e1">返回</span>
      </template>
    </van-nav-bar>

    <!-- 商品详情区 -->
    <main class="main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="content">
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in goodsInfo.imgList" :key="item.id"><img v-lazy="item.path" /></van-swipe-item>
        </van-swipe>

      <p class="gname">{{ goodsInfo.name }}</p>
      <p class="gprice">{{goodsInfo.price | priceFilter}}</p>

      <van-grid :border="true" :column-num="2">
        <van-grid-item>
          <p> <span>免运费</span></p>
        </van-grid-item>
        <van-grid-item>
          <p> <span>剩余：</span>&nbsp;<span>{{goodsInfo.onsale}}</span></p>
        </van-grid-item>
      </van-grid>
      <van-grid :border="true" :column-num="2">
        <van-grid-item>
          <p> <span>销量：</span>&nbsp;<span>{{goodsInfo.sales}}</span></p>
        </van-grid-item>
        <van-grid-item>
          <p> <span>收藏：</span>&nbsp;<span>{{goodsInfo.likes}}</span></p>
        </van-grid-item>
      </van-grid>

      <!-- 导航切换 -->
      <div class="check">
        <div class="btns" @click="changeInfo(1)" :class="isshow == 1?'active':''">图片</div>
        <div class="btns" @click="changeInfo(2)"  :class="isshow == 2?'active':''">参数</div>
      </div>

      <div class="info">
        <div class="imgs" v-show="isshow == 1">
          <img v-for="item in goodsInfo.detailImgList" :key="item.id" v-lazy="item.path" />
        </div>
        <div class="params" v-show="isshow == 2">
          <van-row v-for="item in goodsInfo.properties" :key="item.id">
            <van-col span="12" class="pr">{{item.name}}</van-col>
            <van-col span="12" class="pr">{{item.detail}}</van-col>
          </van-row>
        </div>
      </div>
  

      <!-- 底部购买 -->
      <van-goods-action>
        <van-goods-action-icon icon="star" text="收藏" :color="isLikes ? 'red':''" @click="addLikes()"/>
        <van-goods-action-icon icon="cart" text="购物车" @click="toBuyCar"/> 
        <van-goods-action-button type="warning" text="加入购物车" @click="addCar()"/>
        <van-goods-action-button type="danger" text="立即购买" @click="buyNow"/>
      </van-goods-action>

      </div>
      </van-pull-refresh>
    </main>
    
  </div>
</template>

<script>
import {mapState,mapMutations,mapGetters} from 'vuex';
export default {
    name : 'Details',
    data() {
      return {
        goodsInfo : {},
        isshow:1,
        isLoading: false,
      }
    },
    created() {
      this.getDetails(this.$route.query.gid)
    },
    methods: {
      ...mapMutations(['changeLikes']),
      // 下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
      // 加入收藏
      addLikes() {
        if(this.isLogin) {
          this.$router.push('/login')
          return
        }
        if(this.isLikes) {
          // 已经收藏
          this.$http.deleteLikes(this.goodsInfo.id)
          // 删除vuex里面的收藏
          this.changeLikes(this.goodsInfo.id)
        }else {
          this.$http.addLikes(this.goodsInfo.id)
          // 添加vuex里面的收藏
          this.changeLikes({
            product_id: this.goodsInfo.id,
            name: this.goodsInfo.name,
            price: this.goodsInfo.price,
            cover: this.goodsInfo.cover
          })
        }
      },
      // 去购物车
      toBuyCar() {
        if(this.isLogin) {
          this.$router.push('/login')
          return
        }
        this.$router.push('/buycar')
      },
      // 加入购物车
      addCar() {
        if(this.isLogin) {
          this.$router.push('/login')
          return
        }
        this.$http.updateCarList(this.goodsInfo.id).then(data => {
          this.$toast('添加成功')
        })
      },
      // 立即购买
      buyNow() {
        if(this.isLogin) {
          this.$router.push('/login')
          return
        }
        let {id:product_id,cover,name,price} = this.goodsInfo
        sessionStorage.setItem('cars',JSON.stringify([{product_id,cover,name,price,count:1}]))
        this.$router.push({
          path:'/orderok'
        })
      },
      // 点击切换
      changeInfo(iid){
        this.isshow = iid
      },
      // 请求商品详情
      getDetails(gid) {
        this.$http.getGoodsDetails(gid).then(data => {
          this.goodsInfo = data.data.data
        })
      }
    },
    computed:{
      ...mapState(['userInfo']),
      ...mapGetters(['isLogin']),
      // 判断是否收藏
      isLikes() {
        if(this.isLogin) return false
        if(!this.isLogin) {
          if(!this.userInfo.likeList.length) return false
        }
        return this.userInfo.likeList.some(item => item.product_id == this.goodsInfo.id)
      }
    }
}
</script>

<style <style lang="less" scoped>
    .main{
      width: 100%;
      height: calc(100vh - 96px);
      margin-top: 46px;
      overflow: scroll;
      scroll-behavior: smooth;
      .content {
        width: 100%;
          .my-swipe .van-swipe-item {
            color: #fff;
            font-size: 20px;
            // line-height: 300px;
            height: 300px;
            text-align: center;
            background-color: #39a9ed;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .gname { padding: 12px 8px 4px; line-height: 24px; font-size: 16px; font-weight: 400; }
          .gprice { color: red; padding: 0px 8px 14px; font-size: 14px;}
          .check{
            width: 100%;
            display: flex;
            height: 50px;
            margin-top: 6px;
            .btns{
              flex: 1;
              text-align: center;
              line-height: 50px;
              font-size: 16px;
            }
            .active {
              border-bottom: 2px solid red;
            }
          }
          .info{
            .imgs {
              width: 100%;
              img {
                width: 100%;
              }
            }
            .pr{
              font-size: 16px;
              height: 50px;
              line-height: 50px;
              border-bottom: 1px solid #eee;
              padding-left: 10px;
            }
          }
          

      }
    }
</style>>
