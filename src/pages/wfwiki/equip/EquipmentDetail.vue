<template>
<div class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            <router-link :to="'/wfwiki/equip'">装备一览</router-link>/{{ equipData.jname }}
        </div>
        <div class="equipContent">
            <div class="iconBox">
                <img style="width:100%" :src="iconurl"/>
            </div>
            <div class="equipTable">
                <div class="trow">
                    <div class="leftcell">
                        <span class="small">{{ equipData.jname }}</span>
                        <div style="font-size:38px;">{{ equipData.jname }}</div>
                    </div>
                    <div class="rightcell">
                        <img style="width:100%" :src="starurl" />
                    </div>
                    
                </div>
                <div class="thead" style="width:100%;" @mouseover="hovered=true" @mouseleave="hovered=false">{{ (hovered?'MAX':'INIT')+' / HOVER TO CHANGE' }}</div>
                <div class="trow">
                    <div :class="['thead','back-'+GetColor(equipData.type)]">属性</div>
                    <div :class="['tcell','wid100','color-'+GetColor(equipData.type)]">{{ equipData.type }}</div>
                    <div class="thead">入手方法</div>
                    <div class="tcell">{{ equipData.get }}</div>
                </div>
                <div class="trow">
                    <div class="thead">HP</div>
                    <div class="tcell wid100">{{ hovered?equipData.hp_max:equipData.hp_init }}</div>
                    <div class="thead">ATK</div>
                    <div class="tcell wid100">{{ hovered?equipData.atk_max:equipData.atk_init }}</div>
                </div>
                <div class="thead">ABILITY</div>
                <div class="trow">{{ hovered?equipData.effect_max:equipData.effect_init }}</div>
                <div class="thead">CHARACTER</div>
                <div class="trow flexcontainer">
                    <router-link style="width:110px;" v-for="ele in equipData.chara" :key="ele" :to="GetRouter(ele)">
                        <div class="iconBorder">
                            <img :src="GetCharaIcon(ele)"/>
                        </div>
                        <div style="text-align:center;">{{ ele }}</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'wfequipdetail',
    data(){
        return{
            hovered: false,
        }
    },
    created(){
        let id = this.$route.params.id;
        this.equipData = this.Common.eqData[id];
    },
    computed: {
        iconurl: function(){
            var fname = this.equipData.url;
            return '/static/equip/' + fname + '.png';
        },
        starurl(){
            return require("../../../assets/star"+this.equipData.rare+".png");
        },
    },
    methods:{
        GetColor(i){
            return {'火':'red','水':'blue','雷':'yellow','风':'green','光':'light','暗':'dark'}[i];
        },
        GetCharaIcon(ele){
            var fname = this.Common.wfData[ele];
            if(fname == undefined){
                console.log(ele);
                return;
            }
            return '/static/icon/' + fname.url + '.png';
        },
        GetRouter(ele){
            return { name: 'chara', params:{ id:ele} };
        }
    },
    components: {
    }
}
</script>

<style lang="scss">
.equipContent{
    display: flex;
    flex-wrap: wrap;

    .iconBox{
        position: relative;
    }

    .equipTable{
        position: relative;
        width: 565px;
        height: 658px;
        z-index: 1;
        padding-left: 8px;

        .small{
            font-size: 12px;
        }

        .leftcell{
            display: inline-block;
            height: 80px;
        }
        .rightcell{
            display: inline-block;
            position: absolute;
            width: 150px;
            top: 18px;
            right: 0;
        }
        .trow {
            display: block;
            margin: 5px 0;
        }
        .thead{
            display: inline-block;
            position: relative;
            background-color: #515d78;
            border-radius: 15px;
            font-size: 12px;
            color: #fff;
            min-width: 42px;
            padding: 0 10px;
            height: 19px;
            text-align: center;
            margin-bottom: 6px;
            padding-top: 1px;
        }
        .tcell{
            display: inline-block;
            font-size: 16px;
            color: #4b4b4b;
            margin-left: 8px;
            margin-bottom: 6px;
            line-height: 1em;

            &.wid100{
                width: 120px;
            }
        }
        
        .iconBorder{
            width: 64px;
            height: 64px;
            margin: 8px auto;
            border-radius: 10px;
            overflow: hidden;
        }
    }
}
</style>