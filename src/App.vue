<template>
    <div id="app">
        <aside :class="['naviSide', userLogined?'wide':'']">
            <div class="loginBtn">
                <div v-if="!userLogined" @click="showLoginBox">登录</div>
                <div v-if="userLogined" @click="logOut">Logout</div>
            </div>
            <div v-if="User.logined" class="naviWrap">
                <div>头像 用户信息</div>
                <div class="naviLine"></div>
                <router-link class="naviLink" to="/">
                    <div style="font-size: 24px;">用户主页</div>
                </router-link>
            </div>
        </aside>
        <div v-if="loginOn & !User.logined" class="loginDiv" @mousedown="showLoginBox">
            <login-box @login="logIn" @signup="signUp"/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
/* eslint-disable */
import User from './js/user';
import loginBox from './components/LoginBox.vue';
export default {
    name: 'app',
    data(){
        return{
            debug: true,
            loginOn: false,
            
        }
    },
    computed:{
        userLogined(){
            return this.User.logined;
        },
        currentUser(){
            return this.User.userinfo;
        },
    },
    created() {
        this.debug = process.env.NODE_ENV == 'development';
    },
    mounted(){
        this.initLoginInfo();
    },
    methods:{
        showLoginBox(){
            this.loginOn = !this.loginOn;
            document.body.classList = [this.loginOn?"hideScroll":""];
        },
        closeLoginBox(){
            this.loginOn = false;
            this.User.logined = true;
            console.log(this.User.logined);
            console.log(this.userLogined);
            document.body.classList = [this.loginOn?"hideScroll":""];
            this.getUserInfo();
        },
        initLoginInfo(){
            var validtime = localStorage.getItem("validtime");
            if(!validtime){
                // 不存在
            }else if(this.$moment().isAfter(validtime)){
                // 超时需要重新登录
                this.logOut();
            }else{
                // 在时间内 再次获取session
                let loginform = {
                    username: localStorage.getItem('user'),
                    password: localStorage.getItem('pwd')
                }
                this.loginPost(loginform);
            }
        },
        getUserInfo(){
            var post = this.Func.GetPostObject('/user/info', {});
            this.$http(post).then((response)=>{
                console.log(response.data);
                // 设置用户信息
                //this.User = response.data;
            });
        },
        logIn(formdata){
            // 加密
            var loginform = {
                username: formdata.username,
                password: this.Func.cryptPwd(formdata.password)
            }
            this.loginPost(loginform);
        },
        loginPost(loginform){
            // 登陆验证
            var _this = this;
            var post = this.Func.GetPostObject('/user/login', loginform);
            this.$http(post).then((response)=>{
                //console.log(response.data);
                // alert('登陆成功');

                _this.closeLoginBox();
                var data = response.data;
                // 将用户信息保存localstorage
                localStorage.setItem('user', loginform.username);
                localStorage.setItem('pwd', loginform.password);
                localStorage.setItem('validtime', this.$moment().add(2,'d').format());
            });
        },
        signUp(formdata){
            var signupform = {
                username: formdata.username,
                password: this.Func.cryptPwd(formdata.password)
            }
            // 注册
            var post = this.Func.GetPostObject('/user/signup', signupform);
            var _this = this;
            this.$http(post).then((response)=>{
                //console.log(response.data);
                console.log('注册成功');
                // 登录界面
                _this.closeLoginBox();
            });
        },
        logOut(){
            var post = this.Func.GetPostObject('/user/logout',{});
            this.$http(post).then((response)=>{
                this.User.logined = false;
                localStorage.removeItem('user');
                localStorage.removeItem('pwd');
                localStorage.removeItem('validtime');
            });
            //this.getUserInfo();
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
