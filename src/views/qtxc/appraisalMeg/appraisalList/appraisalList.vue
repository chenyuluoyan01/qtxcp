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
                        <th class="width-60"><Checkbox v-model="flag"></Checkbox>序号</th>
                        <th>时间</th>
                        <th>车主账号</th>
                        <th>店铺名</th>
                        <th>评论内容</th>
                        <th>图片</th>
                        <th>状态</th>
                        <th class="width-200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(item,index) in list" :key='index+"xc"'>
                        <td>
                            <Checkbox v-model="item.checked" v-if="item.appraiseStatus!=1">{{index+1}}</Checkbox>
                            <span v-else>{{index+1}}</span>
                            </td>
                        <td>{{item.appraiseTime | formatDate}}</td>
                        <td>{{item.appraiseUserId}}</td>
                        <td>{{item.nickName}}</td>
                        <!--  -->
                        <td>{{item.appraiseComments}}</td>
                        <td>
                            <img v-if='item.picList'
                            @click='lookPic(item.picList[0].picUrl)'
                            :src='item.picList[0].picUrl'
                            style="width:140px;height:60px;cursor:pointer">
                            <span v-else>无图片</span>
                        </td>
                        <td>{{item.appraiseStatus==0?"待审核":(item.appraiseStatus==1?"通过":"不通过")}}</td>
                        <td>
                            <span class="btn" @click='view(item)'>查看</span>
                            <!-- <Poptip width="200" v-model='item.visibel'>
                                <span class="btn">排序</span>
                                <div slot='content'>
                                    <span>banner顺序:</span>
                                    <InputNumber :max="10000" :min="1" :step="1" v-model="item.bannerOrder"></InputNumber>
                                    <div class="ivu-poptip-footer" style="text-align:right;padding-top:20px;">
                                        <Button size='small' @click='item.visibel=false'>取消</Button>
                                        <Button size='small' type='primary' @click='sortOk(index,item.bannerOrder)'>确定</Button>
                                    </div>
                                </div>
                            </Poptip> -->
                            <hidden  v-if='item.hidden == "N"' @hidden='hidden(item)'></hidden>
                            <cut @del='del(item)'></cut>
                        </td>
                    </tr>
                    <tr v-if='list.length != 0'>
                        <td colspan="8" style="text-align:left">
                            <div class="btn-container">
                                <!-- <Button type="success" @click="selecAll">全选</Button> -->
                                <Button type="success" @click="adminAll('1')">通过</Button>
                                <Button type="error" @click="adminAll('2')">拒绝</Button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if='list.length == 0'><td colspan="8">暂无数据</td></tr>
                </tbody>
            </table>

            <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page>
        </div>

        <!--添加-->
        <Modal
            v-model='addConfig.modal'
            width="45vh"
            :mask-closable='false'
            title='创建banner'
            @on-ok = 'addSave'
        >
            <insert v-if='addConfig.modal' :name="addConfig.name" ref='add' />
            <div slot="footer">
                <Button @click="addConfig.modal=false">返回</Button>
                <Button type="primary" :loading="addConfig.loading" @click="addSave">保存</Button>
            </div>
        </Modal>
        <!-- 查看 -->
        <Modal
            v-model='viewConfig.modal'
            width="45vh"
            :loading='viewConfig.loading'
            :mask-closable='false'
            title='查看评论列表'
        >
            <views :detail="detail" v-if='viewConfig.modal' :name="viewConfig.name" ref='view' />
            <div slot="footer">
                <Button type="success" @click="admin('1')" v-if="okShow">通过</Button>
                <Button type="error" @click="admin('2')" v-if="passShow">拒绝</Button>
                <Button @click="viewConfig.modal=false">返回</Button>
            </div>
        </Modal>
        <!--编辑-->
        <Modal
            v-model='updateConfig.modal'
            width="45vh"
            :loading='updateConfig.loading'
            :mask-closable='false'
            title='编辑banner'
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
import {zTable,zPage,zSearch,zModel,freeze,cut,hidden} from '@/core'
import views from './sub/view.vue'
import insert from './sub/add.vue'
import update from './sub/update.vue'

