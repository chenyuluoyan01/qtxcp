<style lang="less">

</style>

<template>
    <div>
        <z-search :searchData='searchData' @getParam='getParam'></z-search>
        <z-table :titles='titles' :list='list'></z-table>
        <z-page v-if='refsh' :dataSource='dataSource' @getData='getPageData'></z-page>
    </div>
</template>

<script>
import {zTable,zPage,zSearch} from '@/core'
export default {
    name: 'demo',
    components: {
        zTable,zPage,zSearch
    },
    data () {
        return {
            refsh:true,
            dataSource:{
                url:Api.login,
                param:{phone:17603006126,password:"12345678"}
            },
            searchData:{
                source:{
                    type:{
                        listName:"name",
                        listId:"id",
                        list:[
                            {
                                name:"余洋",
                                id:"1"
                            },
                            {
                                name:"大头",
                                id:"2"
                            },
                            {
                                name:"小偷",
                                id:"3"
                            }
                        ]
                    }
                },
                list:[
                    {
                        type:"input",
                        name:"姓名",
                        id:"userName"
                    },
                    {
                        type:"select",
                        name:"状态选择",
                        id:"type",
                        source:"type"
                    },
                    {
                        type:"daterange",
                        name:"起止日期",
                        id:"timeList"
                    }
                ],
                rel:{
                    userName:"",
                    type:"",
                    timeList:[]
                }
            },
            titles: [
                {
                    title:"姓名",
                    key:"name"
                },
                {
                    title:"banner图片",
                    key:"url",
                    render: (h,params) => {
                    return h('img',{
                            style:{width:'150px',height:'60px'},
                            attrs:{
                                'src': params.row.url
                            }
                        })
                    }
                },
                {
                    title:"操作",
                    key:"action",
                    width:300,
                    btns:[
                        {
                            text:"查看",
                            on:"view"
                        },
                        {
                            text:"冻结",
                            on:"view"
                        },
                        {
                            text:"删除",
                            on:"view"
                        }
                    ]
                }
            ],
            list:[
                {
                    name: 'John Brown',
                    url:'https://static.segmentfault.com/v-5b4c6359/global/img/qrcode_for_gh.svg'
                },
                {
                    name: 'Jim Green',
                    url:'https://static.segmentfault.com/v-5b4c6359/global/img/qrcode_for_gh.svg'
                },
                {
                    name: 'Joe Black',
                    url:'https://static.segmentfault.com/v-5b4c6359/global/img/qrcode_for_gh.svg'
                },
                {
                    name: 'Jon Snow',
                    url:'https://static.segmentfault.com/v-5b4c6359/global/img/qrcode_for_gh.svg'
                }
            ]
        };
    },
    mounted () {
    },
    methods: {
        //分页组件吐出数据
        getPageData: function(list){
            console.log(list)
        },
        //当筛选参数改变的时候，重新触发分页组建
        getParam: function(param){
            this.dataSource.param = param;
            this.refsh = false;
            $Vue.nextTick(()=>{
                this.refsh = true;
            });
        },
        //表格操作函数
        view: function(params){
            alert(params.name)
        }
    }
};
</script>
