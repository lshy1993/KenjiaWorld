<template>
<div class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            <router-link :to="'/wfwiki'">角色一览</router-link>/{{ charaData.jname }}
        </div>
        <div class="charaContent">
            <div class="avatarBox">
                <img style="width:100%" :src="avatarurl"/>
            </div>
            <div class="charaTable">
                <div class="trow">
                    <div class="leftcell">
                        <span class="small">{{ charaData.cname }}</span>
                        <div style="font-size:38px;">{{ charaData.jname }}</div>
                    </div>
                    <div class="rightcell">
                        <img style="width:100%" :src="starurl" />
                    </div>
                </div>
                <div class="trow">
                    <div class="thead">CV</div>
                    <div class="tcell">{{ charaData.cv }}</div>
                </div>
                <div class="trow">
                    <div class="thead">RACE</div>
                    <div class="tcell wid100">{{ charaData.race }}</div>
                    <div class="thead">SEXUAL</div>
                    <div class="tcell wid100">{{ charaData.sex }}</div>
                </div>
                <div class="trow">
                    <div :class="['thead',GetColor(charaData.type)]">属性</div>
                    <div :class="['tcell','wid100',GetColor(charaData.type)]">{{ charaData.type }}</div>
                    <div class="thead">职业</div>
                    <div class="tcell wid100">{{ charaData.job }}</div>
                </div>
                <div class="trow">
                    <div class="thead">SKILL</div>
                    <div class="tcell">{{ charaData.skill }}</div>
                </div>
                <div>{{ charaData.skill_info }}</div>
                <div class="trow">
                    <div class="thead">LEADER</div>
                    <div class="tcell">{{ charaData.leader }}</div>
                </div>
                <div class="trow">{{ charaData.leader_info }}</div>
                <div class="thead">ABILITY</div>
                <div class="trow">
                    <li>{{ charaData.ability1 }}</li>
                    <li>{{ charaData.ability2 }}</li>
                    <li>{{ charaData.ability3 }}</li>
                </div>
                <!--tr>
                    <td>lv：70</td>
                </tr>
                <tr>
                    <td>over limit: 0</td>
                </tr>
                <tr>
                    <td>
                        <div class="subcol">hp：{{ charaData.maxhp }}</div>
                        <div class="subcol">atk：{{ charaData.maxatk }}</div>
                    </td>
                </tr-->
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'wfcharadetail',
    data(){
        return{
            debug: true,
            charaData: {}
        }
    },
    created(){
        let id = this.$route.params.id;
        this.charaData = this.Common.wfData[id];
    },
    computed: {
        iconurl: function(){
            var fname = this.charaData.url;
            return '/static/icon/' + fname + '.png';
        },
        pixelurl: function(){
            var fname = this.charaData.url;
            return '/static/gif/' + fname +(this.hovered?'_special.gif':'.gif');
        },
        starurl(){
            return require("../../../assets/star"+this.charaData.rare+".png");
        },
        avatarurl(){
            var fname = this.charaData.url;
            return '/static/full/' + fname +'_full.png';
        }
    },
    methods:{
        GetColor(i){
            return {'火':'red','水':'blue','雷':'yellow','风':'green','光':'light','暗':'dark'}[i];
        },
    },
    components: {
    }
}
</script>

<style lang="scss">
.charaContent{
    display: flex;
    flex-wrap: wrap;

    .avatarBox{
        width: 555px;
        height: 658px;
        position: relative;
    }

    .charaTable{
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
            //height: 60px;
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
            width: 62px;
            height: 19px;
            text-align: center;
            margin-bottom: 6px;
            padding-top: 1px;

            &.red{
                background-color: #a32535;
            }
            &.green{
                background-color: #539722;
            }
            &.blue{
                background-color: #2f60b2;
            }
            &.yellow{
                background-color: #b29614;
            }
            &.light{
                background-color: #abb283;
            }
            &.dark{
                background-color: #3f2843;
            }
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
            &.red{
                color: #a32535;
            }
            &.green{
                color: #539722;
            }
            &.blue{
                color: #2f60b2;
            }
            &.yellow{
                color: #b29614;
            }
            &.light{
                color: #abb283;
            }
            &.dark{
                color: #3f2843;
            }
        }
        
        .iconBorder{
            width: 64px;
            height: 64px;
            margin: 8px auto;
            //border: 3px solid;
            border-radius: 10px;
            box-sizing: border-box;
            transition: all 0.2s;
            overflow: hidden;
        }
    }
}
</style>