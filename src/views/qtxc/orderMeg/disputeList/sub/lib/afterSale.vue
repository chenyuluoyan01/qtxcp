<style lang="less">
    .form-item{
        margin-left: 80%;
    }
    .form-items{
        margin-bottom: 10px;
    }
    .no-data-p{
        width: 100%;
        line-height: 100px;
        text-align: center;
    }
    .main-card{
        height: 50vh;
        overflow: auto;
    }
</style>

<template>
    <div v-if='init'>
        <div v-if='afterSaleDetail.state == null'>
            <p class="no-data-p">暂无售后</p>
        </div>
        <div v-if='afterSaleDetail.state == 0'>
            <Card>
                <h2 slot='title' class="text">当前状态：<span class="main-color">用户已提交售后</span></h2>
                <div  class='main-card'>
                    <User :afterSaleDetail = 'afterSaleDetail'/>
                </div>
            </Card>
        </div>
        <div v-if='afterSaleDetail.state == 1'>
            <Card>
                <h2 slot='title' class="text">当前状态：<span class="main-color">商家已同意退款</span></h2>
                <div  class='main-card'>
                    <User :afterSaleDetail = 'afterSaleDetail'/>
                    <FactoryOk :afterSaleDetail = 'afterSaleDetail'/>
                </div>
            </Card>
        </div>
        <div v-if='afterSaleDetail.state == 2'>
            <Card>
                <h2 slot='title' class="text">当前状态：<span class="main-color">商家已拒绝处理</span></h2>
                <div  class='main-card'>
                    <User :afterSaleDetail = 'afterSaleDetail'/>
                    <FactoryNo :afterSaleDetail = 'afterSaleDetail'/>
                </div>
            </Card>
        </div>
        <div v-if='afterSaleDetail.state == 3'>
            <Card>
                <h2 slot='title' class="text">当前状态：<span class="main-color">车主已撤回售后</span></h2>
                <div  class='main-card'>
                    <User :afterSaleDetail = 'afterSaleDetail'/>
                </div>
            </Card>
        </div>
        <div v-if='afterSaleDetail.state == 4'>
            <Card>
                <h2 slot='title' class="text">当前状态：<span class="main-color">等待平台仲裁</span></h2>
                <div  class='main-card'>
                    <User :afterSaleDetail = 'afterSaleDetail'/>
                    <FactoryNo :afterSaleDetail = 'afterSaleDetail'/>
                    <WiatPlatform @platformDo='platformDo'  :afterSaleDetail = 'afterSaleDetail'/>
                </div>
            </Card>
        </div>
        <div v-if='afterSaleDetail.state == 5'>
            <Card>
                <h2 slot='title' class="text">当前状态：<span class="main-color">平台通过退款</span></h2>
                <div  class='main-card'>
                    <User :afterSaleDetail = 'afterSaleDetail'/>
                    <FactoryNo :afterSaleDetail = 'afterSaleDetail'/>
                    <PlatformOk :afterSaleDetail = 'afterSaleDetail'/>
                </div>
            </Card>
        </div>
        <div v-if='afterSaleDetail.state == 6'>
            <Card>
                <h2 slot='title' class="text">当前状态：<span class="main-color">平台拒绝退款</span></h2>
                <div  class='main-card'>
                    <User :afterSaleDetail = 'afterSaleDetail'/>
                    <FactoryNo :afterSaleDetail = 'afterSaleDetail'/>
                    <PlatformNo :afterSaleDetail = 'afterSaleDetail'/>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>

import User from "./afterSaleSub/User.vue"
import FactoryOk from "./afterSaleSub/FactoryOk.vue"
import FactoryNo from "./afterSaleSub/FactoryNo.vue"
import WiatPlatform from "./afterSaleSub/WaitPlatform.vue"
import PlatformOk from "./afterSaleSub/PlatformOk.vue"
import PlatformNo from "./afterSaleSub/PlatformNo.vue"
export default {
    name: 'order_multy',
    props:["detail"],
    components: {
        User,FactoryOk,FactoryNo,WiatPlatform,PlatformOk,PlatformNo
    },
    data () {
        return {
            init:false,
            afterSaleDetail:{},
        }
    },
    mounted () {
        this.handleInit();
    },
    methods: {
        platformDo(){
            this.init = false;
            $Vue.nextTick(()=>{
                this.handleInit();
                this.init = true;
            });
        },
        getAfterSale(){
            this.post(Api.order.getAfterSale,{orderNum:this.detail.orderNum},res =>{
                let list = res.object || [];
                this.afterSaleDetail = list[0] || {};
                $Vue.nextTick(()=>{
                    this.init = true;
                });
            })
        },
        handleInit(){
            this.getAfterSale()
        }
    }
};
</script>
