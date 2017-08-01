window.onload = function(){
    var _container = document.getElementById('container'),
        _lis = _container.getElementsByTagName('li');

    for(var i=0; i<_lis.length; i++){
        var curli = _lis[i];
        curli.onmouseover = function(){
            for(var j=0; j<_lis.length; j++){
                _lis[j].className = '';
            }
            this.className = 'big';
        }

    }


}
