function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj, false)[attr];
    }
}

function startmove(obj, json, fn){

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var flag = true;
        for(var attr in json)
        {
        //1.取值
        var iCur = 0;
        if(attr == 'opacity'){
            iCur = Math.round(parseFloat(getStyle(obj, attr))*100);
        }else{
            iCur = parseInt(getStyle(obj, attr));
        }
            console.log(getStyle(obj, attr));
        //2.获取速度
        var speed = (json[attr] - iCur)/5;
        speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
        //3.停止计时器，以及运动
                if(iCur != json[attr]){
                    flag = false;
                    //不是所有的元素都到达相应的值那么这个flag是false并且继续执行，知道所有的元素完成对应值
                }
                if(attr == 'opacity'){
                    obj.style.filter = 'alpha(opacity:'+iCur + speed+')';
                    obj.style.opacity = (iCur + speed)/100;
                }else{
                    obj.style[attr] = iCur + speed + 'px';
                }
            }

        if(flag){
            //当循环出来所有的值都完成，然后把定时器取消，并且判断是否有回调函数
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    }, 30);

}
