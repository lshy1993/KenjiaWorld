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
        url = "/api"
    }
    return url + path;
}

function GetPostObject(url,data){
    //url = GetApi(url);
    console.log(url);
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-Type': 'multipart/form-data',
            //'Access-Control-Allow-Origin': '*'
        },
        withCredentials: false,
        data: qs.stringify(data),
        url
    };
    return options;
}

function GetGetObject(url,data){
    //url = GetApi(url);
    console.log(url);
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Access-Control-Allow-Origin': '*'
        },
        withCredentials: false,
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
    //console.log('原始密码：%s', password);
    //console.log('加盐后的密码：%s', saltPassword);
    var sha256 = crypto.createHash('sha256');
    var result = sha256.update(saltPassword).digest('hex');
    //console.log('密文：%s', result);
    return result;
}

function FilterCharaDic(wfData,filter){
    var result = [];
    for(var key in wfData){
        let ele = wfData[key];
        result.push(ele);
    }

    function checkStar(ele){
        let keyarr = {};
        for(var i in filter.star){
            if(filter.star[i]){
                keyarr[parseInt(i)+1] = "1";
            }
        }
        if(Object.keys(keyarr).length==0) return true;
        return ele.rare in keyarr;
    }
    function checkType(ele){
        let keyarr = {};
        var keys = ['火','水','雷','风','光','暗'];
        for(var i in filter.type){
            if(filter.type[i]){
                keyarr[keys[i]] = "";
            }
        }
        if(Object.keys(keyarr).length==0) return true;
        return ele.type in keyarr;
    }
    function checkJob(ele){
        let keyarr = [];
        var keys = ['格斗','剑士','射击','辅助','特殊'];
        for(var i in filter.job){
            if(filter.job[i]){
                keyarr[keys[i]] = "";
            }
        }
        if(Object.keys(keyarr).length==0) return true;
        return ele.job in keyarr;
    }

    // 过滤星级
    result = result.filter(checkStar);
    // 过滤属性
    result = result.filter(checkType);
    // 过滤职业
    result = result.filter(checkJob);
    return result;
}

function FilterEquipDic(eqData,filter){
    var result = [];
    for(var key in eqData){
        let ele = eqData[key];
        result.push(ele);
    }

    function checkStar(ele){
        let keyarr = {};
        for(var i in filter.star){
            if(filter.star[i]){
                keyarr[parseInt(i)+1] = "1";
            }
        }
        if(Object.keys(keyarr).length==0) return true;
        return ele.rare in keyarr;
    }
    function checkType(ele){
        let keyarr = {};
        var keys = ['火','水','雷','风','光','暗'];
        for(var i in filter.type){
            if(filter.type[i]){
                keyarr[keys[i]] = "";
            }
        }
        if(Object.keys(keyarr).length==0) return true;
        return ele.type in keyarr;
    }

    // 过滤星级
    result = result.filter(checkStar);
    // 过滤属性
    result = result.filter(checkType);
    return result;
}

export default {
    ranBG, GetApi, GetPostObject,GetGetObject, cryptPwd,
    FilterCharaDic, FilterEquipDic
}