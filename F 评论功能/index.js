window.onload = function(){
    var _lis = document.getElementById('list'),
        boxs = _lis.children;
    var timer;

    for(var i=0; i<boxs.length; i++){
        boxs[i].onclick = function(e){
            e = e || window.event;
            var el = e.el || e.srcElement;
            switch (el.className){
                case 'close':
                    removenode(el.parentNode);
                    break;
                case 'praise':
                    praised(el.parentNode.parentNode.parentNode, el);
                    break;
                case 'btn btn-off':
                    clearTimeout(timer);
                    break;
                case 'btn':
                    recomment(el.parentNode.parentNode);
                    break;
                case 'comment-praise':
                    repraise(el);
                    break;
                case 'comment-operate':
                    removecomment(el);
                    break;
            }
        }
        //输入框功能
        var textarea = boxs[i].getElementsByClassName('comment')[0];
        textarea.onfocus = function(){
            this.parentNode.className = 'text-box text-box-on';
            this.value = this.value == '评论...' ? '' : this.value;
            this.onkeyup();
        }
        textarea.onblur = function(){
            var that = this;
            timer = setTimeout(function(){
                if(that.value == ''){
                    that.parentNode.className = 'text-box';
                    that.value = '评论...';
                }
            }, 300);

        }
        textarea.onkeyup = function(e){
            var leng = parseInt(this.value.length);
            var btn = this.parentNode.children[1];
            var word = this.parentNode.children[2];
            if(leng == 0 || leng > 140){
                btn.className = 'btn btn-off';
            }else{
                btn.className = 'btn';
            }
            word.innerHTML = leng + '/140';
        }

    }

    //点赞功能
    function praised(box, el){
        var totalobj = box.getElementsByClassName('praises-total')[0];
        var oldTotal = parseInt(totalobj.getAttribute('total'));
        var text = el.innerHTML;
        var newTotal;
        if(text == '赞'){
            newTotal = oldTotal + 1;
            totalobj.setAttribute('total', newTotal);
            totalobj.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
            el.innerHTML = '取消赞';
        }else{
            newTotal = oldTotal - 1;
            totalobj.setAttribute('total', newTotal);
            totalobj.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';
            el.innerHTML = '赞';
        }
        totalobj.style.display = (newTotal == 0) ? 'none' : 'block';
    }
    //删除/关闭功能
    function removenode(node){
        node.parentNode.removeChild(node);
    }
    //回复功能
    function recomment(box){
        var textarea = box.getElementsByClassName('comment')[0];
        var commentList = box.getElementsByClassName('comment-list')[0];
        var div = document.createElement('div');
        div.className = 'comment-box clearfix';
        div.setAttribute('user', 'self');
        div.innerHTML = '<img class="myhead" src="img/2.jpg" alt=""/>' +
            '<div class="comment-content">' +
            '<p class="comment-txt"><span class="user">我:</span>' + textarea.value +'</p>' +
            '<p class="comment-time">' +
                gettime() +
            '<a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>'+
            '<a href="javascript:;" class="comment-operate">删除</a>'+
            '</p></div>'
        commentList.appendChild(div);
        textarea.value = '';
        textarea.onblur();
    }
    //获取时间
    function gettime(){
        var cur = new Date(),
            year = cur.getFullYear(),
            mon = cur.getMonth() + 1,
            day = cur.getDate(),
            hour = cur.getHours(),
            min = cur.getMinutes();
        mon = mon<10 ? '0' + mon : mon;
        day = day<10 ? '0' + day : day;
        hour = hour<10 ? '0' + hour : hour;
        min = min<10 ? '0' + min : min;
        return year+'-'+mon+'-'+day+' '+hour+'-'+min;
    }
    //点赞回复功能
    function repraise(el){
        var oldtotal = parseInt(el.getAttribute('total'));
        var my = parseInt(el.getAttribute('my'));
        var newtotal;
        if(my == 0){
            newtotal = oldtotal + 1;
            el.setAttribute('total', newtotal);
            el.setAttribute('my', 1);
            el.innerHTML = newtotal + ' 取消赞';
        }else{
            newtotal = oldtotal - 1;
            el.setAttribute('total', newtotal);
            el.setAttribute('my', 0);
            el.innerHTML = newtotal + ' 赞';
        }
        el.style.display = (newtotal == 0) ? 'none' : 'inline-block';
    }
    //删除回复
    function removecomment(el){
        var commentbox = el.parentNode.parentNode.parentNode;
        var box = commentbox.parentNode.parentNode.parentNode;
        var user = commentbox.getElementsByClassName('user')[0];
        var textarea = box.getElementsByTagName('textarea')[0];
        if(el.innerHTML == '回复'){
            textarea.onfocus();
            textarea.innerHTML = '回复' + user.innerHTML;
            textarea.onkeyup();
        }else{
            removenode(commentbox);
        }

    }

}

