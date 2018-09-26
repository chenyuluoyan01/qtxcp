<style lang="less">

</style>

<template>
    <div class="i-form">
        <Form :label-width="120">
            <FormItem label="职务名称：">
                <div>{{roleName}}</div>
            </FormItem>
            <FormItem label="职务权限：">
                <Tree style='width:30vw; overflow:auto;padding:10px 20px;' :data="authorityList" show-checkbox></Tree>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import routers from '@/router/router.js'
export default {
    name: 'demo',
    props: ["id"],
    components: {

    },
    data () {
        return {
            authorityList:[],
            roleName:''
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init: function(){
            this.roleName = localStorage.getItem("currentRoleName");
            this.getPromise()
        },
        getTree: function(codeList){
            let authorityList = JSON.parse(JSON.stringify(routers));
            for(let i in authorityList){
                authorityList[i].disabled = true;
                for(let j in authorityList[i].children){
                    let tmp = authorityList[i].children[j];
                    tmp.disabled = true;
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
                console.log(res.object)
                if(res.object&&res.object.permissionCode!=null){
                    let codeStr = res.object.permissionCode;
                    let codeList = codeStr.split(',');
                    this.getTree(codeList)
                }else{
                    this.getTree([]);
                    //this.$Message.warning("查询不到权限！")
                }
            });
        }
    }
};
</script>

