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
                    <Tree  @on-check-change='getCheckedNodes' style='width:30vw; overflow:auto;padding:10px 20px;' :data="authorityList" show-checkbox ref="tree"></Tree>
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
    props:["name","id"],
    components: {
    },
    data () {
        return {
            authorityList:[],
            formData:{
                initF:false,
                rel:{
                    roleName:"",
                    roleId:"",
                    permissionCode:""
                }
            }
        }
    },
    mounted () {
        this.formData.rel.roleName = localStorage.getItem("currentRoleName")
        this.authorityList = JSON.parse(JSON.stringify(routers));
        this.formData.rel.roleId = this.id;
        this.getPromise();
    },
    methods: {
        save(){
            let _this = this;
            this.utils.resolveForm(_this,()=>{
                this.post(Api.role.update,this.formData.rel,(res)=>{
                    this.$Message.success("修改权限成功！");
                    this.utils.refshData(_this.$parent.$parent);
                });
            });
        },
        getTree: function(codeList){
            let authorityList = JSON.parse(JSON.stringify(routers));
            for(let i in authorityList){
                for(let j in authorityList[i].children){
                    let tmp = authorityList[i].children[j];
                    for(let k in codeList){
                        if(codeList[k] == tmp.code){
                            tmp.checked = true;
                        }
                    }
                }
            };
            this.authorityList = authorityList;
        },
        getPromise: function(){
            let roleId = this.id;
            let data = {roleId:roleId};
            this.get(Api.role.getP,data,(res)=>{
                if(res.object && res.object.permissionCode!=null){
                    let codeStr = res.object.permissionCode;
                    let codeList = codeStr.split(',');
                    this.getTree(codeList)
                }else{
                    let codeList = [];
                    this.getTree(codeList);
                }
            });
        },
        getCheckedNodes(){
            let authorityList = JSON.parse(JSON.stringify(this.$refs.tree.getCheckedNodes()));
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
