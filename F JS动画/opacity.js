window.onload = opa;

function opa(){
    var oDiv = document.getElementById('div1');

    oDiv.onmouseover = function(){
        change(10, 100);
    }
    oDiv.onmouseout = function(){
        change(-10, 30);
    }
}

var alpha = 30;
var timer = null;
function change(iSpeed, iGoal){
    var oDiv = document.getElementById('div1');

    clearInterval(timer);
    timer = setInterval(function(){
        if(alpha == iGoal){
            clearInterval(timer);
        }else{
            alpha += iSpeed;
            oDiv.style.filter = 'alpha(opactiy('+alpha+'))';
            oDiv.style.opacity = alpha/100;
        }
    },30);
}