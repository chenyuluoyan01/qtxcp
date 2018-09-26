<style lang="less">
.add-btn {
  color: #f78833;
  cursor: pointer;
  vertical-align: middle;
  padding-right: 6px;
}
</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <!-- 基础信息 -->
                <h2 class="padding-left-small main-color padding-bottom-small text">基础信息</h2>
                <FormItem label="手机号/登录名" class="formMust">
                    <Input v-model="formData.rel.phone" placeholder="请输入手机号" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.phone == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>

                <!-- 门店信息 -->
                <h2 class="padding-left-small main-color padding-bottom-small text">门店信息</h2>
                <FormItem label="店铺名称" class="formMust">
                    <Input v-model="formData.rel.factoryName" placeholder="请输入店铺名称" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.factoryName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>

                <FormItem label="维修厂图片：">
                    <upload
                        :count="formData.imgUpConfig.count"
                        :defaultList="formData.imgUpConfig.defaultList"
                        :fileDir='formData.imgUpConfig.fileDir'
                        @upList="getUpList"
                    ></upload>
                </FormItem>
                <FormItem label="店铺LOGO：">
                    <upload
                        :count="formData.imgUpConfigL.count"
                        :defaultList="formData.imgUpConfigL.defaultList"
                        :fileDir='formData.imgUpConfigL.fileDir'
                        @upList="getUpListL"
                    ></upload>
                </FormItem>
                <FormItem label="门店区域：" class="formMust">
                    <CityCross ref='cityCross' @cityChange='cityChange'/>
                </FormItem>
                <FormItem label="店铺地址：" class="formMust">
                    <Input v-model="formData.rel.factoryAddress" placeholder="请输入店铺地址" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.factoryAddress == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>

                <!-- 地图标注 -->
                <FormItem label="地图标注：" class="formMust">
                    <Bmap v-if='mapInit' :position="formData.location" :city='initCity' @getPosition = "getPosition"/>
                    <p class="margin-xs">
                        <span class="main-color">当前标注位置：</span>
                        经度：
                        <Input
                            v-model="formData.rel.factoryLatitude"
                            placeholder="经度"
                            style="width:80px;"
                        ></Input>
                        纬度：
                        <Input
                            v-model="formData.rel.factoryLongtitude"
                            placeholder="经度"
                            style="width:80px;"
                        ></Input>
                    </p>
                </FormItem>
                <!-- 地图标注 -->



                <FormItem label="店铺电话：" class="formMust">
                    <Input v-model="formData.rel.factoryPhone" placeholder="请输入店铺电话" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.factoryPhone == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="门店负责人：" class="formMust">
                    <Input v-model="formData.rel.factoryOwnerName" placeholder="请输入门店负责人" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.factoryOwnerName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="手机号码：" class="formMust">
                    <Input v-model="formData.rel.factoryMobie" placeholder="请输入手机号码" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.factoryMobie == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="营业时间："  class="formMust">
                    <TimePicker
                        format="HH:mm"
                        @on-change="getTime"
                        :value='formData.timeList'
                        type="timerange"
                        placement="bottom-end"
                        placeholder="营业时间"
                        style="width: 168px"
                    ></TimePicker>
                </FormItem>
                <FormItem label="门店状态：" class="formMust" >
                    <RadioGroup v-model="formData.rel.serviceStatus">
                        <Radio
                            :label="todo[formData.serviceStatusList.listId]"
                            v-for = '(todo,i) in formData.serviceStatusList.list'
                            :key = '"serverStatus"+i'
                        >{{todo[formData.serviceStatusList.listName]}}</Radio>
                    </RadioGroup>
                    <span v-if='formData.initF&&formData.rel.serviceStatus==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="上门取车服务：" class="formMust" >
                    <RadioGroup v-model="formData.rel.doorToDoor">
                        <Radio label='N'>否</Radio>
                        <Radio label='Y'>是</Radio>
                    </RadioGroup>
                    <span v-if='formData.initF&&formData.rel.doorToDoor==""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="门店等级：" class="formMust" >
                    <Select v-model='formData.rel.factoryLevel'  style='width:200px;'>
                        <Option
                            v-for='(todo,i) in formData.factoryLevelList.list'
                            :key='"factoryLevel"+i' :value='todo[formData.factoryLevelList.listId]'
                        >{{todo[formData.factoryLevelList.listName]}}</Option>
                    </Select>
                    <span v-if='formData.initF&&formData.rel.factoryLevel==""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="品牌倾向：">
                    <div class="select-item" v-for='(item,index) in brandList' :key='index'>
                        <Select v-model='item.rel' style='width:200px;padding-right:10px;;margin-bottom:10px'>
                            <Option v-for='(todo,i) in item.formData.brandList.list' :key='"factoryLevel"+i' :value='todo[item.formData.brandList.listId]'>{{todo[item.formData.brandList.listName]}}</Option>
                        </Select>
                        <Icon type="android-add-circle" class="add-btn" size="26" @click="addSel()" v-if="index<10&&brandList.length<10&&index==brandList.length-1"></Icon>
                        <Icon type="android-remove-circle" class="add-btn" size="26" v-if="index!=0&&brandList.length>1" @click="reduceSel(index)"></Icon>
                    </div>
                </FormItem>


                <!-- 公司信息 -->
                <h2 class="padding-left-small main-color padding-bottom-small text">公司信息</h2>
                <FormItem label="公司名称：" class="formMust">
                    <Input v-model="formData.rel.companyName" placeholder="请输入公司名称" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.companyName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="公司法人：">
                    <Input v-model="formData.rel.companyOwner" placeholder="请输入公司法人" style="width:320px;"></Input>
                </FormItem>
                <FormItem label="营业执照：">
                    <Input v-model="formData.rel.companyLicence" placeholder="请输入营业执照" style="width:320px;"></Input>
                </FormItem>
                <FormItem label="营业执照照片：">
                    <upload
                        v-if='formData.imgUpConfigZ.init'
                        :count="formData.imgUpConfigZ.count"
                        :defaultList="formData.imgUpConfigZ.defaultList"
                        :fileDir='formData.imgUpConfigZ.fileDir'
                        @upList="getUpListZ"
                    ></upload>
                </FormItem>
                <FormItem label="开户人：">
                    <Input v-model="formData.rel.accountOwner" placeholder="请输入开户人" style="width:320px;"></Input>
                </FormItem>
                <FormItem label="开户行：">
                    <Input v-model="formData.rel.accountBank" placeholder="请输入开户行" style="width:320px;"></Input>
                </FormItem>
                <FormItem label="开户账号：">
                    <Input v-model="formData.rel.accountNum" placeholder="请输入开户账号" style="width:320px;"></Input>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import {upload,Bmap,CityCross} from '@/core'
