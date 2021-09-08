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

        
        <!-- <label for="test3" class="checkimg">
            <button class="checkimg" >选择图片</button><input id="test3" type="file"/>
        </label> -->
        <div class="files">
            <button class="checkimg" @click="checkimg">选择图片</button>
            <input type="file" hidden ref="filei" @change="fileChange">
        </div>
        <!-- <button class="checkimg" @click="checkimg($event)">选择图片</button> -->
        <button class="updateimgs" @click="updateimgs">上传图片</button>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name : 'Updateimg',
    data() {
        return {
            avatar:'https://img01.yzcdn.cn/vant/cat.jpeg'
        }
    },
    methods: {
        ...mapActions(['changeUserInfom']),
        // 读取照片
        fileChange() {
            let that = this
            let reader = new FileReader();
            if(!this.$refs.filei.files[0]) {
                return
            }
            console.log(this.$refs.filei.files[0])
            reader.readAsDataURL(this.$refs.filei.files[0]);
            reader.onload = function() {
                // console.log(this.result)
                that.avatar = this.result
            }
        },
        // 选择图片
       checkimg() {
           console.log('选择')
           this.$refs.filei.click()
       },
        //上传图片
       updateimgs() {
           this.$toast('修改成功')
        //    this.$http.setAvatar(data).then (data => {
        //        console.log(data)
        //    })

            // 请求用户信息 修改vuex中的数据
            // this.$http.getUserInfo().then(data => {
            //     console.log(data.data.data)
            //     this.changeUserInfom(data.data.data)
            // })
       }
    },
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
        // text-align: center;
        // line-height: 50px;
        // background-color: #74d8ce;
        // color: white;
        // border: none;
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