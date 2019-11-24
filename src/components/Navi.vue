<template>
<div id="naviContent">
    <div id="bg">
        <img src="../assets/wallhaven-wy31gr.png" />
    </div>
    <div id="countDownBox">
        <div id="barFore" :style="barvalue"></div>
        <span>倒计时{{  parseInt(30-ttime/1000) }}后自动进入moelink</span>
    </div>
    <div id="mainContent">
        <div id="logoBox">
            <div id="logo">
                <router-link to="/home" >MoeLink</router-link>
            </div>
            <div id="underline" class="lineBox floatBox"></div>
        </div>
        <div id="metroBox">
            <a v-for="(link,index) in navis" :key="index" :href=link.url>
                <div class="itemBox noselect rect200">
                    <div class="boxBackground">{{link.img}}</div>
                    <div class="title">{{link.text}}</div>
                    <div class="hidden">{{link.subtext}}</div>
                </div>
            </a>
        </div>
        <div id="footerBox">
            <a :href=sflink[0]>
                <div class="circleBox noselect" :to=sflink[0]>
                    <div class="title">Site</div>
                </div>
            </a>
            <a :href=sflink[1]>
                <div class="circleBox noselect" :to=sflink[1]>
                    <div class="title">Blog</div>
                </div>
            </a>
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'NaviPage',
    data(){
        return {
            ttime: 0,
            jumpsec: 30,
            navis:[
                {
                    text: 'AlphaSoul',
                    subtext: '人工智障点炮机',
                    img: '',
                    url: 'https://alphasoul.moelink.site',
                },
                {
                    text: 'Envole',
                    subtext: '进化联机版',
                    img: '',
                    url: 'https://envole.moelink.site',
                },
                {
                    text: 'Re:dive Wiki',
                    subtext: '公主链接百科',
                    img: '',
                    url: 'https://pcrwiki.moelink.site',
                },
                {
                    text: 'LianaiYuTuili',
                    subtext: '恋爱与推理',
                    img: '',
                    url: 'https://liantui.moe',
                },
            ],
            sflink:[
                'https://luckymiao.site',
                'https://blog.luckymiao.site',
                'https://forums.luckumiao.site'
            ]
        }
    },
    created(){
        var _this = this;
        return;
        setInterval(()=>{
            _this.ttime += 100;
            //console.log(_this.ttime);
            if(_this.ttime>=1000*_this.jumpsec){
                clearInterval(0);
                // jump
                this.$router.push({path:'/home'});
            }
        },100)
    },
    computed:{
        barvalue:function(){
            return 'width:'+this.ttime/10/this.jumpsec+'%';
        }
    },
    methods:{
            
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#naviContent{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.678);
    color: white;
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    flex-direction: column;
}
#bg{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    //background-image: url(../assets/wallhaven-wy31gr.png);
    filter: blur(4px);
}
#countDownBox{
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 20px;
    background: skyblue;
    text-align: center;

    span{
        width: 100%;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;
    }

    #barFore{
        background: yellowgreen;
        width: 100%;
        height: 20px;
    }
}
#mainContent{
    position: relative;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.378);
}
#logoBox{
    width: 100%;
    margin-top: 40px;

    &:hover{
        #logo{
            text-shadow: 2px 2px black;
        }
    }

    #logo{
        font-size: 120px;
        vertical-align: baseline;
        transition: 0.5s ease-in-out;
    }
    #underline{
        background: white;
        height: 2px;
        width: 100%;
        margin-bottom: 20px;
        transition: 0.5s ease-in-out;
    }
}
#metroBox{
    align-content: center;
    //width: 400px;
    height: auto;
    margin: auto;
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    flex-direction: column;

    .itemBox{
        position: relative;
        display: inline-block;
        border: 1px solid white;
        box-shadow: 1px 1px gray;
        align-content: center;
        vertical-align: middle;
        border-radius: 5px;
        margin: 10px;
        overflow: hidden;

        &:hover{
            .title{
                line-height: 50px;
            }
            .hidden{
                opacity: 1;
            }
        }
        
        .title{
            line-height: 100px;
            font-size: 20px;
            transition: 0.5s ease-in-out;
            //border: 1px solid white;
        }
        .hidden{
            line-height: 50px;
            opacity: 0;
            transition: 0.5s ease-in-out;
        }
    }
    .rect200{
        width: 200px;
        height: 100px;
        //line-height: 100px;
    }
    .rect100{
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
}
#footerBox{
    position: absolute;
    bottom: 0;
    text-align: center;
    vertical-align: middle;
    text-align: center;

    .circleBox{
        display: inline-block;
        border: solid 1px white;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin: 10px;
        transition: 0.5s ease-in-out;
        overflow: hidden;

        &:hover{
            transform: rotate(30deg);

            .title{
                opacity: 0.8;
            }
        }

        .title{
            transition: 0.5s ease-in-out;
            font-size: 24px;
            opacity: 1;
            line-height: 100px;
        }
    }
}
.floatBox{
    display: inline-block;
}
.lineBox{
    height: 10px;
    background: white;
}
.noselect{
    user-select: none;
}
a{
    text-decoration: none;
    color: white;
}
.circleBoxL{
    display: inline-block;
    border: solid 1px white;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    vertical-align: middle;
}
</style>
