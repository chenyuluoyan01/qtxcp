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
                        <th>职务</th>
                        <th class="width-200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "(item,index) in list" :key='index+"xc"'>
                        <td>{{index+1}}</td>
                        <td>{{item.roleName}}</td>
                        <td>
                            <span class="btn" @click='view(item)'>查看</span>
                            <span class="btn" @click='update(item)'>编辑</span>
                            <cut @del='del(item)'></cut>
                            <!-- <cut @del='del'></cut> -->
                        </td>
                    </tr>
                    <tr v-if='list.length == 0'><td colspan="3">暂无数据</td></tr>
                </tbody>
            </table>
            <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page>
        </div>

        <!--添加-->
        <Modal
            v-model='addConfig.modal'
            width="45vh"
            :mask-closable='false'
            title='创建职务'
            @on-ok = 'addSave'
        >
            <insert v-if='addConfig.modal' :name="addConfig.name" ref='add' />
            <div slot="footer">
                <Button @click="addConfig.modal=false">返回</Button>
                <Button type="primary" :loading="addConfig.loading" @click="addSave">保存</Button>
            </div>
        </Modal>

        <!--查看-->
        <Modal
            v-model='viewConfig.modal'
            width="45vh"
            :mask-closable='false'
            ok-text='确定'
            title='职务详情'
        >
            <views :id="currentId"  v-if='viewConfig.modal' :name="viewConfig.name" ref='view' />
            <div slot="footer">
                <Button @click="viewConfig.modal=false">返回</Button>
            </div>
        </Modal>

        <!--编辑职位-->
        <Modal
            v-model='updateConfig.modal'
            width="45vh"
            :loading='updateConfig.loading'
            :mask-closable='false'
            title='编辑职位'
        >
            <update :id="currentId"  v-if='updateConfig.modal' :name="updateConfig.name" ref='update' />
            <div slot="footer">
                <Button @click="updateConfig.modal=false">返回</Button>
                <Button type="primary" :loading="updateConfig.loading" @click="updateSave">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {zTable,zPage,zSearch,zModel,cut} from '@/core'
import views from './sub/view.vue'
import insert from './sub/add.vue'
import update from './sub/update.vue'

export default {
    name: 'demo',
    components: {
        zPage,zSearch,cut,views,insert,cut,zModel,update
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
            currentId:-999,
            dataSource:{
                url:Api.role.get,
                param:{}
            },
            searchData:{
                add:true,
                source:{},
                list:[
                    {
                        type:"input",
                        name:"职务",
                        id:"roleName"
                    }
                ],
                rel:{
                    roleName:""
                }
            },
            list:[]
        };
    },
    mounted () {
    },
    methods: {
        del: function(item){
            let roleId = item.roleId;
            let data = {roleId:roleId,deletedYn:'Y'}
            this.get(Api.role.freeze,data,(res)=>{
                let _this = this;
                this.$Message.success("删除职务成功！");
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
        //表格操作函数
        view: function(params){
            localStorage.setItem("currentRoleName", params.roleName)
            this.currentId = params.roleId;
            $Vue.nextTick(()=>{
                this.viewConfig.modal = true;
            });
        },
        add: function(){
            this.addConfig.modal = true;
        },
        update: function(params){
            localStorage.setItem("currentRoleName", params.roleName)
            this.currentId = params.roleId;
            $Vue.nextTick(()=>{
                this.updateConfig.modal = true;
            });
        }
    }
};
</script>
