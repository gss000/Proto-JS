function getByClass(clsName, parent){
//封装函数，获取元素类名。通过类获取元素那么需要元素类名，可选它的父元素id
    var oParent = parent?document.getElementById(parent):document;
    //判断用户是否传入父元素ID则用ID没有则用document
    var eles = [];//取出的类名可能有很多，提前声明一个数组待会存放
    elements = oParent.getElementsByTagName('*');//取符合oParent的所有标签

    for(var i= 0; i<elements.length; i++){
        if(elements[i].className == clsName){//elements获取的类名假如等于传入的类名
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload = qdrag;

function qdrag(){
    var oTitle = getByClass('login-webqq-logo', 'loginPanel')[0];
    //获取要添加事件的元素给变量，因为封装的方法取到的是数组所以取第一个
    oTitle.onmousedown = fnDown;//点击移动
    var oClose = document.getElementById('ui-boxclose');
    oClose.onclick = function(){
        document.getElementById('loginPanel').style.display = 'none';
    }//关闭按钮

    var loginstate = document.getElementById('loginstate');
    var statelist = document.getElementById('loginStatePanel');
    var list = statelist.getElementsByTagName('li');
    var stateTxt = document.getElementById('login2qq-state-txt');
    var stateshow = document.getElementById('loginStateShow');
    loginstate.onclick = function(e){
        e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else if(e.cancelBubble){
            e.cancelBubble = true;
        }
        statelist.style.display = 'block';
    }//状态框及选择

    for(var i=0;i<list.length;i++){
        list[i].onmouseover = function(){
            this.style.background = 'gray';
        }
        list[i].onmouseout = function(){
            this.style.background = '#fff';
        }
        list[i].onclick = function(e){
            e = e || window.event;
            if(e.stopPropagation){
                e.stopPropagation();
            }else if(e.cancelBubble){
                e.cancelBubble = true;
            }
            var id = this.id;
            statelist.style.display = 'none';
            stateTxt.innerHTML = getByClass('stateSelect-text', id)[0].innerHTML;
            //前面的innnerHTML是替换用，后面的innerHTML是获取
            stateshow.className = '';
            stateshow.className = 'login-state-show ' + id;
        }
    }//鼠标滑过，离开，点击的效果
    document.onclick = function(){
        statelist.style.display = 'none';
    }
}

function fnDown(event){
    event = event || window.event;//浏览器兼容
    var oDrag = document.getElementById('loginPanel');

    var disx = event.clientX - oDrag.offsetLeft;
    var disy = event.clientY - oDrag.offsetTop;
    //disx和disy：光标到浏览器边缘的距离减去面板到浏览器的距离，得出光标到面板的距离
    document.onmousemove = function(event){
        //event事件对象,fnDown的事件对象是event所以这儿的和上面事件对象是同一个
        event = event || window.event;
        fnMove(event, disx, disy);//这儿传参
    }

    document.onmouseup = function (){
        document.onmousemove = null;
        document.onmouseup = null;
    }//鼠标松开事件

}

function fnMove(e, posx, posy){
    var oDrag = document.getElementById('loginPanel');
    var l = e.clientX - posx;
    var t = e.clientY - posy;
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    //兼容
    var maxW = winW - oDrag.offsetWidth;
    var maxH = winH - oDrag.offsetHeight;
    if(l<0){
        l = 0;
    }else if(l>maxW){
        l = maxW;
    }
    if(t<0){
        t = 0;
    }else if(t>maxH){
        t = maxH;
    }
    oDrag.style.left = l + 'px';
    oDrag.style.top = t + 'px';
}

