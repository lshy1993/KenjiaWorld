<template>
<div>
    <div id="maxBG">
        <img src="../../assets/tokyo.jpg">
    </div>
    <header id="topBar">
        <router-link to="/" id="topLogo">LOGO</router-link>
        <div id="topSearchBar">
            <input style="float:left;" >
            <div style="float:right;">搜索</div>
        </div>
        <div id="loginButton">登陆</div>
    </header>
    <div id="sidePanel">
        <div id="siteBox">
            <div>
                <div id="siteHead">
                    <img src="../../assets/still_unit_107731.png">
                </div>
                <div>
                    <div id="aboutBtn">关于网站</div>
                    <div id="linkBtn">友情连接</div>
                </div>
                <div id="iconWrap">
                    <div id="icon">
                        <img src="../../assets/logo.png" />
                    </div>
                </div>
            </div>
            <div id="siteInfo">测试</div>
        </div>
        <div id="tagBox">
            <span>Tags</span>
            <div>
                <div v-for="i in 4" :key="'tag'+i">{{ i }}</div>
            </div>
        </div>
    </div>
    <div id="resultPanel">
        <div id="resultWrap">
            <div v-for="j in 3" :key="'ba'+j" class="resultBox">
                <div class="resTitle">测试标题</div>
                <div class="resStar">⭐</div>
                <div class="resSubTitle">asdfenainslan</div>
                <div class="resFrom">from slajfeinfailjglag</div>
                <div class="resInfo">
                    <div>info:</div>
                    <div style="width: 80px;">文件大小</div>
                    <div style="width: 100px;">15.0GB</div>
                    <div style="width: 80px;">文件数量</div>
                    <div style="width: 40px;">2</div>
                    <div style="width: 80px;">创建时间</div>
                    <div>2014-10-10</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Result',
    data(){
        return {

        }
    }
}
</script>

<style scoped>
#maxBG{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
}
#topBar{
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    background: pink;
    text-align: left;
}
#topLogo{
    display: inline-block;
    width: 200px;
    color: white;
    font-weight: bold;
    font-size: 32px;
    line-height: 50px;
}
#topSearchBar{
    display: inline-block;
    width: 400px;
}
#topSearchBar > input{
    width: 300px;
}
#loginButton{
    display: block;
    position: absolute;
    right: 0;
}
#sidePanel{
    position: absolute;
    top: 50px;
    right: 0;
    width: 350px;
}
#siteBox{
    background: rgba(255,255,255,0.8);
}
#siteHead{
    height: 100px;
}
#siteInfo{
    padding: 20px;
    text-align: left;
    height: 60px;
}
#iconWrap{
    position: absolute;
    top: 0;
    width: 100%;
}
#icon{
    margin: auto;
    border-radius: 120px;
    width: 120px;
    height: 120px;
    background: white;
    overflow: hidden;
    vertical-align: text-bottom;
}
#aboutBtn{
    display: inline-block;
    vertical-align: bottom;
    width: 50%;
    background: purple;
}
#linkBtn{
    display: inline-block;
    vertical-align: bottom;
    width: 50%;
    background: darkgoldenrod;
}
#tagBox{
    color: white;
    background: rgba(255, 192, 203,0.5);
    height: 200px;
}
#resultPanel{
    margin-top: 50px;
    margin-right: 300px;
    overflow-x: hidden;
}
#resultWrap{
    width: 720px;
    margin: 0 auto;
}
.resultBox{
    position: relative;
    background: rgba(255,255,255,0.8);
    height: auto;
    margin-top: 50px;
    text-align: left;
    padding: 5px 5px 5px 35px;
}
.resTitle{
    color: darkolivegreen;
    font-size: 32px;
    font-weight: bold;
}
.resStar{
    position: absolute;
    top: 5px;
    right: 5px;
}
.resSubTitle{
    color: grey;
    margin-top: 5px;
    margin-bottom: 10px;
}
.resInfo > div{
    display: inline-block;
}
</style>
