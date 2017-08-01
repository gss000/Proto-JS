window.onload = function(){
    var timer = null;
    var _title = document.getElementById('title');
    var _content = document.getElementById('content');
    var _li = _title.getElementsByTagName('li'),
        _div = _content.getElementsByTagName('div');
    var index = 0;

    for(var i=0; i<_li.length; i++){
        _li[i].id = i;
        _li[i].onmouseover = function(){
            clearInterval(timer);
            change(this.id);
        }
        _li[i].onmouseout = function(){
            timer = setInterval(autoplay, 1000);
        }
    }

    if(timer){
        clearInterval(timer);
        timer = null;
    }
    timer = setInterval(autoplay, 1000);

    function autoplay(){
        index++;
        if(index >= _li.length){
            index = 0;
        }
        change(index);
    }
    function change(curindex){
        for(var i=0; i<_li.length; i++){
            _li[i].className = '';
            _div[i].style.display = 'none';
        }
        _li[curindex].className = 'select';
        _div[curindex].style.display = 'block';
        index = curindex;
    }
}
