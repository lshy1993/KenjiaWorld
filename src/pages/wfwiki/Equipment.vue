<template>
<div id="charaAlbum" class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            装备一览
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
        }
    },
    methods:{
        listenProps: function(childValue){
            console.log('from child');
            this.filter = childValue;
        },
    },
    components: {
        CharaFilter,
        CharaPlateImg
    }
}
</script>

<style lang="scss">
</style>