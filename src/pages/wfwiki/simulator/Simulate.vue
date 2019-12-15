<template>
<div class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            队伍配置模拟器
        </div>
        <div id="simulatorContent">
            <div id="teamContent">
                <div v-for="i in 3" :key="i" class="heroslot">
                    <div :class="['whiteborder','main',cur_select == -1 ? '' : cur_select == i*3-3?'green':'masked']" @click="cur_select=i*3-3">
                        <img :src="GetFullUrl(mainhero[i-1])" class="fig" />
                    </div>
                    <div :class="['whiteborder','equip',cur_select == -1 ? '' : cur_select == i*3-2?'green':'masked']" @click="cur_select=i*3-2">
                        <img :src="GetEquipUrl(equip[i-1])" class="fig" />
                    </div>
                    <div :class="['whiteborder','sub',cur_select == -1 ? '' : cur_select == i*3-1?'green':'masked']" @click="cur_select=i*3-1">
                        <img :src="GetFullUrl(subhero[i-1])" class="fig" />
                    </div>
                    <div class="pixelBorder" >
                        <img class="pixelImg" :src="GetPixelUrl(mainhero[i-1])" />
                    </div>
                    <div class="pixelBorder low" >
                        <img class="pixelImg" :src="GetPixelUrl(subhero[i-1])" />
                    </div>
                </div>
                <div v-if="cur_select != -1 && cur_select % 3 != 1">
                    角色选择器
                    <chara-filter v-on:filter="listenProps"/>
                    <div class="clearfixbox"></div>
                    <transition-group name="flip-list" tag="div" class="flexcontainer">
                        <chara-plate-img v-for="ele in charaShowDic" :key="ele.jname" :charaData="ele" @fatherclick="SetChara" />
                    </transition-group>
                </div>
                <div v-if="cur_select != -1 && cur_select % 3 == 1">
                    装备选择器
                    <equip-filter v-on:filter="listenProps"/>
                    <div class="clearfixbox"></div>
                    <transition-group name="flip-list" tag="div" class="flexcontainer">
                        <equip-plate-img v-for="ele in equipShowDic" :key="ele.jname" :equipData="ele" @fatherclick="SetEquip" />
                    </transition-group>
                </div>
            </div>
            <div id="teamInfo">
                <div>
                    <div class="thead">队伍编码</div>
                    <button @click="ImportHash">Import</button>
                    <button @click="ExportHash">Export</button>
                    <div>
                        <input ref="codeinput" type="textbox" placeholder="Please enter code" v-model="uid" style="width:100%;" />
                    </div>
                </div>
                <div>
                    <div class="thead">LEADER</div>
                    <div>{{ GetLeader() }}</div>
                </div>
                <div v-for="j in 3" :key="j">
                    <div class="thead">ABILITY {{ j }}</div>
                    <li class="mainab" v-for="(ele_m,index_m) in GetAblity(j)['main']" :key="'m'+index_m">{{ ele_m }}</li>
                    <li class="subab" v-for="(ele_s,index_s) in GetAblity(j)['sub']" :key="'s'+index_s">{{ ele_s }}</li>
                    <li class="eqab" v-for="(ele_e,index_e) in GetAblity(j)['equip']" :key="'e'+index_e">{{ ele_e }}</li>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import CharaFilter from '@/components/CharaFilter.vue';
