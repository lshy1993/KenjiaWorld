<template>
<div class="inset-container">
    <div class="section whitebox">
        <div id="indexContent">
            <div class="leftcontent">
                <div class="logo" @click="playAudio">
                    <img src="@/assets/logo_wf.png" />
                </div>
                <div @click="playAudio">欢迎来到弹射世界wiki(点我有惊喜)</div>
                <div id="mainContent">
                    <div class="thead">常见队伍配置</div>
                    <div class="teamrow" v-for="ele in teamList" :key="ele.uid">
                        <div class="namecol">{{ ele.info }}</div>
                        <router-link class="idcol" :to="{ name:'simulator', params: { id:ele.code } }">{{ ele.uid }}</router-link>
                        <div class="upcol">{{ ele.uploader }}</div>
                    </div>
                </div>
            </div>
            <div class="rightcontent">
                <div class="thead">TODAY</div>
                <div v-if="cday==0 || cday==2" class="banner">
                    <img src="@/assets/banner_red.png" />
                </div>
                <div v-if="cday==0 || cday==3" class="banner">
                    <img src="@/assets/banner_blue.png" />
                </div>
                <div v-if="cday==0 || cday==5" class="banner">
                    <img src="@/assets/banner_yellow.png" />
                </div>
                <div v-if="cday==0 || cday==4" class="banner">
                    <img src="@/assets/banner_green.png" />
                </div>
                <div v-if="cday==0 || cday==1" class="banner">
                    <img src="@/assets/banner_light.png" />
                </div>
                <div v-if="cday==0 || cday==6" class="banner">
                    <img src="@/assets/banner_dark.png" />
                </div>
                <div class="banner">
                    <img src="@/assets/banner_exp.png" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'buildingpage',
    data(){
        return{
            cday: 0,
            teamList:[
                {
                    info: '测试用风队',
                    uid: '85ac01bef0e61626cd6a9e6e494853f5',
                    code: 'N4IgtiBcDaKO0MhrhkGMMhihkD8MIA0JCrDCwVwyBFDFiIfoK0MIAutgM5SyCXDIAcMgnQwmD7DMds44PUMgI4Zq2AKYMQgMoZAzQyBnhkALDOUYlA4wys4gYYY+CEoVaAJhkC3DIzSBNhmoBfIA',
                    uploader: 'editor'
                },
                {
                    info: '肯定过不了70的水队',
                    uid: 'ab5f34df8e2cef4ae2ff77fe33e350ea',
                    code: 'N4IgtiBcDaKL0MgfhkNMMhjhhAGhIToZAlDIHoZBnhgxECuGBPQa4YQBdTAZylkCKGErYpwQ4YSnjBLhkCmGBDUwBTRiEBlDIGaGAoAWGQK0MvYoHGGLIHaGQMMMgeoYqmJlkATDIFuGXgkCbDDQC+QA',
                    uploader: 'editor'
                },
            ]
        }
    },
    created(){
        this.cday = this.$moment().weekday();
    },
    methods:{
        playAudio(){
            this.$emit('playAudio');
        }
    },
    components: {
    }
}
</script>

<style lang="scss">
#indexContent{
    position: relative;
    
    .leftcontent{
        display: inline-block;
        text-align: center;
        min-width: 400px;
        width: 60%;
        vertical-align: top;
        
        .logo{
            width: 400px;
            margin: auto;
        }
    }

    .rightcontent{
        display: inline-block;
        vertical-align: top;
        width: auto;
    }

    .banner{
        min-width: 200px;
        width: 400px;

        img{
            width: 100%;
        }
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

    #mainContent{
        text-align: left;
    }

    .teamrow{
        border: 1px dashed;
        border-radius: 15px;
        line-height: 40px;
        margin-bottom: 5px;
        padding-left: 20px;
        
        .namecol{
            display: inline-block;
            width: 200px;
        }
        .idcol{
            display: inline-block;
            width: 350px;
        }
        .upcol{
            display: inline-block;
        }
    }
}

</style>