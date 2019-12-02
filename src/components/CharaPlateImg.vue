<template>
<div class="clearfix" @mouseover="hovered=true" @mouseleave="hovered=false">
    <router-link tag="div" class="charaplate" :to="getrouter">
        <div>
            <img class="iconImg" style="width:100%" :src="iconurl" />
        </div>
        <div>
            <img class="typeImg" style="width:100%" :src="typeurl" />
        </div>
        <!--img class="pixel" style="width:100%" :src="pixelurl" /-->
        <div id="stardiv">
            {{ charaData.rare }}
        </div>
        <div id="charanamediv">
            {{ charaData.jname }}
        </div>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'CharaPlateImg',
    props: ['chara_id','charaData'],
    data(){
        return{
            hovered: false
        }
    },
    computed: {
        iconurl: function(){
            return '/static/img/wf/unit_plate_' + this.chara_id + '.png';
        },
        typeurl: function(){
            let typeid = parseInt(this.charaData.type);
            return '/static/img/wf/'+typeid+'.png';
        },
        getrouter: function(){
            return '/wfwiki/chara/' + this.chara_id;
        },
        charaName: function(){
            return this.charaData['unit_name'];
        },
        charaKana: function(){
            let chara_id = parseInt(this.charaData['unit_id']/100);
            return this.Translation.zh_unit_name[chara_id];
            //return this.charaData['kana'];
        }
    },
    methods: {
        
    }


}
</script>

<style lang="scss">
.charaplate{
    display: flex;
    //display: inline-block;
    justify-content: space-around;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #9E9E9E;
    box-shadow: 1px 1px 1px #C8C8C8;
    position: relative;
    

    width: 80px;
    height: 110px;

    font-size: 16px;
    font-weight: bolder;
    text-shadow: #000 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#1d1515 0 1px 0;
    color: white;

    #stardiv{
        position: absolute;
    }

    #charanamediv{
        position: absolute;
        bottom: 20px;
        right: 5px;
    }

    #charakanadiv{
        position: absolute;
        bottom: 0px;
        right: 5px;
    }
} 



</style>