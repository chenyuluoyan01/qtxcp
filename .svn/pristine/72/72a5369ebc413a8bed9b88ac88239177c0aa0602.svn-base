<style lang="less">
.table-wrap{
    border: 1px solid #ddd;
    border-bottom: none;
    margin:0;
    padding: 0;
    .sub-wrap{
        width: 100%;
        min-height: 80px;
        border-left:1px solid #ddd;
    }
    .m-sub-wrap{
        display: inline-block;
        .sub-title{
            display: inline-block;
            width:auto
        }
    }
    .title{
        width: 100px;
        text-align:center
    }
    .main-title{
        width: 200px;
    }
}
.mbrage{
    .ivu-icon.ivu-icon-ios-close-empty {
        position: absolute;
        right: 20px;
        top: 10px;
    }
}
.table-wrap:last-child{
    border-bottom: 1px solid #ddd;
}
</style>

<template>
        <div class="margin-bottom-small">
            <Modal
                v-model='init'
                width="65vw"
                :closable='false'
                :mask-closable='false'
                :title='"选择车型-"+item.brandName+"(已选车型"+cardTypeIds.length+"个)"'
            >
                <div  v-for='(x,xi) in current.carsList' class="table-wrap flex item-center">
                    <div class="title main-title">
                        <Checkbox @change.native = 'handelChange(x.carsId,$event)' :label='x.carsId'>
                            {{x.carsName}}
                        </Checkbox>
                    </div>
                    <div class="sub-wrap flex item-center" v-if='x.cardTypeList'>
                        <CheckboxGroup v-model="cardTypeIds">
                            <div   v-for='(xl,xli) in x.cardTypeList' class="m-sub-wrap padding-xs">
                                <Checkbox :label='xl.cardTypeId'>
                                    <h2  class="title sub-title">{{xl.cardTypeName}}</h2>
                                </Checkbox>
                            </div>
                        </CheckboxGroup>
                    </div>
                    <div class="sub-wrap" v-else></div>
                </div>
                <div slot="footer">
                    <Button @click='back'>返回</Button>
                    <Button type="primary" @click='save'>确定</Button>
                </div>
            </Modal>
        </div>

</template>

<script>

export default {
    name: 'brandBox',
    props:["item"],
    components: {
    },
    data () {
        return {
            init:true,
            sourceIds:[],
            checked:true,
            current:{},
            cardTypeIds:[],
        }
    },
    mounted () {
        this.current = this.utils.assign(this.item);
        this.handleInit()
    },
    methods: {
        handleInit(){
            let list = this.utils.assign(this.item);
            let ids = [];
            list.carsList.map((item,index)=>{
                item.cardTypeList.map(e=>{
                    ids.push(e.cardTypeId)
                })
            });
            let aimTypeId = this.utils.getData('aimTypeId');
            if(aimTypeId instanceof Array){
            }else{
                aimTypeId = [];
            }
            aimTypeId.map(id=>{
                if(ids.indexOf(id) != -1){
                    this.cardTypeIds.push(id)
                }
            });
            let sourceIds = this.utils.assign(this.cardTypeIds);
            this.sourceIds = sourceIds;
        },
        handelChange(id,event){
            let checked = event.path[0].checked;
            if(checked){
                let list = this.item.carsList;
                list.map(item=>{
                    if(item.carsId === id){
                        if(item.cardTypeList instanceof Array){
                            item.cardTypeList.map(e => {
                                this.cardTypeIds.push(e.cardTypeId)
                            });
                        }
                    }
                });
                this.cardTypeIds = [...new Set(this.cardTypeIds)];
            }else{
                let list = this.item.carsList;
                list.map(item=>{
                    if(item.carsId === id){
                        if(item.cardTypeList instanceof Array){
                            item.cardTypeList.map(e => {
                                let index = this.cardTypeIds.indexOf(e.cardTypeId);
                                if(index != -1){
                                    this.cardTypeIds.splice(index,1)
                                };
                            })
                        };
                    };
                })
            }
        },
        back(){
            this.$parent.boxInit = false;
        },
        save(){
            let aimTypeId = this.utils.getData('aimTypeId');
            if(aimTypeId instanceof Array){
            }else{
                aimTypeId = [];
            }
            let list = this.cardTypeIds;
            let source = this.sourceIds;
            list.map(id=>{
                if(aimTypeId.indexOf(id) == -1){
                    aimTypeId.push(id)
                }
            });
            source.map(id=>{
                if(aimTypeId.indexOf(id) != -1 && list.indexOf(id) == -1){
                    aimTypeId.splice(aimTypeId.indexOf(id),1)
                }
            });
            this.utils.setData('aimTypeId',aimTypeId);
            this.$parent.boxInit = false;
        }
    }
};
</script>
