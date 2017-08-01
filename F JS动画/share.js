window.onload = share;

function share(){
    var oDiv = document.getElementById('div1');

    oDiv.onmouseover = function(){
        startmove(0);
    }
    oDiv.onmouseout = function(){
        startmove(-200);
    }
}

var timer = null;
function startmove(iTarget){
    var oDiv = document.getElementById('div1');
    clearInterval(timer);
        timer = setInterval(function(){
            var speed = (iTarget - oDiv.offsetLeft)/20;
            speed = speed >0 ? Math.ceil(speed):Math.floor(speed);
            if(oDiv.offsetLeft == iTarget){
                clearInterval(timer);
            }else{
                oDiv.style.left = oDiv.offsetLeft + speed + 'px';
            }
        }, 30);
}

