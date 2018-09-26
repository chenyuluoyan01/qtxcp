<style lang="less">
</style>

<template>
    <Select
        v-model="values"
        filterable
        remote
        :remote-method="remoteMethod"
        :loading="loading"
    >
        <Option v-for="(option, index) in options" :value="option[source.listId]" :key="index">{{option[source.listName]}}</Option>
    </Select>
</template>

<script>
export default {
    name: 'auto_select',
    props:["source","value"],
    data () {
        return {
            loading:false,
            options:[],
            values:""
        };
    },
    mounted () {
        this.values = this.value;
        this.options = this.utils.assign(this.source.list);
    },
    methods: {
        remoteMethod: function(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const list = this.source.list;
                    this.options = list.filter(item => item[this.source.listName].indexOf(query) > -1);
                }, 200);
            } else {
                this.options = this.utils.assign(this.source.list);
                console.log(this.options);
            }
        }
    },
    components: {

    }
};
</script>
