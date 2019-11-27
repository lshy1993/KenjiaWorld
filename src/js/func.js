import qs from 'qs';
var crypto = require('crypto');

function ranBG(){
    let random = Math.floor(Math.random()*(80)+1001);
    let file='/static/images/still_unit_'+random+'31.png';
    return 'url('+file+')';
}

function GetApi(path){
    //var url = "https://api.luckymiao.site/"
    var url = "https://api.liantui.moe"
    if(process.env.NODE_ENV == 'development'){
        url = "http://192.168.1.5:3000"
    }
    return url + path;
}

function GetPostObject(url,data){
    url = GetApi(url);
    //console.log(url);
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Type': 'multipart/form-data',
            //'Access-Control-Allow-Origin': '*'
        },
        data: qs.stringify(data),
        url
    };
    return options;
}

function cryptPwd(password) {
    var salt = "kusuharaui";
    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    var saltPassword = md5.update(password).digest('hex')+':'+salt;
    console.log('原始密码：%s', password);
    console.log('加盐后的密码：%s', saltPassword);
    var sha256 = crypto.createHash('sha256');
    var result = sha256.update(saltPassword).digest('hex');
    console.log('密文：%s', result);
    return result;
}

export default {
    ranBG, GetApi, GetPostObject, cryptPwd
}