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
        <Card title = '平台处理结果-拒绝'  class='margin-bottom-middle'>
            <Form>
                <FormItem>
                     <span class="main-color">拒绝车主退款申请</span>
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
