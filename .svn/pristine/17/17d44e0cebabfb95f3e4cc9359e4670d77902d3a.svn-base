<style lang="less">
    @import '../styles/menu.less';
    .brage{
        left:100px!important;
    }
</style>

<template><!-- :open-names="openNames" -->
    <Menu ref="sideMenu" :active-name="$route.name" accordion  :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="(item,index) in menuList" v-if='getHas(item.children)'>
            <!-- <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
            </MenuItem> -->

            <Submenu class="view-title" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon v-if = 'item.icon' :type="item.icon" :size="14"></Icon>
                    <img v-if = 'item.img' alt="" :src="item.img" style="width:10px;height:12px;margin-right:5px;">
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template  v-if='item.has' v-for="child in item.children">
                        <!-- <template v-if='child.code == "jfdd"'>
                            <MenuItem v-if='brageInit' :name="child.name" :key="'menuitem' + child.name" @click.native='refsh(child.name)'>
                                <Badge :count='brage' class-name='brage'>
                                    <span class="layout-text" style="padding-left:8px;position:relative;bottom:2px;" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                                </Badge>
                            </MenuItem>
                            <MenuItem v-if='!brageInit' :name="child.name" :key="'menuitem' + child.name" @click.native='refsh(child.name)'>
                                <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                                <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                            </MenuItem>
                        </template>
                        <template v-else>
                            <MenuItem :name="child.name" :key="'menuitem' + child.name" @click.native='refsh(child.name)'>
                                <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                                <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                            </MenuItem>
                        </template> -->
                        <MenuItem :name="child.name" :key="'menuitem' + child.name" @click.native='refsh(child.name)'>
                            <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                            <span class="layout-text" :key="'title' + child.name">{{ itemTitle(child) }}</span>
                        </MenuItem>

                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    data () {
        return {
            brageInit:false,
            brage:0
        }
    },
    mounted (){
        this.$Event.$on("afterCount",afterCount=>{
            if(afterCount>0){
                this.brageInit = true;
                this.brage = afterCount;
            }
        });
        let name = this.$route.name;
        let index = 0;
        let list = this.utils.assign(this.menuList).filter(item=>item.has === true);
        for(let i in list){
            let child = list[i].children;
            for(let j in child){
                if(child[j].name == name){
                    index = i;
                    $(".ivu-menu-submenu-title").eq(index).click();
                    return false;
                }
            }
        };

    },
    methods: {
        getHas (list){
            let status = false;
            let gList = list.filter(item=>item.has === true);
            gList.length>0 && (status = true);
            return status
        },
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        },
        refsh (name) {
            this.Event.$emit("refsh",name)
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
