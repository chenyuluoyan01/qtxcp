<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <h2 class="padding-left-small main-color padding-bottom-small text">基础信息</h2>
                <FormItem label="唯一编码：" class="formMust">
                    <Input v-model="formData.rel.coding" placeholder="请输入唯一编码" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.coding == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="品牌名称：" class="formMust">
                    <Input v-model="formData.rel.brandName" placeholder="请输入品牌名称" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.brandName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="英文名：" class="formMust">
                    <Input v-model="formData.rel.brandEnglishName" placeholder="请输入英文品牌名称" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.brandEnglishName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="产地：" class="formMust">
                    <Input v-model="formData.rel.origin" placeholder="请输入产地" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.origin == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="图片：" class="formMust">
                    <upload
                        v-if='formData.imgUpConfig.status'
                        :count="formData.imgUpConfig.count"
                        :defaultList="formData.imgUpConfig.defaultList"
                        :fileDir='formData.imgUpConfig.fileDir'
                        @upList="getUpList"
                    ></upload>
                    <span v-if='formData.initF && formData.rel.pictureUrl == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <h2 class="padding-left-small main-color padding-bottom-small text">系列信息</h2>
                <brand-seria v-if='brandSeriaInit' :brandSeriaList='brandSeriaList' ref='brandSeria'></brand-seria>
            </Form>
        </div>
    </div>
</template>

<script>
import {upload} from '@/core'
import brandSeria from './lib/brandSeria'
export default {
    name: 'bannerUpdate',
    props:["name","detail"],
    components: {
        upload,brandSeria
    },
    data () {
        return {
            brandSeriaList:[],
            brandSeriaInit:false,
            formData:{
                imgUpConfig:{
                    count:1,
                    status:false,
                    defaultList:[],
                    fileDir:'brand'
                },
                roleList:{
                    listId:"roleId",
                    listName:"roleName",
                    list:[]
                },
                initF:false,
                rel:{
                    coding:"",
                    brandName:"",
                    brandEnglishName:"",
                    origin:"",
                    pictureUrl:"",
                    brandSeria:"",
                    carsId:""
                }
            }
        }
    },
    mounted () {
        //设置初始时间
        //this.formData.rel.distributedTime = this.utils.formatDate(new Date())
        this.handleInit()
    },
    methods: {
        handleInit(){
            let d = this.detail;
            this.formData.rel = JSON.parse(JSON.stringify(d));
            delete this.formData.rel.carsName
            //delete this.formData.rel.carsId
            delete this.formData.rel.capital
            //特殊字段设置
            if(d.pictureUrl){
               this.formData.imgUpConfig.defaultList = [{url:d.pictureUrl}];
            };
            this.formData.imgUpConfig.status = true;
            let seriaStr = this.formData.rel.brandSeria;
            let carsStr =  this.formData.rel.carsId;
            console.log(seriaStr);
            console.log(carsStr);
            let list = [];
            let brandSeriaList = [];
            let carsIdList = [];
            if(seriaStr!=null && carsStr!=null && seriaStr.legnth!=0 && carsStr.length!=0){
                if(seriaStr.indexOf(",") != -1 && carsStr.indexOf(",") != -1){
                    brandSeriaList = seriaStr.split(',');
                    carsIdList = carsStr.split(',');
                }else {
                    brandSeriaList[0] = seriaStr;
                    carsIdList[0] = carsStr;
                }
            };
            brandSeriaList.map((item,i)=>{
                list.push({
                    carsId:carsIdList[i],
                    carsName:item
                })
            });
            this.brandSeriaList = list;
            this.brandSeriaInit = true;
        },
        getUpList(url){
            this.formData.rel.pictureUrl = url;
        },
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.formData.rel.brandSeria = this.$refs.brandSeria.getCarsList();
                this.utils.resolveForm(_this,()=>{
                    this.post(Api.car.brand.update,this.formData.rel,(res)=>{
                        this.utils.upBrandMap(this);
                        this.$Message.success("修改汽车品牌成功！");
                        this.$parent.$parent.getData();
                    });
                });
            });
        },
    }
};
</script>
