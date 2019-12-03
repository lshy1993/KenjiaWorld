<template>
<div class="inset-container">
    <div class="section whitebox">
        <div class="sectionhead">
            <router-link :to="'/wfwiki'">角色一览</router-link>/{{ charaData.jname }}
        </div>
        <table id="charaTable">
            <tr>
                <th rowspan="6">
                    <div>icon</div>
                    <span>{{ charaData.rare }}</span>
                </th>
                <td class="small">
                    {{ charaData.cname }}
                </td>
            </tr>
            <tr>
                <td>{{ charaData.jname }}</td>
            </tr>
            <tr>
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
            </tr>
            <tr>
                <td>
                    <div class="subcol">属性：{{ GetColor(charaData.color) }}</div>
                    <div class="subcol">职业：{{ charaData.job }}</div>
                </td>
            </tr>
            <tr>
                <th rowspan="2">SKILL</th>
                <td>{{ charaData.skill }}</td>
            </tr>
            <tr>
                <td>{{ charaData.skill_info }}</td>
            </tr>
            <tr>
                <th rowspan="2">LEADER</th>
                <td>{{ charaData.leader }}</td>
            </tr>
            <tr>
                <td>{{ charaData.leader_info }}</td>
            </tr>
            <tr>
                <th>ABILITY</th>
                <td>
                    <ul>
                        <li>{{ charaData.ability1 }}</li>
                        <li>{{ charaData.ability2 }}</li>
                        <li>{{ charaData.ability3 }}</li>
                        <li>{{ charaData.ability4 }}</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>RACE</th>
                <td>{{ charaData.race }}</td>
            </tr>
            <tr>
                <th>SEXUAL</th>
                <td>{{ charaData.sex }}</td>
            </tr>
            <tr>
                <th>CV</th>
                <td>{{ charaData.cv }}</td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
/* eslint-disable */
import charajson from '@/assets/wf.json'; 
export default {
    name: 'wfchara',
    data(){
        return{
            debug: true,
            charaData: {}
        }
    },
    created(){
        let id = this.$route.params.id;
        this.charaData = charajson[id];
    },
    methods:{
        GetColor(i){
            return ['火','水','雷','风','光','暗'][i-1];
        }
    },
    components: {
    }
}
</script>

<style lang="scss">
#charaTable{
    tr{
        height: 30px;
        vertical-align: top;
    }
    .small{
        font-size: 12px;
    }
    .subcol{
        display: inline-block;
        width: 50%;
    }
    th{
        min-width: 100px;
        text-align: left;
    }
}
</style>