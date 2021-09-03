<template>
  <div class="buycar">
              <!-- 头部 -->
        <van-nav-bar title="购物车" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <!-- 展示内容 -->
        <main class="main">

          <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
        </main>

  </div>
</template>

<script>
export default {
  name : 'Buycar',
  data() {
    return {
      
    }
  },
  methods: {
    onSubmit(){
      console.log('00000000')
    }
  },
}
</script>

<style>

</style>