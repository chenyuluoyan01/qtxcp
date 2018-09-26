<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="姓名：" class="formMust">
                    <span>{{formData.rel.nickName}}</span>
                </FormItem>
                <FormItem label="手机号/登录名" class="formMust">
                    <span>{{formData.rel.phone}}</span>
                </FormItem>
                <FormItem label="性别：" class="formMust" >
                    <span>{{formData.rel.sex == 'M'?"男":"女"}}</span>
                </FormItem>
                <FormItem label="职务：" class="formMust" >
                   <span>{{formData.rel.roleName}}</span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'peopleView',
    props:["name","detail"],
    components: {
    },
    data () {
        return {
            formData:{
                rel:{
                    nickName:"",
                    roleName:"",
                    phone:"",
                    platformRoleId:"",
                    sex:"M"
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
            this.formData.rel.userId = d.userId;
        }
    }
};
</script>
