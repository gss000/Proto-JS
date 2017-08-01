function getspan(obj){
    if(obj.nextSibling.nodeName != 'SPAN'){
        return getspan(obj.nextSibling);
    }else{
        return obj.nextSibling;
    }
}

function checkinfo(obj, info, fun, click){
    var sp = getspan(obj);
    obj.onfocus = function(){
        sp.innerHTML = info;
        sp.className = 'stats2';
    }
    obj.onblur = function(){
        if(fun(this.value)){
            sp.innerHTML = "√";
            sp.className = 'stats4';
        }else{
            sp.innerHTML = info;
            sp.className = 'stats3';
        }
    }

    if(click == 'click'){
        obj.onblur();
    }
}

window.onload = reg;

function reg(click){
    var stat = true;  //返回装填，提交数据时用到
    var username = document.getElementsByName('username')[0],
        password = document.getElementsByName('password')[0],
        checkpass = document.getElementsByName('checkpass')[0],
        email = document.getElementsByName('email')[0];

    checkinfo(username, "用户名长度在3-20之间", function(val){
        if(val.match(/^\S+$/) && val.length >= 3 && val.length <= 20){
            return true;
        }else{
            stat = false;
            return false;
        }
    }, click);

    checkinfo(password, "密码必须在6-20位之间", function(val){
        if(val.match(/^\S+$/) && val.length >=6 && val.length <= 20){
            return true;
        }else{
            stat = false;
            return false;
        }
    }, click);

    checkinfo(checkpass, "再次确认密码", function(val){
        if(val.match(/^\S+$/) && val.length >= 6 && val.length <= 20){
            return true;
        }else{
            stat = false;
            return false;
        }
    }, click);

    checkinfo(email, "请正确填写邮箱", function(val){
        if(val.match(/\w+@\w+\.\w/)){
            return true;
        }else{
            stat = false;
            return false;
        }
    }, click);

    return stat;
}