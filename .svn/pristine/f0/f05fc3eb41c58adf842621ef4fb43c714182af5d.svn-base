<style lang="less">
.ivu-icon.ivu-icon-ios-close-empty{
    position: absolute;
    right: 10px;
    top:10px;
}
</style>

<template>
    <div class="padding-left-middle" style="min-height:200px;position:relative">
        <Tag
            v-for = '(item,index) in brandSeriaList'
            :key = 'index'
            closable
            type="dot"
            color="yellow"
            fade
            @on-close = 'delRel(item.carsId,index)'
            style='display:block;margin:10px;position:relative;width:60%;margin-left:60px;'
        >{{item.carsName}}</Tag>
        <Tag
            v-for = '(item,index) in brandSeriaListNew'
            :key = 'index+"cv"'
            closable
            type="dot"
            color="yellow"
            fade
            @on-close = 'dels(index)'
            style='display:block;margin:10px;position:relative;width:60%;margin-left:60px;'
        >{{item}}</Tag>
        <Poptip width="280" v-model='visibel' style='padding:20px;margin-left:40px;'>
            <Button size='small' type='primary'>添加系列</Button>
            <div slot='content'>
                <span>系列:</span>
                <Input autofocus="autofocus" v-model="tmp" style='width:200px;' placeholder='请输入品牌系列' @keyup.enter.native='addTodo'></Input>
                <div class="ivu-poptip-footer" style="text-align:right;padding-top:20px;">
                    <Button size='small' @click='visibel=false,tmp=""'>取消</Button>
                    <Button size='small' type='primary' @click='addTodo()'>确定</Button>
                </div>
            </div>
        </Poptip>
    </div>
</template>

<script>
export default {
    name: 'todList',
    props: ["brandSeriaList"],
    components: {

    },
    data () {
        return {
            visibel:false,
            tmp:"",
            brandSeriaListNew:[]
        }
    },
    mounted () {
    },
    methods: {
        delRel(id,index){
            this.post(Api.car.cars.delete,{carsId:id},res=>{
                this.$Message.success("删除车系成功！");
                this.brandSeriaList.splice(index,1);
            })
        },
        dels(index){
            this.brandSeriaListNew.splice(index,1)
        },
        addTodo(){
            if(this.tmp != ""){
                if(this.brandSeriaListNew.indexOf(this.tmp) == -1 && this.brandSeriaList.indexOf(this.tmp) == -1 ){
                    this.brandSeriaListNew.push(this.tmp);
                }else{
                    this.$Message.warning("请勿添加重复车系！");
                };
                this.tmp = "";
                this.visibel = false;
            }else{
                this.$Message.warning("车系名称不能为空！");
                this.visibel = false;
            }
        },
        getCarsList(){
            return this.brandSeriaListNew.join(",")
        }
    }
};
</script>
