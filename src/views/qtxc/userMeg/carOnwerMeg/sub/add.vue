<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="姓名：" class="formMust">
                    <Input v-model="formData.rel.nickName" placeholder="请输入姓名" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.nickName == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="手机号/登录名" class="formMust">
                    <Input v-model="formData.rel.phone" placeholder="请输入电话" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.phone == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="性别：" class="formMust" >
                    <RadioGroup v-model="formData.rel.sex">
                      <Radio label="M">男</Radio>
                      <Radio label="F">女</Radio>
                    </RadioGroup>
                    <span v-if='formData.initF&&formData.rel.sex==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="密码" class="formMust">
                    <Input v-model="formData.rel.password" type='password' placeholder="请输入密码" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.password == ""' class="error-mark">
                        <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
                <FormItem label="选择门店：" class="formMust" >
                   <Select v-model='formData.rel.platformRoleId'  style='width:200px;'>
                     <Option v-for='(todo,i) in formData.roleList.list' :key='"1xd"+i' :value='todo[formData.roleList.listId]'>{{todo[formData.roleList.listName]}}</Option>
                   </Select>
                    <span v-if='formData.initF&&formData.rel.platformRoleId.toString()==""' class="error-mark">
                    <Icon type="close-circled"></Icon> 必填
                    </span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'peopleAdd',
    props:["name"],
    components: {
    },
    data () {
        return {
            formData:{
                roleList:{
                    listId:"roleId",
                    listName:"roleName",
                    list:[]
                },
                initF:false,
                rel:{
                    nickName:"",
                    phone:"",
                    password:"",
                    platformRoleId:"",
                    province:"广东省",
                    city:"深圳市",
                    district:"南山",
                    sex:"M"
                }
            }
        }
    },
    mounted () {
        this.getRoleList();
    },
    methods: {
        getRoleList(){
            this.get(Api.role.get,{size:999},(res)=>{
                this.formData.roleList.list = res.object || [];
            });
        },
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.post(Api.userB.insert,this.formData.rel,(res)=>{
                    this.$Message.success("新增管理员成功！");
                    this.refshData(_this.$parent.$parent);s
                });
            });
        },
    }
};
</script>
