window.onload = fnchange;


function fnchange() {
    var list = document.getElementsByTagName('li');
    for (var i = 0; i < list.length; i++) {
        list[i].alpha = 30;
        list[i].onmouseover = function () {
            startMove(this, 'width', 240);  //修改传入的参数来设定样式修改的任意值
            startColor(this, 100);
        }
        list[i].onmouseout = function () {
            startMove(this, 'width', 200);
            startColor(this, 30);
        }
    }

//var timer = null; 这儿不用公用的定时器，使用不同对象的定时器就可以解决对象抢定时器的问题了
    function startMove(obj, attr, iTarget) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var icur = parseInt(getStyle(obj, attr));
            //当元素添加边框或者其他样式的时候offsetwidth就会出现bug所以用getstyle这个方法来解决
            var speed = (iTarget - icur) / 5;
            //obj.offsetWidth 这儿原本的对象属性
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (icur != iTarget) {
                obj.style[attr] = icur + speed + 'px';
                //obj.style.width == obj.style['width'] 可以将这个width看成是变量，这样就可以实现任意值的变化
            } else {
                clearInterval(obj.timer);
            }
        }, 50);
    }

    function startColor(obj, iTarget1) {
        clearInterval(obj.time);
        obj.time = setInterval(function () {
            var ispeed = 0;
            if (obj.alpha < iTarget1) {
                ispeed = 10;
            } else {
                ispeed = -10;
            }
            if (obj.alpha == iTarget1) {
                clearInterval(obj.time);
            } else {
                obj.alpha += ispeed;
                obj.style.filter = 'alpha(opacity:'+obj.alpha +')';
                obj.style.opacity = obj.alpha/100;
            }
        }, 50);
    }

    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj, false)[attr];
        }
    }//获取样式

}
