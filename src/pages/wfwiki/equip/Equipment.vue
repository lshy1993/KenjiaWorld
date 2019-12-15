<template>
<div id="equipAlbum" class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            装备一览
        </div>
        <equip-filter v-on:filter="listenProps"/>
        <div class="clearfixbox"></div>
        <transition-group name="flip-list" tag="div" class="flexcontainer">
            <equip-plate-img v-for="ele in equipShowDic" :key="ele.jname" :equipData="ele" @fatherclick="GetRouter" />
        </transition-group>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import EquipFilter from '@/components/EquipFilter.vue';
import EquipPlateImg from '@/components/EquipPlateImg.vue';

export default {
    name: 'wfequip',
    data(){
        return{
            debug: true,
            filter: {
                star: [false,false,false,false,false],
                type: [false,false,false,false,false]
            }
        }
    },
    computed: {
        equipShowDic: function(){
            var result = [];
            for(var key in this.Common.eqData){
                let ele = this.Common.eqData[key];
                result.push(ele);
            }
            // 过滤星级
            result = result.filter(this.checkStar);
            // 过滤属性
            result = result.filter(this.checkType);
            return result;
        }
    },
    methods:{
        listenProps: function(childValue){
            console.log('value changed from child');
            this.filter = childValue;
        },
        GetRouter(key){
            console.log('children click');
            this.$router.push('/wfwiki/equip/' + key);
        },
        checkStar(ele){
            let keyarr = {};
            for(var i in this.filter.star){
                if(this.filter.star[i]){
                    keyarr[parseInt(i)+1] = "1";
                }
            }
            if(Object.keys(keyarr).length==0) return true;
            return ele.rare in keyarr;
        },
        checkType(ele){
            let keyarr = {};
            var keys = ['火','水','雷','风','光','暗'];
            for(var i in this.filter.type){
                if(this.filter.type[i]){
                    keyarr[keys[i]] = "";
                }
            }
            if(Object.keys(keyarr).length==0) return true;
            return ele.type in keyarr;
        },
    },
    components: {
        EquipFilter,
        EquipPlateImg
    }
}
</script>

<style lang="scss">
#equipAlbum {
    //font-family: "Avenir", Helvetica, Arial, sans-serif;

}
</style>