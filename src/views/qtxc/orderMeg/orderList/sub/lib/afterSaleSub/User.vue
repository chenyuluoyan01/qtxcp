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
        <Card title = '车主提交售后' class='margin-bottom-middle'>
            <Form>
                <FormItem label="售后原因：" class='form-items'>
                    <span class="text text-small">{{afterSaleDetail.reasonAfterSale}}</span>
                </FormItem>
                <FormItem label="退款金额：" class='form-items'>
                    <span class="main-color"><b class="text text-big main-color">￥</b>{{afterSaleDetail.withdrawMoney}}</span>
                </FormItem>
                <FormItem label="详情描述：" class='form-items'>
                    <span class="text text-small">{{afterSaleDetail.detailsAfterSale}}</span>
                </FormItem>
                <FormItem label="图片：" class='form-items'>
                    <img ref='imgs'  @click='lookPic(index)' style="height:180px;margin-right:20px;cursor:pointer" v-lazy='item.url'  v-for = '(item,index) in afterSaleDetail.userPicAfterSalesList || []'>
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
