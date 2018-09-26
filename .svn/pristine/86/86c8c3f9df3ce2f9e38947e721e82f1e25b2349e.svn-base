<style lang="less">

</style>

<template>
    <div class="view-main">
        <!--列表页面-->
        <div class="list-page">
            <z-search :searchData='searchData' @getParam='getParam' ></z-search>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="width-60">序号</th>
                        <th>订单号</th>
                        <th>下单时间</th>
                        <th>注册用户</th>
                        <th>汽修厂名</th>
                        <th>车辆</th>
                        <th>订单类型</th>
                        <th>金额(元)</th>
                        <th>订单状态</th>
                        <th class="width-200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(item,index) in list" :key='index+"xc"'>
                        <td>{{index+1}}</td>
                        <td>{{item.orderNum}}</td>
                        <td>{{item.orderTime | formatDate}}</td>
                        <td>{{item.nickName}}</td>
                        <td>{{item.factoryName}}</td>
                        <td>
                            {{item.brandName}}{{item.carsName}}{{item.carTypeName}}
                        </td>
                        <td>{{item.orderTypeDes}}</td>
                        <td>{{Number(item.amount)}}</td>
                        <td>{{item.orderStatusDes}}</td>
                        <td>
                            <span class="btn" @click='view(item)'>查看</span>
                            <!-- <cut @del='del(item)'></cut> -->
                        </td>
                    </tr>
                    <tr v-if='list.length == 0'><td colspan="10">暂无数据</td></tr>
                </tbody>
            </table>
            <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page>
        </div>

        <!--查看-->
        <Modal
            v-model='viewConfig.modal'
            width="60vw"
            :loading='viewConfig.loading'
            :mask-closable='false'
            title='查看订单'
        >
            <views :detail="detail"  v-if='viewConfig.modal' :name="viewConfig.name" ref='view' />
            <div slot="footer">
                <Button @click="viewConfig.modal=false">返回</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {zTable,zPage,zSearch,cut} from '@/core'
import views from './sub/view.vue'

export default {
    name: 'demo',
    components: {
        zPage,zSearch,views,cut
    },
    filters:{
        getOrderType: function(orderType){
            let orderTypeDes = "保养订单";
            if(orderType == "1"){
                orderTypeDes = "维修订单";
            }else if(orderType == "2"){
                orderTypeDes = "钣金喷漆";
            }else if(orderType == "3"){
                orderTypeDes = "换胎";
            }else if(orderType == "4"){
                orderTypeDes = "搭电";
            }else if(orderType == "5"){
                orderTypeDes = "拖车";
            }else if(orderType == "6"){
                orderTypeDes = "门店订单";
            };
            return orderTypeDes
        }
    },
    data () {
        return {
            viewConfig:{
               modal:false,
               name:"viewConfig"
            },
            refsh:true,
            detail:-999,
            dataSource:{
                url:Api.order.get,
                param:{}
            },
            searchData:{
                source:{
                    orderTypeList:{
                        listName:"keyLabel",
                        listId:"keyValue",
                        list:[
                            {
                                keyValue:'',
                                keyLabel:"全部"
                            },
                            {
                                keyValue:'0',
                                keyLabel:"保养订单"
                            },
                            {
                                keyValue:'1',
                                keyLabel:"维修订单"
                            },
                            {
                                keyValue:'2',
                                keyLabel:"钣金喷漆"
                            },
                            {
                                keyValue:'3',
                                keyLabel:"救援订单(换胎)"
                            },
                            {
                                keyValue:'4',
                                keyLabel:"救援订单(搭电)"
                            },
                            {
                                keyValue:'5',
                                keyLabel:"救援订单(拖车)"
                            },
                            {
                                keyValue:'6',
                                keyLabel:"门店订单"
                            }
                        ]
                    },
                    orderStatusList:{
                        listName:"keyLabel",
                        listId:"keyValue",
                        list:[
                            {
                                keyValue:'',
                                keyLabel:"全部"
                            },
                            {
                                keyValue:'0',
                                keyLabel:"待支付"
                            },
                            {
                                keyValue:'1',
                                keyLabel:"待安装"
                            },
                            {
                                keyValue:'2',
                                keyLabel:"待评价"
                            },
                            {
                                keyValue:'3',
                                keyLabel:"售后"
                            },
                            {
                                keyValue:'4',
                                keyLabel:"已取消"
                            },
                            {
                                keyValue:'5',
                                keyLabel:"已完成"
                            }
                        ]
                    }
                },
                list:[
                    {
                        type:'select',
                        id:"orderType",
                        name:"订单类型",
                        source:"orderTypeList"
                    },
                    {
                        type:'select',
                        id:"orderStatus",
                        name:"订单状态",
                        source:"orderStatusList"
                    }

                ],
                rel:{
                    orderType:'',
                    orderStatus:''
                }
            },
            list:[]
        };
    },
    mounted () {
    },
    methods: {
        del: function(item){
            let orderNum = item.orderNum;
            let data = {orderNum:orderNum,deletedYn:'Y'}
            this.post(Api.order.delete,data,(res)=>{
                let _this = this;
                this.$Message.success("删除订单成功！");
                this.utils.refshData(_this)
            })
        },
        view: function(params){
            this.detail = params;
            $Vue.nextTick(()=>{
                this.viewConfig.modal = true;
            });
        },
        //分页组件吐出数据
        getPageData: function(list){
            for(let i in list.object || []){
                list.object[i].orderTypeDes = this.utils.resolveDec(this.searchData.source.orderTypeList,list.object[i].orderType);
                list.object[i].orderStatusDes = this.utils.resolveDec(this.searchData.source.orderStatusList,list.object[i].orderStatus);
            };
            this.list = list.object || [];
        },
        //当筛选参数改变的时候，重新触发分页组建
        getParam: function(param){
            let _this = this;
            this.dataSource.param = param;
            this.utils.refshData(_this)
        },
    }
};
</script>
