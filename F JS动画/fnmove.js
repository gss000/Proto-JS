function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}

function move(obj, attr, iTarget, fn){
    //这儿的fn是回调函数，函数运行完之后再运行函数fn
    clearInterval(obj.timer);
    timer = setInterval(function(){
        //1.取当前元素的值
        var icur = 0;
        if(attr == 'opacity'){
            icur = Math.round(parseFloat(getStyle(obj, attr))*100);
        }else{
            icur = parseInt(getStyle(obj, attr));
        }
        //2.获取速度
        var speed = (iTarget - icur)/5;
        speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
        //3.停止，以及赋值
        if(icur == iTarget){
            clearInterval(timer);
            if(fn){
                fn();
                //fn看成是一个参数，最后调用这个参数就是运行这个回调函数。结束一项运动之后执行另一个运动
            }
        }else{
            if(attr == 'opacity'){
                obj.style.filter = 'alpha(opacity:'+icur + speed+')';
                obj.style.opacity = (icur + speed)/100;
            }else{
                obj.style[attr] = icur + speed +'px';
            }
        }
    }, 50);
}
