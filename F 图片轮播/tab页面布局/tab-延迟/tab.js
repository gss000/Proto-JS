window.onload = function(){
    var index = 0;
    var timer = null;
    var _title = document.getElementById('title');
    var _content = document.getElementById('content');

    var lis = _title.getElementsByTagName('li'),
        divs = _content.getElementsByTagName('div');

    if(lis.length != divs.length) return;

    for(var i=0; i<lis.length; i++){
        var curlis = lis[i];
        curlis.id = i;//给li添加一个属性
        curlis.onmouseover = function(){
            var that = this;//用that来引用当前滑过的li
            //添加一个定时器，首先清除定时器
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
            //延迟半秒执行
            timer = setTimeout(function(){
                for(var j=0; j<lis.length; j++){
                    lis[j].className = '';
                    divs[j].style.display = 'none';
                }
                lis[that.id].className = 'select';
                divs[that.id].style.display = 'block';
            }, 500);

        }
    }


}