export default {
    name: 'demo',
    components: {
        zPage,zSearch,freeze,views,insert,cut,zModel,update,hidden
    },
    data () {
        return {
            pictureLook:false,
            currentUrl:"",
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
                url:Api.appraise.get,
                param:{}
            },
            searchData:{
                source:{
                    TypeList:{
                        listName:"keyLabel",
                        listId:"keyValue",
                        list:[
                            {
                                keyValue:'',
                                keyLabel:"全部"
                            },
                            {
                                keyValue:'0',
                                keyLabel:"待审核"
                            },
                            {
                                keyValue:'1',
                                keyLabel:"通过"
                            },
                            {
                                keyValue:'2',
                                keyLabel:"未通过"
                            }
                        ]
                    },
                    // timeType:{
                    //     listName:"keyLabel",
                    //     listId:"keyValue",
                    //     list:[
                    //         {
                    //             keyValue:'0',
                    //             keyLabel:"按时间"
                    //         },
                    //         {
                    //             keyValue:'1',
                    //             keyLabel:"按金额"
                    //         },
                    //         {
                    //             keyValue:'2',
                    //             keyLabel:"按类型"
                    //         }
                    //     ]
                    // }
                },
                list:[
                    {
                        type:"select",
                        name:"类型",
                        id:"appraiseStatus",
                        source:"TypeList",
                        show:true
                    },
                    {
                        type:"input",
                        name:"描述关键字",
                        id:"orderNum",
                        show:true
                    },
                    // {
                    //     type:'select',
                    //     id:"timeType",
                    //     name:"按时间",
                    //     source:"timeType",
                    //     float:"right",
                    //     show:true
                    // },
                ],
                rel:{
                    appraiseStatus:"",
                    orderNum:"",
                    // timeType:""
                }
            },
            list:[],
            appraiseId:'',
            flag:false,
            checkedItem:'',
            isOk:'',
            checkList:[],
            okShow:true,
            passShow:true,
        };
    },
    mounted () {},
    methods: {
        lookPic: function(url){
            this.currentUrl = url;
            this.pictureLook = true;
        },
        //排序
        sortOk: function(index,order){
            let bannerOrder = order;
            let _this = this;
            let bannerId = this.list[index].bannerId;
            let data = {
                bannerOrder:bannerOrder,
                bannerId:bannerId
            };
            this.post(Api.banner.sorts,data,(res)=>{
                this.$Message.success("设置顺序成功！");
                this.utils.refshData(_this)
            })
        },
        //隐藏
        hidden: function(item){
            let bannerId = item.bannerId;
            let data = {bannerId:bannerId,hidden:'Y'}
            this.post(Api.banner.hidden,data,(res)=>{
                let _this = this;
                this.$Message.success("隐藏banner成功！");
                this.utils.refshData(_this)
            })
        },
        del: function(item){
            this.post(Api.appraise.delete,{appraiseId:item.appraiseId},(res)=>{
                let _this = this;
                this.$Message.success("删除成功！")
                this.utils.refshData(_this);
            })
        },
        addSave: function(){
            this.$refs.add.save();
        },
        updateSave: function(){
            this.$refs.update.save();
        },
        //分页组件吐出数据
        getPageData: function(list){
            //用于修改顺序时候的显示
            list.object.map((item)=>{
                item.checked = false;
            })
            this.list = list.object || [];
        },
        //当筛选参数改变的时候，重新触发分页组建
        getParam: function(param){
            console.log(param)
            let _this = this;
            this.dataSource.param = param;
            this.utils.refshData(_this)
            
        },
        add: function(){
            this.addConfig.modal = true;
        },
        update: function(params){
            this.detail = params;
            $Vue.nextTick(()=>{
                this.updateConfig.modal = true;
            });
        },
        view: function(params){
            let d = this.detail;
            this.isOk=params.appraiseStatus;
            if(this.isOk==1) {
                this.okShow=false;
                this.passShow=false;
            } else if (this.isOk==2) {
                this.okShow=true;
                this.passShow=false;
            } else {
                this.okShow=true;
                this.passShow=true;                
            }
            this.appraiseId = params.appraiseId;
            this.detail = params;
            $Vue.nextTick(()=>{
                this.viewConfig.modal = true;
            });


        },
        //点击通过、未通过、待审核
        admin: function(param){
            let _this = this;
            let _appraiseStatus = param;
            let _appraiseId = this.appraiseId;
            let data = {appraiseStatus:_appraiseStatus,checkedAppraiseIdList:_appraiseId};
            this.post(Api.appraise.admin,data,(res)=>{
                this.utils.refshData(_this);
                this.$Message.success("操作成功");
                this.viewConfig.modal = false;
            })
        },
        //批量点击全选
        //批量操作通过、未通过、待审核
        adminAll: function(param){
            let _this = this;
            let _appraiseStatus = param;
            //遍历当前页选中项
            this.checkedItem='';
            this.flag=false;
            if(param==2){
                this.list.map((item)=>{
                    if(item.checked&&item.appraiseStatus!=2){
                        this.checkedItem+=item.appraiseId+',';
                    }
                }) 
            } else {
                this.list.map((item)=>{
                    if(item.checked){
                        this.checkedItem+=item.appraiseId+',';
                    }
                })
            }
            let _appraiseId =this.checkedItem.substring(0,this.checkedItem.lastIndexOf(','));
            let data = {appraiseStatus:_appraiseStatus,checkedAppraiseIdList:_appraiseId};
            if(this.checkedItem!==''){
                this.post(Api.appraise.admin,data,(res)=>{
                    this.utils.refshData(_this);
                })
            }
        },

    },
    watch:{
        'flag':function(flag) {
            this.list.map(item=>{
                if (item.appraiseStatus==1){
                    return;
                }
                item.checked = flag;
            })
        }
    }
};
</script>
