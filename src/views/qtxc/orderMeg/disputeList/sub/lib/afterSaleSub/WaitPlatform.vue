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
        <Card title = '待平台处理：'  class='margin-bottom-middle'>
            <Form>
                <FormItem label="是否退款：" class='form-items'>
                    <RadioGroup v-model='platformDo.state'>
                        <Radio :label='6'>否</Radio>
                        <Radio :label='5'>是</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-if='platformDo.state == 5' label="退款金额：" class='form-items'>
                    <InputNumber v-model='platformDo.platformWithdrawMoney'></InputNumber>
                </FormItem>
                <FormItem label="处理说明：" class='form-items'>
                    <Input type='textarea' v-model = 'platformDo.platformDetails' :autosize="{minRows: 2,maxRows: 5}" style='width:60%;'></Input>
                </FormItem>
                <FormItem class='form-items'>
                    <Button type='primary' @click = 'handelOk'>确认</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>

export default {
    name: 'wait_platform',
    props:["afterSaleDetail"],
    components: {

    },
    data () {
        return {
            platformDo:{
                state:6,
                platformWithdrawMoney:0,
                platformDetails:""
            }
        }
    },
    mounted () {
    },
    methods: {
        handelOk(){
            let data = {};
            let state = this.platformDo.state;
            let orderNum = this.afterSaleDetail.orderNum
            let platformDetails = this.platformDo.platformDetails;
            let platformWithdrawMoney = this.platformDo.platformWithdrawMoney;
            if(platformDetails.length == 0){
                this.$Message.warning("请输入平台说明！");
                return false
            };
            data.state = state;
            data.platformDetails = platformDetails;
            data.orderNum = orderNum;
            if(state == 5){
                if( platformWithdrawMoney!= 0){
                    let amount = this.utils.getData("amount");
                    amount = amount.amount;
                    if(Number(amount) == NaN){
                        amount = 0;
                    };
                    if(amount<Number(platformWithdrawMoney)){
                        this.$Message.warning("退款金额不得大于订单总额！");
                        return false
                    }
                    data.platformWithdrawMoney = platformWithdrawMoney;
                }else{
                    this.$Message.warning("请输入退款金额！");
                    return false
                }
            };
            this.post(Api.order.platformDo,data,res => {
                this.$Message.success("平台仲裁操作成功！");
                this.$emit("platformDo");
                this.utils.refshData(this.$parent.$parent.$parent.$parent.$parent.$parent.$parent)
            })
        }
    }
};
</script>
