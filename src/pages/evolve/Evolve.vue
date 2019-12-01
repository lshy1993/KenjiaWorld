<template>
<div class="fullScreen">
    <iframe ref="iframe" frameborder="no" border="0" marginwidth="0"
    marginheight="0" scrolling="no" width="100%" height="100%" :src="evolvegit"></iframe>
</div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Evolve',
    props: ['user'],
    data(){
        return {
            debug: false,
            //evolvegit: 'https://pmotschmann.github.io/Evolve',
            //evolvegit: 'http://localhost/',
            evolvegit: '/Evolve/',
            evolveWin: Object
        }
    },
    computed:{
        userLogined(){
            return this.user.logined;
        },
    },
    mounted(){
        this.debug = process.env.NODE_ENV == 'development';
        // 从服务器获取覆盖
        // this.evolveWin = this.$refs.iframe.contentWindow;
        // this.GetRemoteSave();
        this.$refs.iframe.contentWindow.onload = (event) => {
            console.log('iframe loaded');
            this.GetRemoteSave();
        };
    },
    destroyed() {
        this.UploadGame();
    },
    methods:{
        loginDone(){
            this.GetRemoteSave();
        },
        GetRemoteSave(){
            //var post = this.Func.GetPostObject('/evolve/',{});
            if(!this.userLogined){
                console.log('not login');
                return;
            }
            // 获取存档
            var _this = this;
            this.$http.get("/api/user/evolve").then((response)=>{
                var save = response.data;
                if(save === false){

                }else{
                    //console.log(save);
                    _this.LoadGame(save.result);
                }
            },(err)=>{
                // 未授权 需要登录
                console.log(err);
            });
        },
        LoadGame(savestr){
            console.log('set savefile to game');
            localStorage.setItem('evolved',savestr);
            this.$refs.iframe.contentWindow.location.reload();
        },
        UploadGame(){
            // 读取存档后上传
            var save = localStorage.getItem('evolved');
            if(this.userLogined){
                console.log('uploading');
                var post = this.Func.GetPostObject('/user/evolve/upload', { savedata: save });
                this.$http(post).then((response)=>{
                    console.log(response.data);
                },(err)=>{
                    // 未授权 需要登录
                    console.log(err);
                });
            }
        }
    },
    components:{
    }
}
</script>

<style lang="scss">
.fullScreen{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

</style>