window.onload = function(){
     waterFall('main', 'box');
    var dataInt = {
        'data':[
            {'src':"20.jpg"},
            {'src':"21.jpg"},
            {'src':"22.jpg"},
            {'src':"23.jpg"},
            {'src':"24.jpg"},
            {'src':"25.jpg"},
            {'src':"26.jpg"},
            {'src':"27.jpg"},
            {'src':"28.jpg"},
            {'src':"29.jpg"},
            {'src':"30.jpg"},
            {'src':"31.jpg"},
            {'src':"32.jpg"},
            {'src':"33.jpg"},
            {'src':"34.jpg"},
        ]
    };
    window.onscroll = function(){
        if(checkScroll){
            var _parent = document.getElementById('main');
            for(var i=0; i<dataInt.data.length; i++){
                var box = document.createElement('div');
                box.className = 'box';
                _parent.appendChild(box);
                var img = document.createElement('div');
                img.className = 'img';
                box.appendChild(img);
                var image = document.createElement('img');
                image.src = "images/" + dataInt.data[i].src;
                img.appendChild(image);
            }
            waterFall('main', 'box');
        }
    }

}

function waterFall(parent, box){
    var _parent = document.getElementById(parent);
    var _boxs = getcls(_parent, box);
    //计算整个页面显示的列数(页面宽/盒子宽)
    var boxW = _boxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / boxW);
    //设置main的宽
    _parent.style.cssText = 'width:' + boxW*cols + 'px;margin: 0 auto;';
    //存放每一列图片高度的数组
    var arr = [];
    for(var i=0; i<_boxs.length; i++){
        if(i<cols){
            arr.push(_boxs[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null, arr);
            var index = getminIndex(arr, minH);
            _boxs[i].style.position = 'absolute';
            _boxs[i].style.top = minH + 'px';
            _boxs[i].style.left = boxW * index + 'px';
            //最小高度的box,现在的高度就会随之增加
            arr[index] += _boxs[i].offsetHeight;
        }
    }
}

function getcls(parent, cls){
    //var oparent = document.getElementById(parent);
    var arr = [];
    var element = parent.getElementsByTagName("*");
    for(var i= 0; i<element.length; i++){
        if(element[i].className == cls){
            arr.push(element[i]);
        }
    }
    return arr;
}

function getminIndex(arr, val){
    for(var i in arr){
        if(arr[i] == val){
            return i;
        }
    }
}

function checkScroll(){
    var _parent = document.getElementById('main');
    var _boxs = getcls(_parent, 'box');
    var lastHeight = _boxs[_boxs.length - 1].offsetTop + _boxs[_boxs.length - 1].offsetHeight;
    var clientH = document.body.clientHeight || document.documentElement.clientHeight;
    var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
    return (clientH + scrollT > lastHeight)? true : false;
}