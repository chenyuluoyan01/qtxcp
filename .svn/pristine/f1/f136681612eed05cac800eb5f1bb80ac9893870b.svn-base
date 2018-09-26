<style lang="less">

</style>

<template>
    <div>
        <div class="i-form">
            <Form :ref="formData.rel" :model="formData.rel" :label-width="120">
                <FormItem label="唯一标识：" class="formMust">
                    <span>{{formData.rel.coding}}</span>
                </FormItem>
                <FormItem label="品牌名称：" class="formMust">
                    <span>{{formData.rel.goodsBrandName}}</span>
                </FormItem>
                <FormItem label="英文名：" class="formMust">
                    <span>{{formData.rel.goodsBrandEnglish}}</span>
                </FormItem>
                <!-- <FormItem label="服务分类：" class="formMust" >
                    <span>{{formData.rel.itemCat | getName}}</span>
                </FormItem>
                <FormItem label="项目分类：" class="formMust" >
                   <span>{{formData.rel.itemName}}</span>
                </FormItem> -->
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
    filters: {
        getName: function(itemCat){
            let itemName = "";
            if(itemCat == 'BYXM'){
                itemName = "保养项目"
            }else if(itemCat == 'QXYH'){
                itemName = "清洗养护"
            }else if(itemCat == 'WXXM'){
                itemName = "维修项目"
            };
            return itemName
        }
    },
    data () {
        return {
            formData:{
                rel:{
                    goodsBrandName:"",
                    coding:"",
                    goodsBrandEnglish:"",
                    /*itemCat:"",
                    itemName:""*/
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
        }
    }
};
</script>