import CharaPlateImg from '@/components/CharaPlateImg.vue';
import EquipFilter from '@/components/EquipFilter.vue';
import EquipPlateImg from '@/components/EquipPlateImg.vue';
var LZString = require('lz-string');
export default {
    name: 'simulator',
    data(){
        return{
            uid: '',
            mainhero:['','',''],
            subhero:['','',''],
            equip: ['','',''],
            cur_select: -1,
            filter: {
                star: [false,false,false,false,false],
                type: [false,false,false,false,false],
                job: [false,false,false,false,false]
            }
        }
    },
    created(){
        this.uid = this.$route.params.id;
        this.ImportHash();
    },
    computed:{
        charaShowDic: function(){
            return this.Func.FilterCharaDic(this.Common.wfData,this.filter);
        },
        equipShowDic: function(){
            return this.Func.FilterEquipDic(this.Common.eqData,this.filter);
        },
    },
    methods:{
        listenProps: function(childValue){
            this.filter = childValue;
        },
        ExportHash(){
            let arr = JSON.stringify({
                m: this.mainhero,
                s: this.subhero,
                e: this.equip
            })
            // let outstr1 = LZString.compressToBase64(arrjson);
            // console.log(outstr1);

            //let arr = this.mainhero.concat(this.subhero).concat(this.equip).join(',');
            // let outstr2 = LZString.compressToBase64(arr);
            // console.log(outstr2);
            this.uid = LZString.compressToBase64(arr);
            console.log(this.uid);
            
            // this.uid = btoa(encodeURIComponent(arrjson));
            
            this.$refs.codeinput.values = this.uid;
            this.$refs.codeinput.select();
            document.execCommand('copy');
        },
        ImportHash(){
            console.log(this.uid);
            if(this.uid != ''){
                try{
                    let jsondata = JSON.parse(LZString.decompressFromBase64(this.uid));
                    //let jsondata = JSON.parse(decodeURIComponent(atob(this.uid)));
                    //console.log(jsondata);
                    this.mainhero = jsondata.m;
                    this.subhero = jsondata.s;
                    this.equip = jsondata.e;
                }catch{
                    this.uid = '';
                    this.mainhero = ['','',''];
                    this.subhero = ['','',''];
                    this.equip = ['','',''];
                    // this.mainhero = ['シルティー','フィリア','アリサ'];
                    // this.subhero = ['ラムス','ミア','ムラクモ'];
                    // this.equip = ['ウコンバサラ','デスシックル','アストロラーベ'];
                }
            }
        },
        GetFullUrl(ele){
            var fname = this.Common.wfData[ele];
            if(fname == undefined) return;
            return '/static/full/' + fname.url +'_full.png';
        },
        GetEquipUrl(ele){
            var fname = this.Common.eqData[ele];
            if(fname == undefined) return;
            return '/static/equip/' + fname.url + '.png';
        },
        GetPixelUrl(ele){
            var fname = this.Common.wfData[ele];
            if(fname == undefined) return;
            return '/static/gif/' + fname.url +(this.hovered?'_special.gif':'.gif');
        },
        GetLeader(){
            var fname = this.Common.wfData[this.mainhero[0]];
            if(fname == undefined) return '';
            return fname.leader_info;
        },
        GetAblity(j){
            var res = { main:[],sub:[],equip:[]};
            var mainh = this.Common.wfData[this.mainhero[j-1]];
            if(mainh != undefined){
                res['main'] = [
                    mainh.ability1,mainh.ability2,mainh.ability3
                ];
            }
            var subh = this.Common.wfData[this.subhero[j-1]];
            if(subh != undefined){
                res['sub'] = [
                    mainh.ability1, mainh.ability2
                ];
            }
            var eq = this.Common.eqData[this.equip[j-1]];
            if(eq!=undefined){
                res['equip'] = [eq.effect_max];
            }
            return res;
        },
        SetChara(key){
            //console.log(key);
            if(this.cur_select == -1) return;
            let j = parseInt(this.cur_select/3);
            let k = this.cur_select % 3;
            if(k == 2){
                this.$set(this.subhero,j,key);
            }else{
                this.$set(this.mainhero,j,key);
            }
            this.cur_select = -1;
        },
        SetEquip(key){
            //console.log(key);
            if(this.cur_select == -1) return;
            let j = parseInt(this.cur_select/3);
            this.$set(this.equip,j,key);
            this.cur_select = -1;
        }
    },
    components: {
        CharaFilter,
        CharaPlateImg,
        EquipFilter,
        EquipPlateImg
    }
}
</script>

<style lang="scss">
#simulatorContent{
    vertical-align: top;

    #teamContent{
        display: inline-block;
        width: 600px;

        .heroslot{
            position: relative;
            display: inline-block;
            width: 160px;
            height: 300px;

            .whiteborder{
                border: 4px solid white;
                border-radius: 16px;
                box-sizing: content-box;
                overflow: hidden;
                transition: all 0.2s;

                &:hover{
                    border: 4px solid green;
                }
                &.green{
                    border: 4px solid green;
                }
            }

            .masked{
                filter: grayscale(100%);
            }

            .main{
                position: relative;
                width: 80px;
                height: 170px;
                margin-bottom: 5px;
                
                .fig {
                    position: absolute;
                    width: 750px;
                    height: 750px;
                    top: -110px;
                    left: -310px;
                }
            }
            .equip{
                position: absolute;
                top: 36px;
                left: 64px;
                width: 64px;
                height: 64px;

                .fig {
                    position: absolute;
                    width: 72px;
                    height: 72px;
                    top: -4px;
                    left: -4px;
                }
            }
            .sub{
                position: absolute;
                top: 118px;
                left: 64px;
                width: 64px;
                height: 80px;
                
                .fig {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    top: -80px;
                    left: -220px;
                }

            }

            .pixelBorder{
                position: relative;
                display: inline-block;
                height: 50px;
                width: 50px;
                z-index: 999;
                left: 15px;
                overflow: hidden;
                //background: white;

                &.low{
                    top: 30px;
                }
                
                .pixelImg{
                    position: absolute;
                    width: 512px;
                    height: 512px;
                    bottom: -244px;
                    left: -232px;
                }

            }
        }

    }

    #teamInfo{
        display: inline-block;
        vertical-align: top;
        width: 400px;
        margin-left: 30px;

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

        .mainab{
            background: #a3253633;
        }
        .subab{
            background: #2f60b233;
        }
        .eqab{
            background: #b2961433;
        }
    }



}
</style>