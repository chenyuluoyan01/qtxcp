<style lang="less">
    .form-item{
        margin-left: 80%;
    }
    .form-items{
        margin-bottom: 10px;
    }
</style>

<template>
    <div>
        <Modal v-model='pictureLook'>
            <img :src="currentUrl" style="width: 80%;margin-left:10%;margin-top:30%;">
        </Modal>
        <Card title = '平台处理结果-通过'  class='margin-bottom-middle'>
            <Form>
                <FormItem>
                     <span class="main-color">通过车主退款申请</span>
                </FormItem>
                <FormItem label="平台退款金额：" class='form-items'>
                    <span class="main-color"><b class="text text-big main-color">￥</b>{{afterSaleDetail.platformWithdrawMoney}}</span>
                </FormItem>
                <FormItem label="平台处理说明：" class='form-items'>
                    <span class="text text-small">{{afterSaleDetail.platformDetails}}</span>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>

export default {
    name: 'order_user',
    props:["afterSaleDetail"],
    components: {

    },
    data () {
        return {
            pictureLook:false,
            currentUrl:false,
            platformDo:{
                state:6,
                platformWithdrawMoney:0
            }
        }
    },
    mounted () {
        this.handleInit();
    },
    methods: {
        handleInit(){

        },
        lookPic: function(index){
            this.currentUrl = this.$refs.imgs[index].src;
            this.pictureLook = true;
        },
    }
};
</script>
