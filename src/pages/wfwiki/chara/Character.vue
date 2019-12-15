<template>
<div id="charaAlbum" class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            角色一览
        </div>
        <chara-filter v-on:filter="listenProps"/>
        <div class="clearfixbox"></div>
        <transition-group name="flip-list" tag="div" class="flexcontainer">
            <chara-plate-img v-for="ele in charaShowDic" :key="ele.jname" :charaData="ele" @fatherclick="GetRouter" />
        </transition-group>
    </div>
</div>
</template>

<script>
/* eslint-disable */
//import charajson from '@/assets/wf3.json'; 
import CharaFilter from '@/components/CharaFilter.vue';
import CharaPlateImg from '@/components/CharaPlateImg.vue';

export default {
    name: 'wfchara',
    data(){
        return{
            debug: true,
            filter: {
                star: [false,false,false,false,false],
                type: [false,false,false,false,false],
                job: [false,false,false,false,false],
            }
        }
    },
    created(){

    },
    computed:{
        charaShowDic: function(){
            return this.Func.FilterCharaDic(this.Common.wfData,this.filter);
        }
    },
    methods:{
        listenProps: function(childValue){
            console.log('value changed from child');
            this.filter = childValue;
        },
        GetRouter(key){
            console.log('children click');
            this.$router.push('/wfwiki/chara/' + key);
        },
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
}
</style>