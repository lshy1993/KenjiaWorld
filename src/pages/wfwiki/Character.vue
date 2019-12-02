<template>
<div id="charaAlbum" class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            角色一览
        </div>
        <chara-filter v-on:filter="listenProps"/>
        <div class="clearfixbox"></div>
        <transition-group name="flip-list" tag="div" class="container">
            <chara-plate-img v-for="(ele,index) in charaShowDic" :key="ele.jname" :chara_id="index" :charaData="ele" />
        </transition-group>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import charajson from '@/assets/wf.json'; 
import CharaFilter from '@/components/CharaFilter.vue';
import CharaPlateImg from '@/components/CharaPlateImg.vue';

export default {
    name: 'wfchara',
    data(){
        return{
            debug: true,
            filter: {
                star: [false,false,false,false,false],
                job: [false,false,false,false,false],
                type: [false,false,false,false,false]
            },
        }
    },
    computed:{
        charaShowDic: function(){
            var result = [];
            for(var key in charajson){
                let ele = charajson[key];
                result.push(ele);
            }
            // 过滤星级
            result = result.filter(this.checkStar);
            // 过滤属性
            result = result.filter(this.checkType);
            // 过滤职业
            result = result.filter(this.checkJob);
            return result;
        }
    },
    methods:{
        listenProps: function(childValue){
            console.log('from child');
            this.filter = childValue;
        },
        checkStar(ele){
            let keyarr = {};
            var keys = ['★','★★','★★★','★★★★','★★★★★'];
            for(var i in this.filter.star){
                if(this.filter.star[i]){
                    keyarr[keys[i]] = "";
                }
            }
            if(Object.keys(keyarr).length==0) return true;
            return ele.rare in keyarr;
        },
        checkType(ele){
            let keyarr = {};
            for(var i in this.filter.type){
                if(this.filter.type[i]){
                    keyarr[i] = "";
                }
            }
            if(Object.keys(keyarr).length==0) return true;
            return ele.color in keyarr;
        },
        checkJob(ele){
            let keyarr = [];
            var keys = ['格斗','剑士','射击','辅助','特殊'];
            for(var i in this.filter.job){
                if(this.filter.job[i]){
                    keyarr[keys[i]] = "";
                }
            }
            if(Object.keys(keyarr).length==0) return true;
            return ele.cv in keyarr;
        }
    },
    components: {
        CharaFilter,
        CharaPlateImg
    }
}
</script>

<style lang="scss">
#charaAlbum {
    //font-family: "Avenir", Helvetica, Arial, sans-serif;
    .container {
        display: flex;
        flex-wrap: wrap;
    }

}
</style>