<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="品牌名称：" class="formMust">
                    <Input v-model="formData.rel.goodsBrandName" placeholder="请输入品牌名称" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.goodsBrandName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="英文名：" class="formMust">
                    <Input v-model="formData.rel.goodsBrandEnglish" placeholder="请输入英文名" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.goodsBrandEnglish == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <!-- <FormItem label="服务分类：" class="formMust" >
                   <Select v-model='formData.rel.itemCat'  style='width:200px;'>
                     <Option v-for='(todo,i) in formData.itemCatList.list' :key='"1xd"+i' :value='todo[formData.itemCatList.listId]'>{{todo[formData.itemCatList.listName]}}</Option>
                   </Select>
                    <span v-if='formData.initF&&formData.rel.itemCat==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="项目分类：" class="formMust" v-if='itemStatus'>
                   <Select v-model='formData.rel.itemCode'  style='width:200px;'>
                     <Option v-for='(todo,i) in formData.itemCodeList.list' :key='"1xd"+i' :value='todo[formData.itemCodeList.listId]'>{{todo[formData.itemCodeList.listName]}}</Option>
                   </Select>
                    <span v-if='formData.initF&&formData.rel.itemCode==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem> -->
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'peopleUpdate',
    props:["name","detail"],
    components: {
    },
    watch:{
        'formData.rel.itemCat' :function(itemCat){
            this.get(Api.server.get,{itemCat:itemCat},(res)=>{
                this.formData.itemCodeList.list = res.object[itemCat];
                this.itemStatus = false;
                $Vue.nextTick(()=>{
                    this.itemStatus = true;
                })
            })
        }
    },
    data () {
        return {
            itemStatus:true,
            formData:{
                itemCodeList:{
                    listId:"itemCode",
                    listName:"itemName",
                    list:[]
                },
                itemCatList:{
                    listId:"id",
                    listName:"name",
                    list:[
                        {
                            name:"保养项目",
                            id:"BYXM"
                        },
                        {
                            name:"清洗养护",
                            id:"QXYH"
                        },
                        {
                            name:"维修项目",
                            id:"WXXM"
                        }
                    ]
                },
                initF:false,
                rel:{
                    goodsBrandId:"",
                    coding:"",
                    goodsBrandName:"",
                    goodsBrandEnglish:"",
                    /*itemCat:"",
                    itemCode:""*/
                }
            }
        }
    },
    mounted () {
        this.handleInit();
    },
    methods: {
        handleInit(){
            let d = this.detail;
            this.formData.rel = this.utils.getObjByKeys(this.formData.rel,JSON.parse(JSON.stringify(d)));
        },
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.post(Api.goods.brand.update,this.formData.rel,(res)=>{
                    this.$Message.success("修改配件品牌成功！");
                    this.utils.refshData(_this.$parent.$parent);
                });
            });
        },
    }
};
</script>