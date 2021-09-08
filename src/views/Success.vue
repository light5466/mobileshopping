<template>
  <div class="success">
      <van-icon name="checked" color='green' size='70px'/>
      <h2>恭喜你，支付成功</h2>
      <p @click="$router.push('/home')">返回首页</p>
      <p @click="$router.push('/myorder')">查看详情</p>
  </div>
</template>

<script>
export default {
    name:'Success',
    data() {
        return {
            
        }
    },
}
</script>

<style lang='less' scoped>
    .success {
        display: flex;
        align-items: center;
        justify-self: center;
        flex-direction: column;
        padding-top: 100px;
        h2{
            font-size: 30px;
            margin-top: 10px;
        }
        p{
            font-size: 18px;
            margin-top: 10px;
            color: #22a;
        }
    }
</style>