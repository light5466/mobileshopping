<template>
  <div class="Updateaddress">
                  <!-- 头部 -->
        <van-nav-bar :title="$route.query.ids == 0?'添加地址':'修改地址'" :fixed='true' @click-left='$router.back()'>
        <template #left >
            <van-icon name="arrow-left" color='#0ef8e1' size="20" />
            <span style="color:#0ef8e1">返回</span>
        </template>
        </van-nav-bar>

        <main class="main">
            <h3>ADDRESS</h3>

                <van-address-edit
                :area-list="areaList"
                :show-delete="$route.query.ids!=0"
                show-set-default
                :address-info="addressInfo"
                @save="addEditAddress"
                @delete="delAddress"
                />
  
        </main>

  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import { areaList } from '@vant/area-data'
export default {
    name : 'Updateaddress',
    data() {
        return {
            areaList:areaList,
            addressInfo:{}

        }
    },
    created() {
        // this.$route.query.ids
        this.getAddress(this.$route.query.ids)
    },
    methods: {
        ...mapMutations(['changeAddr']),
        getAddress(ids) {
            if(ids == 0) {
                return 
            }else {
                this.userInfo.addressList.filter((item) => {
                    if(item.id == ids) {
                        this.addressInfo.id = item.id
                        this.addressInfo.name = item.name
                        this.addressInfo.tel = item.mobile
                        this.addressInfo.province = item.province
                        this.addressInfo.city = item.city
                        this.addressInfo.county = item.country
                        this.addressInfo.addressDetail = item.detail
                    }
                })
            }
        },
        addEditAddress(content){
            // console.log('不存在',content)
            // 判断是否存在，如果存在则修改，不存在则添加
            if(this.$route.query.ids == 0) {
                
                let {name,province,city,county:country,addressDetail:detail,tel:mobile,areaCode:code} = content
                this.$http.addAddress({name,province,city,country,detail,mobile,code,default:0}).then(data => {
                    // console.log(data.data.data)
                    let {id,name,province,city,country,detail,mobile,code} = data.data.data
                    this.changeAddr({id,name,province,city,country,detail,mobile,code,type:'add'})
                    if (data.data.errcode == 0) this.$toast("添加成功")
                    this.$router.back()
                })
            }else {
                // console.log('czai ')
                let {id,name,province,city,county:country,addressDetail:detail,tel:mobile,areaCode:code} = content
                this.$http.updateAddress({id,name,province,city,country,detail,mobile,code,default:0}).then(data => {
                    this.changeAddr({id,name,province,city,country,detail,mobile,code,type:'edit'})
                    if (data.data.errcode == 0) this.$toast("修改成功")
                    this.$router.back()
                })
            }
        },
        delAddress() {
            // console.log('del')
            this.$http.deleteAddress(this.$route.query.ids).then(data => {
                this.changeAddr({id:this.$route.query.ids,type:'del'})
                this.$toast('删除成功')
                this.$router.back()
            })
        }

    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style lang='less' scoped>
    .main{
        margin-top: 46px;
        height: calc(100vh - 46px);
        overflow: scroll;
        .van-switch--on{
            background-color: #0ef8e1;
        }
        h3{
            text-align: center;
            line-height: 100px;
            font-size: 22px;
            color: rgba(111, 111, 111, .5);
            font-weight: 600;
            text-shadow: 2px 3px 2px rgba(73, 250, 235, 0.5);
        }
    }
    
</style>