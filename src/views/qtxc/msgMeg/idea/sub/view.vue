<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Modal v-model='openPic'>
                <img :src="currentUrl" class="pic-modal">
            </Modal>
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="时间：" class="formMust">
                    <span v-if='formData.rel.createTime'>{{formData.rel.createTime | formatDate}}</span>
                    <span v-else></span>
                </FormItem>
                <FormItem label="主题：" class="formMust">
                    <span>{{formData.rel.title}}</span>
                </FormItem>
                <FormItem label="内容：" class="formMust">
                    <p style="width:360px;">{{formData.rel.content}}</p>
                </FormItem>
                <FormItem label="姓名：" class="formMust">
                    <span>{{formData.rel.userName}}</span>
                </FormItem>
                <FormItem label="联系方式：" class="formMust">
                    <span>{{formData.rel.phone}}</span>
                </FormItem>
                <FormItem label="照片：" class="formMust">
                    <div>
                        <img
                            v-for = '(item,index) in formData.picList'
                            :key = '"img"+index'
                            @click='currentUrl=item.url,openPic=true'
                            class = 'pointer'
                            style="height:220px; margin-right:20px;" :src="item.url" alt="">
                    </div>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import {freeText,upload} from '@/core'
export default {
    name: 'peopleAdd',
    props:["name","detail"],
    components: {
        freeText,upload
    },
    data () {
        return {
            currentUrl:"",
            openPic:false,
            loadInit:false,
            formData:{
                picList:[],
                imgUpConfig:{
                    count:1,
                    defaultList:[],
                    fileDir:'msg'
                },
                messageTypeList:{
                    listName:"keyLabel",
                    listId:"keyValue",
                    list:[
                        {
                            keyLabel:"全部",
                            keyValue:"0"
                        },
                        {
                            keyLabel:"车主",
                            keyValue:"1"
                        },
                        {
                            keyLabel:"汽车厂",
                            keyValue:"2"
                        }
                    ]
                },
                initF:false,
                rel:{
                    createTime:"",
                    title:"",
                    content:"0",
                    userName:"",
                    phone:"",
                    suggestionPictureIdArr:""
                }
            }
        }
    },
    mounted () {
        this.handleInit();
    },
    methods: {
        handleInit(){
            let d = this.detail;
            this.formData.rel = this.utils.getObjByKeys(this.formData.rel,JSON.parse(JSON.stringify(d)));
            this.formData.imgUpConfig.defaultList[0] = {url:this.formData.rel.messagePic};
            let picList = this.formData.rel.suggestionPictureIdArr;
            if(picList!=null){
                picList = JSON.parse(picList);
            }else{
                picList = [];
            };
            this.formData.picList = picList;
            this.loadInit = true;
        },
        getUpList(url){
            this.formData.rel.messagePic = url;
        },
    }
};
</script>