<style lang="less">

</style>

<template>
    <div>
        <Tabs @on-click="getData">
            <TabPane label="保养项目" name="BYXM">
                <table class="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td>项目/距离</td>
                            <td v-for='(d,is) in distanceList.BYXM' :key = 'is+"timePeriod"'>{{d}}</td>
                        </tr>
                        <tr v-for='(itemName,i) in serverList.BYXM' :key = 'i+"df"'>
                            <td style="width:200px;">{{itemName}}</td>
                            <template v-for='(cx,it) in map.BYXM[itemName]'>
                                <td>{{cx.status | handelStatus}}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </TabPane>
            <TabPane label="清洗养护" name="QXYH">
                <table class="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td>项目/距离</td>
                            <td v-for='(d,is) in distanceList.QXYH' :key = 'is+"timePeriod"'>{{d}}</td>
                        </tr>
                        <tr v-for='(itemName,i) in serverList.QXYH' :key = 'i+"df"'>
                            <td style="width:200px;">{{itemName}}</td>
                            <template v-for='(cx,it) in map.QXYH[itemName]'>
                                <td>{{cx.status | handelStatus}}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </TabPane>
            <TabPane label="维修项目" name="WXXM">
                <table class="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td>项目/距离</td>
                            <td v-for='(d,is) in distanceList.WXXM' :key = 'is+"timePeriod"'>{{d}}</td>
                        </tr>
                        <tr v-for='(itemName,i) in serverList.WXXM' :key = 'i+"df"'>
                            <td style="width:200px;">{{itemName}}</td>
                            <template v-for='(cx,it) in map.WXXM[itemName]'>
                                <td>{{cx.status | handelStatus}}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
export default {
    name: 'bysc',
    props:["name","id"],
    components: {
    },
    filters :{
        handelStatus: function(status){
            let statusDes = "";
            if(status == "0"){
                statusDes = "换"
            }else if(status == "1"){
                statusDes = "优"
            }else if(status == "2"){
                statusDes = "良"
            }else if(status == "3"){
                statusDes = "需要"
            };
            return statusDes
        }
    },
    data () {
        return {
            distanceList:{
                BYXM:[],
                WXXM:[],
                QXYH:[]
            },
            serverList:{
                BYXM:[],
                WXXM:[],
                QXYH:[]
            },
            map:{
                BYXM:{},
                WXXM:{},
                QXYH:{}
            }
        }
    },
    mounted () {
        this.getData("BYXM")
    },
    methods: {
        getData(name){
            this.get(Api.car.manual.get,{carsId:this.id,itemCat:name},(res)=>{
                let list = res.object || [];
                //分组
                let tmp = this.utils.groupBykey(list,"itemName");
                //获得服务项目
                this.serverList[name] = Object.keys(tmp);
                //获取所有距离并排序
                let distanceList = this.utils.sortNum(this.utils.getSingleStr(list,"distance"));
                this.distanceList[name] = distanceList;
                //复制map,处理成完整数据
                let map = {};
                for(let o in tmp){
                    map[o] = []
                };
                for(let o in map){
                    distanceList.map(distance=>{
                        map[o].push({
                            distance:distance,
                            status:""
                        })
                    })
                };
                //最后处理，获得需要的map数据
                for(let o in tmp){
                    distanceList.map(distance=>{
                        tmp[o].map(item=>{
                            if(item.distance === distance){
                                map[o].map(e=>{
                                    if(e.distance === distance){
                                        e.status = item.status;
                                    }
                                })
                            }
                        });
                    });
                };
                this.map[name] = map;
            })
        }
    }
};
</script>