export default {
    name: 'peopleAdd',
    props:["name"],
    components: {
        upload,Bmap,CityCross
    },
    data () {
        return {
            initCity:"深圳",
            mapInit:true,
            single: {
                rel: "",
                formData: {
                    brandList: {
                        listId: "brandId",
                        listName: "brandName",
                        list: []
                    }
                }
            },
            brandList: [],
            formData:{
                factoryLevelList:this.staticBy.user.factoryLevel(),
                serviceStatusList:this.staticBy.user.serviceStatus(),
                location:{
                    lat:null,
                    lng:null
                },
                imgUpConfig:{
                    count:6,
                    defaultList:[],
                    fileDir:'factory'
                },
                imgUpConfigL:{
                    count:1,
                    defaultList:[],
                    fileDir:'factory/logo'
                },
                imgUpConfigZ:{
                    count:1,
                    init:true,
                    defaultList:[],
                    fileDir:'factory/licence'
                },
                initF:false,
                timeList:[],
                rel:{
                    factorysPictureArr:[],
                    phone:"",
                    openStartTime:"",
                    openEndTime:"",
                    serviceStatus:"Y",
                    doorToDoor:'N',
                    factoryLevel:"1",
                    factoryName:"",
                    factoryLogo:"",
                    //地理位置
                    factoryProvince:"",
                    factoryCity:"",
                    factoryDistrict:"",
                    factoryAddress:"",
                    factoryLatitude:null,
                    factoryLongtitude:null,
                    factoryPhone:"",
                    factoryOwnerName:"",
                    factoryMobie:"",
                    companyName:"",
                    companyOwner:"",
                    companyLicence:"",
                    companyLicencePhoto:"",
                    accountOwner:"",
                    accountBank:"",
                    accountNum:""
                }
            }
        }
    },
    mounted () {
        this.get(Api.car.brand.get, res => {
          this.single.formData.brandList.list = res.object || [];
          this.brandList.push(this.utils.assign(this.single));
        });
    },
    methods: {
        addSel: function() {
          this.brandList.push(this.utils.assign(this.single));
        },
        reduceSel: function(index) {
          this.brandList.splice(index, 1);
        },
        getUpListL(url){
            this.formData.rel.factoryLogo = url;
        },
        getUpList(urlList){
            this.formData.rel.factorysPictureArr = this.utils.getSingleItem(urlList,'url')
        },
        getUpListZ(url){
            this.formData.rel.companyLicencePhoto = url;
        },
        getTime(time){
            this.formData.rel.openStartTime = time[0];
            this.formData.rel.openEndTime = time[1]
        },
        getPosition(position){
            //经度
            this.formData.rel.factoryLatitude = position.lat;
            //纬度
            this.formData.rel.factoryLongtitude = position.lng;
            this.$Message.success(`地理位置更新成功！经度:${position.lat} 纬度:${position.lng}`)
        },
        cityChange(city){
            this.initCity = city;
            this.mapInit = false;
            $Vue.nextTick(()=>{
                this.mapInit = true;
            })
        },
        save(){
            let _this = this;
            //校验手机号
            if(!this.utils.testPhone(this.formData.rel.phone)){
                this.$Message.warning("手机号格式错误！")
                return false;
            };
            //复制数据
            let data = this.utils.assign(this.formData.rel);
            //处理维修厂多张图片
            if(data.factorysPictureArr.length>0){
                data.factorysPictureArr = JSON.stringify(data.factorysPictureArr);
            };
            //获取城市联级信息
            let position = this.$refs.cityCross.getCityCross();
            if(position.province.length==0 || position.district.length == 0 || position.city.length == 0){
                this.$Message.warning("请选择门店区域！");
                return false
            }else{
                data.factoryProvince = position.province;
                data.factoryCity = position.city;
                data.factoryDistrict = position.district;
            };
            if(data.openStartTime=="" || data.openEndTime==""){
                this.$Message.warning("请选择门店营业时间！");
                return false
            };
            if(data.factoryLatitude == null){
                this.$Message.warning("请标注门店经纬度！");
                return false
            }
            //处理品牌倾向
            if(this.brandList.length>0){
                let brandList = this.utils.getSingleItem(this.brandList, "rel");
                let brandIds = [];
                    brandList = brandList.filter(item => {
                    return item.rel != "";
                });
                for (let i in brandList) {
                    if (brandIds.indexOf(brandList[i].rel) == -1) {
                       brandIds.push(brandList[i].rel);
                    }
                }
                /*if (brandIds.length == 0) {
                    this.$Message.warning("请选择品牌倾向！");
                    return false;
                }*/
                data.brandIds = brandIds.join(",");
            };
            if(data.factorysPictureArr.length == 0){
                delete data.factorysPictureArr
            };
            if(data.factoryLogo.length == 0){
                delete data.factoryLogo
            };
            if(data.brandIds.length == 0){
                delete data.brandIds
            };
            if(data.companyOwner.length == 0){
                delete data.companyOwner
            };
            if(data.companyLicence.length == 0){
                delete data.companyLicence
            };
            if(data.companyLicencePhoto.length == 0){
                delete data.companyLicencePhoto
            };
            if(data.accountOwner.length == 0){
                delete data.accountOwner
            };
            if(data.accountBank.length == 0){
                delete data.accountBank
            };
            if(data.accountNum.length == 0){
                delete data.accountNum
            };
            console.log(data);
            //return 0
            //保存数据
            this.utils.resolveForm(_this,()=>{
                this.post(Api.user.factory.insert,data,(res)=>{
                    this.$Message.success("新增汽修厂成功！");
                    this.utils.refshData(_this.$parent.$parent);
                });
            });
        },
    }
};
</script>
