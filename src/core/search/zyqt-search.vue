<style lang="less">
    .z-search{
        width: 100%;
        padding: 14px 20px;
        border: 1px solid #dedede;
        border-left: 5px solid rgb(236, 104, 30);
        margin-bottom: 20px;
        transition: all .3s;
        .ivu-form-item{
            margin-bottom:0;
        }
        .f-label{
            display:inline-block;
            height:30px;
            line-height: 30px;
            vertical-align: middle;
        }
        .z-search-item{
            display:inline-block;
        }
    }
    .z-search:hover{
        box-shadow: 0 1px 4px rgba(0,0,0,.1);
        transition: all .3s;
    }
    .rt {
        position:absolute;
        right:0;
        top:16px;
    }
</style>

<template>
    <div class="z-search" style="position:relative">
        <Form inline>
            <div class="z-search-item" v-for="(item,index) in searchData.list" :key ="'a'+index">
                <label class="f-label"><span v-if="!item.show">{{item.name}}</span></label>
                <!--输入框-->
                <FormItem v-if="item.type=='input'">
                    <Input type="text" style='width:120px;display: inline-block;vertical-align: middle;' v-model="searchData.rel[item.id]" :placeholder="item.name"></Input>
                </FormItem>
                <!--auto选择框-->
                <FormItem v-if="item.type=='autoSelect'">
                    <Select filterable v-model="searchData.rel[item.id]" :placeholder="item.name" style='width:140px;vertical-align: middle;'>
                        <Option v-for="(todo,i) in searchData.source[item.source].list" :key="'b'+i" :value="todo[searchData.source[item.source].listId]">{{todo[searchData.source[item.source].listName]}}</Option>
                    </Select>
                </FormItem>
                <!--选择框-->
                <FormItem v-if="item.type=='select'" :class="{'rt':item.float=='right'}">
                  <Select v-model="searchData.rel[item.id]" :placeholder="item.name" style='width:140px;vertical-align: middle;'>
                    <Option v-for="(todo,i) in searchData.source[item.source].list" :key="'b'+i" :value="todo[searchData.source[item.source].listId]">{{todo[searchData.source[item.source].listName]}}</Option>
                  </Select>
                </FormItem>
                <!--选择起止日期-->
                <FormItem v-if="item.type=='daterange'||item.type=='date'">
                    <DatePicker
                      :value="searchData.rel[item.id]"
                      @on-change="getDate"
                      format="yyyy-MM-dd"
                      :type="item.type"
                      placement="bottom-start"
                      :placeholder="item.name"
                      style="width: 200px;vertical-align: middle;"
                    ></DatePicker>
                </FormItem>
            </div>
            <FormItem>
                <Button v-if='searchData.search==null||searchData.search!=false' type='primary' size='small'  icon="ios-search" @click='search'>搜索</Button>
            </FormItem>
            <FormItem>
                <Button v-if='searchData.add' size='small' type='info'  icon="plus" @click='add'>添加</Button>
            </FormItem>
            <FormItem>
                <Button v-if='searchData.save' type='primary' @click='save'>保存</Button>
            </FormItem>
            <FormItem>
            <Poptip
                placement='bottom'
                width='200'
                confirm
                title="还没有保存，确定要离开吗?"
                @on-ok="back"
            >
                <Button v-if='searchData.back'>返回</Button>
            </Poptip>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    name: 'zyqtSearch',
    props: ["searchData"],
    components: {

    },
    data () {
        return {
            user:"",
            name:"",
            autoInit:false
        };
    },
    mounted () {
    },
    methods: {
        getDate: function(time){
            let id1 = "";
            let id2 = "";
            for(let i in this.searchData.list){
                let tmp = this.searchData.list[i];
                if(tmp.type == "daterange"){
                    id1 = tmp.id1;
                    id2 = tmp.id2;
                }
            }
            this.searchData.rel[id1] = time[0];
            this.searchData.rel[id2] = time[1];
        },
        add: function(){
            this.$emit("add")
        },
        save: function(){
            this.$emit("save")
        },
        back: function(){
            this.$emit("back")
        },
        search: function(){
            let rel = this.searchData.rel;
            let data = {};
            for(let o in rel){
                let tmp = rel[o];
                if($.isArray(tmp) && tmp.length>0){
                    data[o] = tmp.join(",");
                }else if(tmp && tmp.toString().length > 0){
                    data[o] = tmp;
                };
            };
            this.$emit("getParam",data)
        }
    },
};
</script>
