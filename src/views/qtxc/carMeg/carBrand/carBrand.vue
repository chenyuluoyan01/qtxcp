<style lang="less">

</style>

<template>
    <div class="view-main">
        <Modal v-model='pictureLook'>
            <img :src="currentUrl" style="width: 80%;margin-left:10%;margin-top:30%;">
        </Modal>
        <!--列表页面-->
        <div class="list-page">
            <z-search :searchData='searchData' @getParam='getParam' @add='add'></z-search>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="width-60">序号</th>
                        <th>唯一编码</th>
                        <th>品牌名称</th>
                        <th>英文名</th>
                        <th>产地</th>
                        <th>系列</th>
                        <th class="width-200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(item,index) in list" :key='index+"xc"'>
                        <td>{{index+1}}</td>
                        <td>{{item.coding}}</td>
                        <td>{{item.brandName}}</td>
                        <td>{{item.brandEnglishName}}</td>
                        <td>{{item.origin}}</td>
                        <td style="width:300px;">
                            <span
                                class="btn"
                                v-if="i<3"
                                v-for='(todo,i) in getCarList(item.brandSeria)'
                                :key = 'i+"carsId"'
                                @click='getBysc(todo,item,i)'
                            >
                                {{todo}}
                            </span>
                            <Button
                                size="small"
                                v-if="getCarList(item.brandSeria).length>2"
                                @click='getMore(getCarList(item.brandSeria),item)'
                            >查看更多</Button>
                        </td>
                        <td>
                            <span class="btn" @click='update(item)'>编辑</span>
                            <!-- <span class="btn" @click='bysc(item)'>保养手册</span> -->
                            <cut @del='del(item)'></cut>
                        </td>
                    </tr>
                    <tr v-if='list.length == 0'><td colspan="7">暂无数据</td></tr>
                </tbody>
            </table>
            <!-- <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page> -->
        </div>

        <!--添加-->
        <Modal
            v-model='addConfig.modal'
            width="45vw"
            :mask-closable='false'
            title='创建汽车品牌'
            @on-ok = 'addSave'
        >
            <insert v-if='addConfig.modal' :name="addConfig.name" ref='add' />
            <div slot="footer">
                <Button @click="addConfig.modal=false">返回</Button>
                <Button type="primary" :loading="addConfig.loading" @click="addSave">保存</Button>
            </div>
        </Modal>

        <!--保养手册-->
        <Modal
            v-model='byscConfig.modal'
            width="80vw"
            :mask-closable='false'
            :closable = 'false'
        >
           <div slot="header">
                <div class="ivu-modal-header-inner" style='height:40px;line-height:40px;position:relative'>
                    <span style="font-size: 14px;color: #464c5b; font-weight:700">{{currentCarBrand}}</span>
                    <Button type='primary' size='small' icon='ios-cloud-upload-outline' style='position:absolute;right:140px;top:10px;'>导入表格</Button>
                    <Button type='primary' size='small' icon='ios-cloud-download-outline' style='position:absolute;right:30px;top:10px;'>导出表格</Button>
                </div>
            </div>
            <bysc v-if='byscConfig.modal' :id='currentCarsId' :name="byscConfig.name" ref='bysc' />
            <div slot="footer">
                <Button @click="byscConfig.modal=false">返回</Button>
            </div>
        </Modal>

        <!--查看更多-->
        <Modal
            v-model='moreConfig.modal'
            width="45vh"
            :mask-closable='false'
            title='全部车系'
        >
            <Tag
                v-for = '(item,index) in carsList'
                :key = 'index+"cvs"'
                type="dot"
                color="yellow"
                @click.native ='moreConfig.modal=false,getBysc(item,currentItem,index)'
                fade
                style='margin:10px;position:relative;width:60%;margin-left:60px;'
            >{{item}}</Tag>
            <div slot="footer">
                <Button @click="moreConfig.modal=false">返回</Button>
            </div>
        </Modal>

        <!--编辑-->
        <Modal
            v-model='updateConfig.modal'
            width="45vh"
            :loading='updateConfig.loading'
            :mask-closable='false'
            title='编辑汽车品牌'
        >
            <update :detail="detail"  v-if='updateConfig.modal' :name="updateConfig.name" ref='update' />
            <div slot="footer">
                <Button @click="updateConfig.modal=false">返回</Button>
                <Button type="primary" :loading="updateConfig.loading" @click="updateSave">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {zTable,zPage,zSearch,cut} from '@/core'
