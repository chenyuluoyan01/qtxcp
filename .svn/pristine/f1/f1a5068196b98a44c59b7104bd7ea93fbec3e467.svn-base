<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="标题：" class="formMust">
                    <Input v-model="formData.rel.messageTitle" placeholder="请输入标题" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.messageTitle == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>

                <FormItem label="收件人：" class="formMust">
                    <RadioGroup v-model='formData.rel.messageType'>
                        <Radio
                            v-for='(item,index) in formData.messageTypeList.list'
                            :label='item[formData.messageTypeList.listId]'
                            :key='"messageType"+index'
                        >
                            {{item[formData.messageTypeList.listName]}}
                        </Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="主图：" class="formMust">
                    <upload
                        :count="formData.imgUpConfig.count"
                        :defaultList="formData.imgUpConfig.defaultList"
                        :fileDir='formData.imgUpConfig.fileDir'
                        @upList="getUpList"
                    ></upload>
                    <span v-if='formData.initF && formData.rel.messagePic == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>

                <FormItem label="内容：" class="formMust">
                    <free-text :text='formData.rel.messageSubject' ref='freeText'></free-text>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import {freeText,upload} from '@/core'
export default {
    name: 'peopleAdd',
    props:["name"],
    components: {
        freeText,upload
    },
    data () {
        return {
            formData:{
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
                            keyLabel:"车主",
                            keyValue:"1"
                        }
                    ]
                },
                initF:false,
                rel:{
                    messageTitle:"",
                    messageType:"1",
                    messageSubject:"",
                    messagePic:"",
                }
            }
        }
    },
    mounted () {
    },
    methods: {
        getUpList(url){
            this.formData.rel.messagePic = url;
        },
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.formData.rel.messageSubject = this.$refs.freeText.getHtml();
                let content = this.formData.rel.messageSubject;
                if(content.length == 0){
                    this.$Message.warning("消息内容为空！");
                    return false
                }
                this.post(Api.msg.mechanicsScience.insert,this.formData.rel,(res)=>{
                    this.$Message.success("新增汽修科普成功！");
                    this.utils.refshData(_this.$parent.$parent);
                });
            });
        },
    }
};
</script>
