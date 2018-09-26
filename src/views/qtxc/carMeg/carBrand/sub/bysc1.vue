<style lang="less">

</style>

<template>
    <div>
        <Tabs @on-click="getData">
            <TabPane label="保养项目" name="BYXM">
                <table class="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td>时间</td>
                            <td v-for='(t,is) in timeDistanceListByBYXM' :key = 'is+"timePeriod"'>{{t.timePeriod}}</td>
                        </tr>
                        <tr>
                            <td>项目/距离</td>
                            <td v-for='(d,is) in timeDistanceListByBYXM' :key = 'is+"timePeriod"'>{{d.distance}}</td>
                        </tr>
                        <tr v-for='(item,i) in serverListByBYXM' :key = 'i+"df"'>
                            <td style="width:100px;">{{item.itemName}}</td>
                            <template v-for='(cx,it) in sortListByBYXM'>
                                <td v-if='item.itemName == cx.itemName'>{{cx.status}}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </TabPane>
            <TabPane label="清洗养护" name="QXYH">
                <table class="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td>时间</td>
                            <td v-for='(t,is) in timeDistanceListByQXYH' :key = 'is+"timePeriod"'>{{t.timePeriod}}</td>
                        </tr>
                        <tr>
                            <td>项目/距离</td>
                            <td v-for='(d,is) in timeDistanceListByQXYH' :key = 'is+"timePeriod"'>{{d.distance}}</td>
                        </tr>
                        <tr v-for='(item,i) in serverListByQXYH' :key = 'i+"df"'>
                            <td style="width:100px;">{{item.itemName}}</td>
                            <template v-for='(cx,it) in sortListByQXYH'>
                                <td v-if='item.itemName == cx.itemName'>{{cx.status}}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </TabPane>
            <TabPane label="维修项目" name="WXXM">
                <table class="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td>时间</td>
                            <td v-for='(t,is) in timeDistanceListByWXXM' :key = 'is+"timePeriod"'>{{t.timePeriod}}</td>
                        </tr>
                        <tr>
                            <td>项目/距离</td>
                            <td v-for='(d,is) in timeDistanceListByWXXM' :key = 'is+"timePeriod"'>{{d.distance}}</td>
                        </tr>
                        <tr v-for='(item,i) in serverListByWXXM' :key = 'i+"df"'>
                            <td style="width:100px;">{{item.itemName}}</td>
                            <template v-for='(cx,it) in sortListByWXXM'>
                                <td v-if='item.itemName == cx.itemName'>{{cx.status}}</td>
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
    data () {
        return {
            serverListByBYXM:[],
            serverListByQXYH:[],
            serverListByWXXM:[],
            timeDistanceListByBYXM:[],
            timeDistanceListByQXYH:[],
            timeDistanceListByWXXM:[],
            sortListByBYXM:[],
            sortListByQXYH:[],
            sortListByWXXM:[],
            list:[]
        }
    },
    mounted () {
        this.handleInit();
        //this.sortByKey(this.list,'timePeriod')
    },
    methods: {
        //根据时间排序
        sortByKey(list,key){
            let obj = {};
            let ll = [];
            for(let i in list){
                obj[list[i][key]] = {}
            };
            for(let o in obj){
                for(let i in list){
                    if(list[i][key] == o){
                        obj[o] = JSON.parse(JSON.stringify(list[i]));
                    }
                }
            };
            for(let o in obj){
                ll.push(obj[o])
            }
            return ll
        },
        handleInit(){
            this.getData("BYXM");
        },
        handleList(list){
            //获取所有的itemName，把数据根据itemName分组
            let nameSingle = this.utils.getSingleItem(list,'itemName');
            let lists = {};
            for(let i in nameSingle){
                lists[nameSingle[i].itemName] = [];
            };
            for(let o in lists){
                for(let i in list){
                    if(o == list[i].itemName){
                        lists[o].push(JSON.parse(JSON.stringify(list[i])));
                    }
                }
            };
            //子项根据时间排序
            let kk = {};
            for(let o in lists){
                let tmp = this.sortByKey(lists[o],'timePeriod');
                kk[o] = tmp;
            };

            //获取最长数组作为模板
            let lenArr = [];
            for(let o in kk){
                lenArr.push(kk[o].length)
            };
            let max = Math.max(...lenArr);
            let maxArr = [];
            for(let o in  kk){
                if(kk[o].length == max){
                    maxArr = JSON.parse(JSON.stringify(kk[o]))
                }
            };

            let  fuck = [];
            for(let o in kk){
                let tmp = kk[o];

                //对那些不是最长模板的数据做修正
                if(tmp.length != max){
                    let arrL = JSON.parse(JSON.stringify(maxArr));
                    let itemName = tmp[0].itemName;//获取服务项目
                    //初步修正模板数据
                    for(let i in arrL){
                        arrL[i].itemName = itemName;
                        arrL[i].status = "";
                    };
                    //那些已经存在的对象要把status修正过来
                    for(let i in arrL){
                        for(let j in tmp){
                            if(arrL[i].timePeriod == tmp[j].timePeriod){
                                arrL[i].status = tmp[j].status;
                            }
                        }
                    };
                    fuck[itemName] = arrL;
                };
            };

            //循环原数据，把需要修改的数据替换
            for(let o in kk){
                for(let j in fuck){
                    if(o == j){
                        kk[o] = JSON.parse(JSON.stringify(fuck[j]))
                    }
                }
            };
            //数据扁平化
            let rr = [];
            for(let o in kk){
                let tmp = kk[o];
                for(let i in tmp){
                    rr.push(tmp[i])
                }
            };

            return rr
        },
        getServer(name){
            this.get(Api.server.get,{itemCat:name},(res)=>{
                this["serverListBy"+name] = res.object[name];
            })
        },
        getData(name){
            this.get(Api.car.manual.get,{carsIdId:this.id,itemCat:name},(res)=>{
                if(res.object.length == 0){
                    this.getServer(name)
                }else {
                    let sourceList = res.object;
                    //获取服务项目
                    this["serverListBy"+name] = this.utils.getSingleItem(sourceList,'itemName');
                    //获取距离时间列表
                    let timeSingle = this.utils.getSingleItem(sourceList,'timePeriod');
                    let timeDistance = [];
                    for (let i in timeSingle) {
                        let tmp = timeSingle[i].timePeriod;
                        for(let j in sourceList){
                            if(sourceList[j].timePeriod == tmp){
                                timeDistance.push({
                                    timePeriod:tmp,
                                    distance:sourceList[j].distance
                                })
                                break;
                            }
                        }
                    };
                    this["timeDistanceListBy"+name] = timeDistance;
                    //获取format后的列表
                    this["sortListBy"+name] = this.handleList(sourceList);
                }
            })
        }
    }
};
</script>
