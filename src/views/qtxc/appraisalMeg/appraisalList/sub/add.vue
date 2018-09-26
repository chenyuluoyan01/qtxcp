<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="活动名称：" class="formMust">
                    <Input v-model="formData.rel.activityName" placeholder="请输入活动名称" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.activityName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="banner位置：" class="formMust">
                    <Input v-model="formData.rel.position" placeholder="请输入banner位置" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.position == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="跳转链接：" class="formMust">
                    <Input v-model="formData.rel.link" placeholder="请输入跳转链接" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.link == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="活动图片：" class="formMust">
                    <upload
                        :count="formData.imgUpConfig.count"
                        :defaultList="formData.imgUpConfig.defaultList"
                        :fileDir='formData.imgUpConfig.fileDir'
                        @upList="getUpList"
                    ></upload>
                    <span v-if='formData.initF && formData.rel.pictureUrl == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="发布时间：" class="formMust" >
                    <RadioGroup v-model="formData.rel.distributedYn">
                      <Radio label="Y">立即发布</Radio>
                      <Radio label="N">自定义发布时间</Radio>
                    </RadioGroup>
                    <span v-if='formData.initF&&formData.rel.distributedYn==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem v-if='formData.rel.distributedYn=="N"' label="选择发布时间：" class="formMust" >
                    <DatePicker
                      :value="formData.rel.distributedTime"
                      @on-change="getDate"
                      format="yyyy-MM-dd"
                      type="date"
                      placement="bottom-end"
                      placeholder="选择发布时间"
                      style="width: 200px"
                    ></DatePicker>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import {upload} from '@/core'
export default {
    name: 'bannerAdd',
    props:["name"],
    components: {
        upload
    },
    data () {
        return {
            formData:{
                imgUpConfig:{
                    count:1,
                    defaultList:[],
                    fileDir:'banner'
                },
                roleList:{
                    listId:"roleId",
                    listName:"roleName",
                    list:[]
                },
                initF:false,
                rel:{
                    activityName:"",
                    link:"",
                    platformRoleId:"",
                    pictureUrl:"",
                    distributedYn:"Y",
                    distributedTime:""
                }
            }
        }
    },
    mounted () {
        //设置初始时间
        this.formData.rel.distributedTime = this.utils.formatDate(new Date())
    },
    methods: {
        getUpList(url){
            this.formData.rel.pictureUrl = url;
        },
        getDate(date){
            this.formData.rel.distributedTime = date + ' 00:00:00';
        },
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.post(Api.banner.insert,this.formData.rel,(res)=>{
                    this.$Message.success("新增banner成功！")
                    this.utils.refshData(_this.$parent.$parent);
                });
            });
        },
    }
};
</script>
