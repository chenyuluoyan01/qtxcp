<style lang="less">

</style>

<template>
    <div class="view-main">
        <!--列表页面-->
        <div class="list-page">
            <z-search :searchData='searchData' @getParam='getParam' @add='add'></z-search>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="width-60">序号</th>
                        <th>角色</th>
                        <th>设备类型</th>
                        <th>版本号</th>
                        <th>大小（MB）</th>
                        <th>更新类型</th>
                        <th>发布日期</th>
                        <th class="width-200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(item,index) in list" :key='index+"xc"'>
                        <td>{{index+1}}</td>
                        <td>{{item.role}}</td>
                        <td>{{item.deviceType}}</td>
                        <td>{{item.version}}</td>
                        <td>{{item.size}}</td>
                        <td>{{item.upgradeType == 1?"非强制更新":"强制更新"}}</td>
                        <td>{{item.releaseTime | formatDate}}</td>
                        <td>
                            <span class="btn" @click='update(item)'>编辑</span>
                            <cut @del='del(item)'></cut>
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
            title='创建版本'
            @on-ok = 'addSave'
        >
            <insert v-if='addConfig.modal' :name="addConfig.name" ref='add' />
            <div slot="footer">
                <Button @click="addConfig.modal=false">返回</Button>
                <Button type="primary" :loading="addConfig.loading" @click="addSave">保存</Button>
            </div>
        </Modal>

        <!--编辑-->
        <Modal
            v-model='updateConfig.modal'
            width="45vh"
            :loading='updateConfig.loading'
            :mask-closable='false'
            title='编辑版本'
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
import update from './sub/update.vue'

export default {
    name: 'demo',
    components: {
        zPage,zSearch,views,insert,cut,update
    },
    data () {
        return {
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
            detail:-999,
            dataSource:{
                url:Api.version.get,
                param:{}
            },
            searchData:{
                add:true,
                source:{
                    roleList:{
                        listName:"name",
                        listId:"id",
                        list:[
                            {
                                name:"车主",
                                id:"车主"
                            },
                            {
                                name:"汽修厂",
                                id:"汽修厂"
                            }
                        ]
                    },
                    deviceTypeList:{
                        listName:"name",
                        listId:"id",
                        list:[
                            {
                                name:"andriod",
                                id:"andriod"
                            },
                            {
                                name:"ios",
                                id:"ios"
                            }
                        ]
                    },
                    upgradeTypeList:{
                        listName:"name",
                        listId:"id",
                        list:[
                            {
                                name:"强制更新",
                                id:"0"
                            },
                            {
                                name:"非强制更新",
                                id:"1"
                            }
                        ]
                    }
                },
                list:[
                    {
                        type:'select',
                        id:"role",
                        name:"角色",
                        source:"roleList"
                    }/*,
                    {
                        type:'select',
                        name:"设备类型",
                        id:"deviceType",
                        source:"deviceTypeList"
                    },
                    {
                        type:'select',
                        name:"是否强制更新",
                        id:"upgradeType",
                        source:"upgradeTypeList"
                    },*/

                ],
                rel:{}
            },
            list:[]
        };
    },
    mounted () {
    },
    methods: {
        del: function(item){
            let platformVersionId = item.platformVersionId;
            let data = {platformVersionId:platformVersionId,deletedYn:'N'}
            this.post(Api.version.delete,data,(res)=>{
                let _this = this;
                this.$Message.success("删除版本成功！");
                this.utils.refshData(_this)
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
            this.list = list.object;
        },
        //当筛选参数改变的时候，重新触发分页组建
        getParam: function(param){
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
        }
    }
};
</script>
