<style lang="less">
.demo-spin-container{
    display: inline-block;
    width: 100%;
    height: 40vh;
    top:300px;
    position: relative;
    overflow: hidden;
}
.mbrage{
    margin-bottom: 20px;
    .ivu-icon.ivu-icon-ios-close-empty {
        position: absolute;
        right: 20px;
        top: 10px;
    }
}
</style>

<template>
    <div>
        <div class="i-form" style="padding-top:10px;">
            <Form  :label-width="120">
                    <h2 class="padding-left-small main-color padding-bottom-small text">基础信息</h2>
                    <FormItem label="服务分类：" class="formMust" >
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
                        <span v-if='formData.initF&&formData.rel.itemCode == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="配件品牌名称：" class="formMust">
                       <Select filterable v-model='formData.rel.goodsBrandId'  style='width:200px;'>
                         <Option v-for='(todo,i) in formData.brandList.list' :key='"1xd"+i' :value='todo[formData.brandList.listId]'>{{todo[formData.brandList.listName]}}</Option>
                       </Select>
                        <span v-if='formData.initF&&formData.rel.goodsBrandId == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="商品名：" class="formMust">
                        <Input v-model="formData.rel.goodsName" placeholder="请输入商品名称" style="width:320px;"></Input>
                        <span v-if='formData.initF && formData.rel.goodsName == ""' class="error-mark">
                            <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="商品图片：" class="formMust">
                        <upload
                            :count="formData.imgUpConfig.count"
                            :defaultList="formData.imgUpConfig.defaultList"
                            :fileDir='formData.imgUpConfig.fileDir'
                            @upList="getUpList"
                            v-if = 'picUpStatus'
                        ></upload>
                        <span v-if='formData.initF && formData.rel.goodsPictureIdArr.length==0' class="error-mark">
                            <Icon type="close-circled"></Icon> 必填
                        </span>
                        <label style="font-size:12px">*首张图片为主图，最多可上传6正图片图片尺寸800x800，大小不超过1M</label>
                    </FormItem>

                    <FormItem label="参考价：" class="formMust">
                        <InputNumber :min='0'  v-model="formData.rel.refPrice" placeholder="请输入参考价" style="width:220px;"></InputNumber>
                        <span v-if='formData.initF && formData.rel.refPrice == ""' class="error-mark">
                            <Icon type="close-circled"></Icon> 必填
                        </span>
                    </FormItem>
                    <FormItem label="上架：" class="formMust">
                        <RadioGroup v-model='formData.rel.putaway'>
                            <Radio label='N'>否</Radio>
                            <Radio label='Y'>是</Radio>
                        </RadioGroup>
                    </FormItem>
                    <Modal
                        v-model='brandChooseConfig.modal'
                        width="45vw"
                        :loading='brandChooseConfig.loading'
                        :mask-closable='false'
                        title='选择车品牌'
                    >
                        <brand-choose v-if='brandChooseConfig.modal' ref='choose' />
                        <div slot="footer">
                            <Button @click="brandChooseConfig.modal=false">返回</Button>
                            <Button type="primary" @click='xSave'>保存</Button>
                        </div>
                    </Modal>
                    <h2 class="padding-left-small main-color padding-bottom-small text">车型匹配</h2>
                    <FormItem label="品牌选择：" class="formMust">
                        <Button type='primary' @click='brandChooseConfig.modal=true'>点击选择品牌</Button>
                    </FormItem>
                    <FormItem label="车型选择：" class="formMust">
                        <TypeBlog :brandList='brandList'  v-if='xStatus'></TypeBlog>
                    </FormItem>
                </Form>
        </div>
    </div>
</template>

