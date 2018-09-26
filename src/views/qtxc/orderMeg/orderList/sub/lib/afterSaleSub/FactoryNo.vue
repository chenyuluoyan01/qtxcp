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
        <Card title = '商家售后处理-拒绝'  class='margin-bottom-middle'>
            <Form>
                <FormItem>
                     <span class="main-color">商家已拒绝</span>
                </FormItem>
                <FormItem label="原因描述：" class='form-items'>
                    <span class="text text-small">{{afterSaleDetail.factoryDetailsAfterSales}}</span>
                </FormItem>
                <FormItem label="图片：" class='form-items'>
                    <img ref='imgs'  @click='lookPic(index)' style="height:180px;margin-right:20px;cursor:pointer" v-lazy='item.url'  v-for = '(item,index) in afterSaleDetail.factoryPicAfterSalesList || []'>
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
