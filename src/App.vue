<template>
    <div id="app">
        <aside :class="['naviSide', userLogined?'wide':'']">
            <div class="loginBtn">
                <div v-if="!userLogined" @click="showLoginBox">登录</div>
                <div v-if="userLogined" @click="logOut">Logout</div>
            </div>
            <div v-if="userLogined" class="naviWrap">
                <div>头像 用户信息</div>
                <div class="naviLine"></div>
                <router-link class="naviLink" to="/">
                    <div style="font-size: 24px;">用户主页</div>
                </router-link>
            </div>
        </aside>
        <div v-if="loginOn & !userLogined" class="loginDiv" @mousedown="showLoginBox">
            <login-box @login="logIn" @signup="signUp"/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
/* eslint-disable */

import loginBox from './components/LoginBox.vue';
export default {
    name: 'app',
    data(){
        return{
            userLogined: false,
            debug: true,
            loginOn: false,
            userToken: '',
        }
    },
    created() {
        this.debug = process.env.NODE_ENV == 'development';
    },
    methods:{
        showLoginBox(){
            this.loginOn = !this.loginOn;
            document.body.classList = [this.loginOn?"hideScroll":""];
        },
        closeLoginBox(){
            alert('登陆成功');
            //_this.userToken = 'Bearer ' + response.data.data.body.token;
            // 将用户token保存
            this.loginOn = false;
            this.userLogined = true;
            document.body.classList = [this.loginOn?"hideScroll":""];
            var post = this.Func.GetPostObject('/user/info', {});
            this.$http(post).then((response)=>{
                console.log(response.data);
            });
        },
        logIn(formdata){
            var loginform = {
                username: formdata.username,
                password: this.Func.cryptPwd(formdata.password)
            }
            // 登陆验证
            var _this = this;
            var post = this.Func.GetPostObject('/user/login', loginform);
            this.$http(post).then((response)=>{
                console.log(response.data);
                _this.closeLoginBox();
            });
        },
        signUp(formdata){
            var signupform = {
                username: formdata.username,
                password: this.Func.cryptPwd(formdata.password)
            }
            // 注册
            //console.log(signupform);
            var post = this.Func.GetPostObject('/user/signup', signupform);
            var _this = this;
            this.$http(post).then((response)=>{
                console.log(response.data);
                console.log('注册成功');
                // 登录界面
                _this.closeLoginBox();
            });
        },
        logOut(){
            //var form = { username: this.user.name };
            var post = this.Func.GetPostObject('/user/logout',{});
            this.$http(post).then((response)=>{
                this.userLogined = false;
            })
        }
    },
    components: {
        loginBox
    }
}
</script>

<style lang="scss">

.mainContent {
    position: relative;
    margin-right: 0px;
    transition: all .3s;
    z-index: 1000;
    // min-height: 100%;

    &.wide {
        margin-right: 170px;
    }
}
.loginBtn {
    line-height: 50px;
}

.loginDiv {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,.4);
    z-index: 1020;
}

body {
    margin: 0;
    padding: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
}

img {
    width: 100%;
    height: 100%;
}
</style>