<script>
import {upload} from '@/core'
import brandChoose from './sub/brandChoose.vue'
import TypeBlog from './sub/TypeBlog.vue'
export default {
    name: 'partsAdd',
    components: {
        upload,brandChoose,TypeBlog
    },
    watch:{
        'formData.rel.itemCat' :function(itemCat){
            this.get(Api.server.get,{itemCat:itemCat},(res)=>{
                this.formData.rel.itemCode = "";
                this.formData.itemCodeList.list = res.object[itemCat];
                this.itemStatus = false;
                $Vue.nextTick(()=>{
                    this.itemStatus = true;
                    if(this.init){
                        this.formData.rel.itemCode = this.utils.getData("currentGood").itemCode;
                        this.init = false;
                    };
                });
            });
        },
        'goodType' : function(goodType){
            this.refshTree = false;
            $Vue.nextTick(()=>{
                this.refshTree = true;
            })
        }
    },
    data () {
        return {
            boxInit:false,
            currentView:{},
            brandList:[],
            statusInit:false,
            init:true,
            xx:true,
            xStatus:false,
            picUpStatus:false,
            brandChooseConfig:{
               modal:false,
               name:"brandChooseConfig",
               loading:false
            },
            BBConfig:{
                modal:false,
                name:"brandChooseConfig",
                loading:false
            },
            step:"1",
            goodType:"carType",
            itemStatus:true,
            refshTree:true,
            formData:{
                imgUpConfig:{
                    count:6,
                    defaultList:[],
                    fileDir:'goods'
                },
                itemCodeList:{
                    listId:"itemCode",
                    listName:"itemName",
                    list:[]
                },
                brandList:{
                    listId:"goodsBrandId",
                    listName:"goodsBrandName",
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
                    goodsId:"",
                    goodsBrandId:"",
                    itemCat:"",
                    itemCode:"",
                    goodsName:"",
                    refPrice:0,
                    applyAllCar:'N',
                    putaway:'N',
                    goodsPictureIdArr:[],
                    goodsCardBrandIdArr:[],
                    goodsCarIdArr:[]
                }
            }
        }
    },
    mounted () {
        this.getBrand();
        this.utils.clearTypes();
        let currentGood = this.utils.getData("currentGood");
        let data = this.formData.rel;
        data.goodsId = currentGood.goodsId;
        data.goodsBrandId = currentGood.goodsBrandId;
        data.itemCat = currentGood.itemCat;
        data.goodsName = currentGood.goodsName;
        data.refPrice = Number(currentGood.refPrice) || 0;
        data.applyAllCar = currentGood.applyAllCar || "N";
        data.putaway = currentGood.putaway;
        data.goodsCardBrandIdArr = currentGood.goodsCardBrandIdList;
        if(data.goodsCardBrandIdArr.length == 0){
            data.goodsCarIdArr = [];
        };
        data.goodsCarIdArr = currentGood.goodsCarIdList;
        //初始化 复杂数据（图片，品牌，和车型）

        data.goodsPictureIdArr = this.utils.getSingleItem(currentGood.goodsPictureIdList,"url");
        this.formData.imgUpConfig.defaultList = data.goodsPictureIdArr;
        this.picUpStatus = true;


        let aimIds = [];
        let aimTypeId = [];
        for(let i in data.goodsCardBrandIdArr){
            let tmp = data.goodsCardBrandIdArr[i].brandId;
            aimIds.push(tmp);
        };
        for(let i in data.goodsCarIdArr){
            let tmp = data.goodsCarIdArr[i].cardTypeId;
            aimTypeId.push(tmp);
        };
        this.utils.setData("aimIds",aimIds);
        this.utils.setData("aimTypeId",aimTypeId);


        //已经选中品牌的 list
        let brandList = [];
        let brandMap = this.utils.getData("brandMap");
        let brandListC = currentGood.goodsCardBrandIdList;
        brandListC.map((item,index)=>{
            brandList.push({
                brandName:brandMap[item.brandId].brandName,
                brandId:item.brandId
            })
        });
        this.brandList = brandList;



        this.formData.imgUpConfig.defaultList = currentGood.goodsPictureIdList;
        $Vue.nextTick(()=>{
            this.xStatus = true;
        });
    },
    methods: {
        xSave(){
            //执行了选择页面的保存
            this.$refs.choose.save();
            this.brandChooseConfig.modal = false;
            //已经选中品牌的 list
            let brandList = [];
            let brandMap = this.utils.getData("brandMap");
            let brandListC = this.utils.getData("aimIds");
            brandListC.map((brandId,index)=>{
                brandList.push({
                    brandName:brandMap[brandId].brandName,
                    brandId:brandId
                })
            });
            this.brandList = brandList;
            this.xStatus = false;
            $Vue.nextTick(()=>{
                this.xStatus = true;
            })
        },
        getUpList(url){
            this.formData.rel.goodsPictureIdArr = this.utils.getSingleItem(url,'url');
        },
        getBrand(){
            this.post(Api.goods.brand.get,(res)=>{
                this.formData.brandList.list = res.object || [];
            })
        },
        //保存
        save(){
            let _this = this;
            let data = JSON.parse(JSON.stringify(this.formData.rel));
            data.goodsPictureIdArr = JSON.stringify(data.goodsPictureIdArr);
            this.utils.resolveForm(_this,()=>{
                let aimIds = this.utils.getData("aimIds");
                let aimTypeId = this.utils.getData("aimTypeId");
                let brands = [];
                let types = [];
                aimIds.map(o=>{
                    brands.push({
                        brandId:o
                    })
                });
                aimTypeId.map(o=>{
                    types.push({
                        cardTypeId:o
                    })
                });
                if(data.goodsPictureIdArr.length == 0){
                    this.$Message.warning("请至少上传一张商品主图！");
                    return false;
                };
                if(aimTypeId.length == 0){
                    this.$Message.warning("请至少匹配一种车型！");
                    return false;
                };
                data.goodsCarIdArr = JSON.stringify(types);
                data.goodsCardBrandIdArr = JSON.stringify(brands);
                this.post(Api.goods.update,data,(res)=>{
                    this.$Message.success("修改商品成功！");
                    this.utils.refshPage()
                });
            });
        },
    }
};
</script>
