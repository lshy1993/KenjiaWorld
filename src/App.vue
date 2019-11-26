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
                    <div v-if="sideOn" style="font-size: 24px;">用户主页</div>
                </router-link>
            </div>
        </aside>
        <div v-if="loginOn & !userLogined" class="loginDiv" @click="showLoginBox">
            <login-box @login="logIn"/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
var crypto = require('crypto');
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
            this.hideScroll();
        },
        hideScroll(){
            document.body.classList = [this.loginOn?"hideScroll":""];
        },
        logIn(){
            if (this.loginForm.username === '' || this.loginForm.password === '') {
                alert('账号或密码不能为空');
            }else{
                var loginform = {
                    username: this.loginForm.username,
                    password: this.cryptPwd(this.loginForm.password)
                }
                // 登陆验证
                var url = this.Func.GetApi('/user/login');
                var _this = this;
                this.$http.post(url,loginform).then((response)=>{
                    console.log(response.data);
                    _this.userToken = 'Bearer ' + response.data.data.body.token;
                    // 将用户token保存
                    _this.hideScroll();
                    _this.loginOn = false;
                    _this.userLogined = true;
                    alert('登陆成功');
                });
            }
        },
        logOut(){
            this.userLogined = false;
        },
        cryptPwd(password) {
            var salt = "kusuharaui"
            // 密码“加盐”
            var saltPassword = password + ':' + salt;
            console.log('原始密码：%s', password);
            console.log('加盐后的密码：%s', saltPassword);
            // 加盐密码的md5值
            var md5 = crypto.createHash('md5');
            var result = md5.update(saltPassword).digest('hex');
            console.log('加盐密码的md5值：%s', result);
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
