<template>
<div id="charaAlbum">
    <chara-filter v-on:filter="listenProps"/>
    <div class="clearfixbox"></div>
    <transition-group name="flip-list" tag="div" class="container">
        <chara-plate-img v-for="ele in charaShowDic" :key="ele.jname" :charaData="ele" />
    </transition-group>
</div>
</template>

<script>
/* eslint-disable */
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

    .charaplate {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 220px;
        height: 110px;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #9E9E9E;
        box-shadow: 1px 1px 1px #C8C8C8;
        position: relative;
        display: inline-block;
    }
}
</style>