<style lang="less">

</style>

<template>
    <server-page :itemCat='itemCat'></server-page>
</template>

<script>
import {serverPage} from '@/core'
export default {
    name: 'sheetMetalSprayPaint',
    components: {
        serverPage
    },
    data () {
        return {
            itemCat:"BJPQ"
        };
    },
    mounted () {
    },
    methods: {
    }
};
</script>
