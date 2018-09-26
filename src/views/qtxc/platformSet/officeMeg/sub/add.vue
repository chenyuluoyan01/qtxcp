<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="职务名称：" class="formMust">
                    <Input v-model="formData.rel.roleName" placeholder="请输入职务名称" style="width:320px;"></Input>
                    <span v-if='formData.initF && formData.rel.roleName == ""' class="error-mark"><Icon type="close-circled"></Icon> 必填</span>
                </FormItem>
                <FormItem label="职务权限：" class="formMust">
                    <Tree @on-check-change='getCheckedNodes' style='width:30vw; overflow:auto;padding:10px 20px;' :data="authorityList" show-checkbox ref="tree"></Tree>
                    <span v-if='formData.initF && formData.rel.permissionCode == ""' class="error-mark"><Icon type="close-circled"></Icon> 必填</span>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import routers from '@/router/router.js'
export default {
    name: 'officeAdd',
    props:["name"],
    components: {
    },
    data () {
        return {
            authorityList:[],
            formData:{
                initF:false,
                rel:{
                    roleName:"",
                    permissionCode:""
                }
            }
        }
    },
    mounted () {
        this.authorityList = JSON.parse(JSON.stringify(routers));
    },
    methods: {
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.post(Api.role.insert,this.formData.rel,(res)=>{
                    this.$Message.success("新增职位成功！");
                    this.utils.refshData(_this)
                });
            });
        },
        getCheckedNodes(list){
            let authorityList = JSON.parse(JSON.stringify(list));
            let singleAuthority = authorityList.filter((item)=>{
                return item.children == null;
            });
            let codeArray = [];
            let codeStr = "";
            for(let i in singleAuthority){
                codeArray.push(singleAuthority[i].code)
            };
            if(codeArray.length>0){
                codeStr = codeArray.join(",")
            };
            this.formData.rel.permissionCode = codeStr;
        }
    }
};
</script>
