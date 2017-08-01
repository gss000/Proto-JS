window.onload = function(){
    var timer= null;
    var index = 0;
    var _contain = document.getElementById('contain'),
        _imgul = document.getElementById('imgul'),
        _lis = _imgul.getElementsByTagName('li'),
        _btn = document.getElementById('btn'),
        _spans = _btn.getElementsByTagName('span'),
        _pre = document.getElementById('pre'),
        _next = document.getElementById('next');


    if(timer){
        timer = null;
    }
    animates();

    _contain.onmouseover = function(){
        clearInterval(timer);
    }
    _contain.onmouseout = animates;
    for(var i=0; i<_spans.length; i++){
        _spans[i].id = i;
        _spans[i].onmouseover = function(){
            mov(this.id);
        }
    }
    _next.onclick = function(){
        if(index == 4){
            index = -1;
            mov(index+1);
        }else{
            mov(index+1);
        }
    }
    _pre.onclick = function(){
        if(index == 0){
            index = 5;
            mov(index-1);
        }else{
            mov(index-1);
        }
    }

    function animates(){
        timer = setInterval(function(){
            index++;
            if(index >= _lis.length){
                index = 0;
            }
            mov(index);
        },2000);
    }

    function mov(curindex){
        _imgul.style.left = -960*curindex + 'px';
        for(var i=0; i<_spans.length; i++){
            _spans[i].className = '';
        }
        _spans[curindex].className = 'on';
        index = curindex;
    }

}
