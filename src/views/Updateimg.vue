<template>
  <div class="updateimg">
                  <!-- 头部 -->
        <van-nav-bar title="修改头像" @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <van-image
            round
            width="10rem"
            height="10rem"
            :src="avatar"
            class="img"
            />
        </main>

        <div class="files">
            <button class="checkimg" @click="checkimg">选择图片</button>
            <input type="file" hidden ref="filei" @change="fileChange">
        </div>
        <button class="updateimgs" @click="updateimgs">上传图片</button>

  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name : 'Updateimg',
    data() {
        return {
            avatar:''
        }
    },
    created() {
        this.getImg()
    },
    methods: {
        ...mapMutations(['changeAvatarImg']),
        getImg() {
            this.avatar = 'http://192.168.0.8:8360'+this.userInfo.avatar
        },
        // 读取照片
        fileChange() {
            let that = this
            let reader = new FileReader();
            if(!this.$refs.filei.files[0]) {
                return
            }
            // console.log(this.$refs.filei.files[0])
            reader.readAsDataURL(this.$refs.filei.files[0]);
            reader.onload = function() {
                that.avatar = this.result
            }
        },
        // 选择图片
       checkimg() {
           this.$refs.filei.click()
       },
        //上传图片
       updateimgs() {
           if(!this.$refs.filei.files[0]) {
                this.$toast('请选择图片')
                return
            }
           let formDate = new FormData()
           formDate.append('avatar',this.$refs.filei.files[0])

           this.$http.setAvatar(formDate).then (data => {
            //    console.log(data.data)
               if(data.data.errcode != 0) return this.$toast(data.data.errmsg)
               // 请求用户信息 修改vuex中的数据
               this.changeAvatarImg(data.data.data.avatar)
               this.$toast('修改成功')
               this.$router.replace('/mine')
           })
           
       }
    },
    computed:{
        ...mapState(['userInfo']),
    }
}
</script>

<style lang='less' scoped>
    .main{
        // margin-top: 46px;
        height: calc(100vh - 146px);
        overflow: scroll;
        position: relative;
        .img{
            position: absolute;
            top: 28vh;
            left: 50%;
            transform: translateX(-50%);
            
        }  
    }
    .files{
        height: 50px;
        width: 100vw;
        position: relative;
    }
    .filei {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -19;
        width: 100vw;
        height: 50px;
    }
    .checkimg {
        position: absolute;
        top: 0;
        left: 0px;
        height: 50px;
        width: 100vw;
        text-align: center;
        line-height: 50px;
        background-color: #74d8ce;
        color: white;
        border: none;
    }
    .updateimgs{
        height: 50px;
        width: 100vw;
        text-align: center;
        line-height: 50px;
        background-color: #0ef8e1;
        color: white;
        border: none;
    }
</style>