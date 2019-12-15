<template>
    <div id="app">
        <aside :class="['userSide', sideOn?'wide':'']">
            <div class="hideBtn" @click="sideOn=!sideOn">
                <span>{{ sideOn ? "→" : "←" }}</span>
            </div>
            <div class="naviWrap">
                <div v-if="!userLogined">
                    <div>登陆后可使用更多功能</div>
                    <div class="naviLine"></div>
                    <div v-if="serverOn" class="loginBtn" @click="showLoginBox">登录</div>
                    <div v-if="!serverOn" class="loginBtn">服务器维护中</div>
                </div>
                <div v-if="userLogined">
                    <div>头像 用户信息</div>
                    <div class="naviLine"></div>
                    <router-link class="naviLink" to="/">
                        <div style="font-size: 24px;">MoeLink</div>
                    </router-link>
                    <div class="naviLine"></div>
                    <div class="loginBtn" @click="logOut">Logout</div>
                </div>
            </div>
        </aside>
        <div v-if="loginOn & !userLogined" class="loginDiv" @mousedown="showLoginBox">
            <login-box @login="logIn" @signup="signUp"/>
        </div>
        <router-view ref="mainPage" :user="user"></router-view>
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
            sideOn: false,
            serverOn: false,
            user: {
                userinfo: {},
                logined: false
            }
        }
    },
    computed:{
        userLogined(){
            return this.user.logined;
        },
    },
    created() {
        this.debug = process.env.NODE_ENV == 'development';
        this.checkServer();
    },
    mounted(){
        this.initLoginStatus();
    },
    methods:{
        checkServer(){
            let url = this.Func.GetApi('/check');
            this.$http.get(url).then((response)=>{
                console.log(response.data);
                if(response.data === true){
                    this.serverOn = true;
                }
            },(err)=>{
                console.log(err);
                this.serverOn = false;
            });
        },
        showLoginBox(){
            this.loginOn = !this.loginOn;
            document.body.classList = [this.loginOn?"hideScroll":""];
        },
        openUserPanel(){
            this.loginOn = false;
            this.user.logined = true;
            document.body.classList = [this.loginOn?"hideScroll":""];
        },
        initLoginStatus(){
            var validtime = localStorage.getItem("validtime");
            if(!validtime || this.$moment().isAfter(validtime)){
                // 不存在或超时 需要重新登录
                this.removeUserInfo();
                return;
            }
            // 在时间内 检测session状态
            //var post = this.Func.GetPostObject('/user/session', {});
            //this.$http(post).then((response)=>
            let url = this.Func.GetApi('/user/session')
            this.$http.post(url).then((response)=>{
                if(response.data === 'valid'){
                    // 直接设置已登录
                    //console.log(response.data);
                    this.openUserPanel();
                }else{
                    console.log(response.data);
                }
            },(err)=>{
                // 需要重新登录
                this.removeUserInfo();
            });
        },
        getUserInfo(){
            //var post = this.Func.GetPostObject('/user/info', {});
            //this.$http(post).then((response)=>{
            let url = this.Func.GetApi('/user/info')
            this.$http.post(url).then((response)=>{
                console.log(response.data);
                // 设置用户信息
                //this.user = response.data;
            });
        },
        logIn(formdata){
            // 加密
            var loginform = {
                username: formdata.username,
                password: this.Func.cryptPwd(formdata.password)
            }
            // 登陆验证
            var _this = this;
            //var post = this.Func.GetPostObject('/user/login', loginform);
            //this.$http(post).then((response)=>{
            this.$http.post('api/user/login',loginform).then((response)=>{
                // 成功登录
                _this.loginDone();
            },(err)=>{
                // 密码错误
                _this.loginError();
            });
        },
        loginDone(){
            // 成功登录的部分
            // alert('登陆成功');
            // 将用户信息保存localstorage
            localStorage.setItem('validtime', this.$moment().add(7,'d').format());
            // localStorage.setItem('user', loginform.username);
            // localStorage.setItem('pwd', loginform.password);
            this.getUserInfo();
            this.openUserPanel();
            this.$refs.mainPage.loginDone();
        },
        loginError(){
            // 失败部分
            alert('密码错误');
        },
        signUp(formdata){
            var signupform = {
                username: formdata.username,
                password: this.Func.cryptPwd(formdata.password)
            }
            // 注册
            var _this = this;
            // var post = this.Func.GetPostObject('/user/signup', signupform);
            // this.$http(post).then((response)=>{
            let url = this.Func.GetApi('/user/signup')
            this.$http.post(url,signupform).then((response)=>{
                //console.log(response.data);
                console.log('注册成功');
                // 登录界面
                _this.closeLoginBox();
            });
        },
        logOut(){
            var _this = this;
            // var post = this.Func.GetPostObject('/user/logout',{});
            // this.$http(post).then((response)=>{
            let url = this.Func.GetApi('/user/logout')
            this.$http.post(url).then((response)=>{
                _this.removeUserInfo();
            });
            //测试是否登出
            //this.getUserInfo();
        },
        removeUserInfo(){
            this.user.logined = false;
            localStorage.removeItem('validtime');
            // localStorage.removeItem('user');
            // localStorage.removeItem('pwd');
        }
    },
    components: {
        loginBox
    }
}
</script>

<style lang="scss">
// .mainContent {
//     position: relative;
//     margin-right: 0px;
//     transition: all .3s;
//     z-index: 1000;
//     // min-height: 100%;

//     &.wide {
//         margin-right: 170px;
//     }
// }

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

</style>