import views from './sub/view.vue'
import insert from './sub/add.vue'
import bysc from './sub/bysc.vue'
import update from './sub/update.vue'

export default {
    name: 'demo',
    components: {
        zPage,zSearch,views,insert,cut,update,bysc
    },
    data () {
        return {
            brandMap:{},
            carsList:[],
            currentItem:[],
            currentcarsId:-999,
            currentCarBrand:"",
            pictureLook:false,
            currentUrl:"",
            byscConfig:{
                modal:false,
                name:"byscConfig",
                loading:false
            },
            moreConfig:{
                modal:false,
                name:"moreConfig",
            },
            addConfig:{
               modal:false,
               name:"addConfig",
               loading:false
            },
            updateConfig:{
               modal:false,
               name:"updateConfig",
               loading:false
            },
            viewConfig:{
               modal:false,
               name:"viewConfig"
            },
            refsh:true,
            detail:{},
            dataSource:{
                url:Api.car.brand.get,
                param:{}
            },
            searchData:{
                add:true,
                source:{},
                list:[
                    {
                        type:"input",
                        name:"品牌名称",
                        id:"brandName"
                    },
                    {
                        type:"input",
                        name:"产地",
                        id:"origin"
                    }
                ],
                rel:{
                    brandName:"",
                    origin:""
                }
            },
            list:[]
        };
    },
    mounted () {
        this.getData()
    },
    methods: {
        getMore: function(carsList,item){
            this.currentItem = item;
            this.carsList = carsList;
            this.moreConfig.modal = true;
        },
        getBysc: function(carsName,item,i){
            //let carsId = this.brandMap[brandId].carsList.filter(item => item.carsName === carsName)[0].carsId;
            this.currentCarsId = item.carsId.split(",")[i];
            this.currentCarBrand = `${carsName} - 保养手册`;
            this.byscConfig.modal = true;
        },
        getCarList: function(name){
            let nameList = [];
            if(name != null){
                if(name.indexOf(",") != -1){
                    let list = name.split(",");
                    nameList = [...new Set(list)];
                }else{
                    nameList[0] = name;
                };
            };
            return nameList
        },
        lookPic: function(url){
            this.currentUrl = url;
            this.pictureLook = true;
        },
        del: function(item){
            this.post(Api.car.brand.delete,{brandId:item.brandId},(res)=>{
                let _this = this;
                this.utils.upBrandMap(this);
                this.$Message.success("删除成功！");
                this.getData();
            })
        },
        addSave: function(){
            this.$refs.add.save();
        },
        updateSave: function(){
            this.$refs.update.save();
        },
        /*//分页组件吐出数据
        getPageData: function(list){
            this.list = list.object;
        },*/
        getData: function(data){
            data = data || {};
            this.post(Api.car.brand.get,data,(res)=>{
                this.list = res.object || [];
            });
            this.brandMap = this.utils.getData("brandMap");
        },
        //当筛选参数改变的时候，重新触发分页组建
        getParam: function(param){
            let _this = this;
            this.getData(param);
        },
        add: function(){
            this.addConfig.modal = true;
        },
        bysc: function(item){
            this.currentBrandId = item.brandId;
            this.currentCarBrand = `${item.brandName}(${item.brandEnglishName}) - 保养手册`;
            this.byscConfig.modal = true;
        },
        update: function(params){
            this.detail = params;
            $Vue.nextTick(()=>{
                this.updateConfig.modal = true;
            });
        }
    }
};
</script>
