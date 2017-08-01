window.onload = function(){
    var _backtop = document.getElementById('backtop');

    _backtop.onclick = function(){
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    checkposition(_backtop);

    var addEvent = function(obj, event, fn){
        if(obj.addEventListener){
            obj.addEventListener(event, fn, false);
        }else if(obj.attachEvent){
            obj.attachEvent('on'+event, fn);
        }
    }

    function checkposition(obj){
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollHeight<2000){
            obj.style.display = 'none';
        }else{
            obj.style.display = 'block';
        }
    }

    addEvent(window, 'scroll', function(){
        checkposition(_backtop);
    });
}


