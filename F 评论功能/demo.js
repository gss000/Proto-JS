window.onload = function() {
    var _list = document.getElementById('list'),
        _box = _list.children;
    var timer = null;

    //点击事件
    for(var i=0; i<_box.length;i++){
        _box[i].onclick = function(e){
            e = e || window.event;
            var el = e.el || e.srcElement;
            switch (el.className){
                //关闭
                case 'close':
                    removChild(el.parentNode);
                    break;
                //点赞
                case 'praise':
                    praiseBox(el.parentNode.parentNode.parentNode, el);
                    break;
                //回复按钮灰色
                case 'btn btn-off':
                    clearTimeout(timer);
                    break;
                //回复按钮蓝色
                case 'btn':
                    reback(el.parentNode.parentNode.parentNode);
                    break;
                //回复点赞
                case 'comment-praise':
                    repraise(el);
                    break;
                //删除回复
                case 'comment-operate':
                    reoperate(el);
                    break;
            }
        }
        //输入框功能
        var textArea = _box[i].getElementsByClassName('comment')[0];
        textArea.onfocus = function(){
            this.parentNode.className = 'text-box text-box-on';
            this.value = this.value == '评论...' ? '' : this.value;
            this.onkeyup();
        }
        textArea.onblur = function(){
            var that = this;
            timer = setTimeout(function(){
                if(that.value == ''){
                    that.parentNode.className = 'text-box';
                    that.value = '评论...';
                }
            }, 300);
        }
        //字数/回复显示
        textArea.onkeyup = function(e){
            var len = this.value.length;
            var p = this.parentNode;
            var btn = p.children[1];
            var word = p.children[2];
            if(len == 0 || len > 140){
                btn.className = 'btn btn-off';
            }else{
                btn.className = 'btn';
            }
            word.innerHTML = len + '/140';
        }
    }
    //删除
    function removChild(node){
        node.parentNode.removeChild(node);
    }
    //点赞
    function praiseBox(box, el){
        var praiseTotal = box.getElementsByClassName('praises-total')[0];
        var oldTotal = parseInt(praiseTotal.getAttribute('total'));
        var txt = el.innerHTML;
        var newTotal;
        if(txt == '赞'){
            newTotal = oldTotal + 1;
            praiseTotal.setAttribute('total', newTotal);
            praiseTotal.innerHTML = newTotal == 1 ? '我觉得很赞' : '我和'+ oldTotal + '个人觉得很赞';
            el.innerHTML = '取消赞';
        }else{
            newTotal = oldTotal - 1;
            praiseTotal.setAttribute('total', newTotal);
            praiseTotal.innerHTML = newTotal == 0 ? '' : newTotal + '个人觉得很赞';
            el.innerHTML = '赞';
        }
        praiseTotal.style.display = (newTotal == 0) ? 'none' : 'block';
    }
    //发表评论
    function reback(box){
        var textArea = box.getElementsByTagName('textarea')[0];
        var commentlist = box.getElementsByClassName('comment-list')[0];
        var div = document.createElement('div');
        div.className = 'comment-box clearfix';
        div.setAttribute('user', 'self');
        div.innerHTML = '<img class="myhead" src="img/2.jpg" alt=""/>'+
            '<div class="comment-content">'+
            '<p class="comment-txt"><span class="user">我:</span>'+ textArea.value +'</p>'+
            '<p class="comment-time">'+
            getTime() +
            '<a href="#" class="comment-praise" total="0" my="0">赞</a>'+
            '<a href="#" class="comment-operate">删除</a>'+
            '</p></div>';
        commentlist.appendChild(div);
        textArea.value = '';
        textArea.onblur();
    }
    //获得时间
    function getTime(){
        var curtime = new Date(),
            y = curtime.getFullYear(),
            m = curtime.getMonth() + 1,
            d = curtime.getDate(),
            h = curtime.getHours(),
            min = curtime.getMinutes();
        if(m<10){
            m = '0'+m;
        }
        if(d<10){
            d = '0'+d;
        }
        if(h<10){
            h = '0' +h;
        }
        if(min<10){
            min = '0' +min;
        }
        var day = y +'-'+ m +'-' +d;
        var time = h +':' + min;
        return day + ' ' + time;
    }
    //回复点赞功能
    function repraise(e){
        var oldtotal = parseInt(e.getAttribute('total'));
        var my = parseInt(e.getAttribute('my'));
        var newtotal;
        if(my == 0){
            newtotal = oldtotal + 1;
            e.setAttribute('total', newtotal);
            e.setAttribute('my', 1);
            e.innerHTML = newtotal + ' 取消赞';
        }else{
            newtotal = oldtotal - 1;
            e.setAttribute('total', newtotal);
            e.setAttribute('my', 0);
            e.innerHTML = newtotal + ' 赞';
        }
        e.style.display = (newtotal == 0) ? '' : 'inline-block';
    }
    //删除回复
    function reoperate(e){
        var commentBox = e.parentNode.parentNode.parentNode;
        var box = commentBox.parentNode.parentNode.parentNode;
        var textarea = box.getElementsByTagName('textarea')[0];
        var user = commentBox.getElementsByClassName('user')[0];
        var txt = e.innerHTML;
        if(txt == '回复'){
            textarea.onfocus();
            textarea.value = '回复' + user.innerHTML;
            textarea.onkeyup();
        }else {
            removChild(commentBox);
        }
    }


}
