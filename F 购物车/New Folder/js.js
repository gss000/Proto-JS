window.onload = function(){
    if(!document.getElementsByClassName){
        document.getElementsByClassName = function(cls){
            var elements = [];
            var arr = document.getElementsByTagName('*');
            for(var i=0; i<arr.length; i++){
                if(arr[i].className.indexOf(cls + ' ') >= 0 || arr[i].className.indexOf(' ' + cls) >= 0 || arr[i].className.indexOf(' ' + cls + ' ') >= 0){
                    elements.push(arr[i]);
                }
            }
            return elements;
        }
    }

    var _table = document.getElementById('table');
    var tr = _table.children[1].rows;
    var _check = document.getElementsByClassName('check');
    var _checkAll = document.getElementsByClassName('check-all');
    var _selectedTotal = document.getElementById('selectedTotal');
    var _priceTotal = document.getElementById('priceTotal');
    var _deleteAll = document.getElementById('deleteAll');
    var _selected = document.getElementById('selected');
    var _foot = document.getElementById('foot');
    var _selectedViewList = document.getElementById('selectedViewList');

    //总价计算函数
    function getTotal(){
        var selected = 0;
        var price = 0;
        var html = '';
        for(var i=0; i<tr.length; i++){
            if(tr[i].getElementsByTagName('input')[0].checked){
                selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML);
                html += '<div><img src="'+ tr[i].getElementsByTagName('img')[0].src +'" ><span class="del" index="'+ i +'">取消选择</span></div>';
            }else{
                tr[i].className = '';
            }
        }

        _selectedTotal.innerHTML = selected;
        _priceTotal.innerHTML = price.toFixed(2);
        _selectedViewList.innerHTML = html;

        if(selected == 0){
            _foot.className = 'foot';
        }
    }

    //小计函数
    function getSubtotal(tr){
        var td = tr.cells;
        var price = parseFloat(td[2].innerHTML);
        var count = parseInt(tr.getElementsByTagName('input')[1].value);
        var subtotal = parseFloat(price * count);
        td[4].innerHTML = subtotal;
    }

    //input 全选和勾选
    for(var i=0; i<_check.length; i++){
        _check[i].onclick = function(){
            if(this.className === 'check-all check'){
                for(var j=0; j<_check.length; j++){
                    _check[j].checked = this.checked;
                }
            }
            if(this.checked == false){
                for(var k=0; k<_checkAll.length; k++){
                    _checkAll[k].checked = false;
                }
            }
            getTotal();
        }
    }

    //数量的增加删减
    for(var i=0; i<tr.length; i++){
        //鼠标点击事件
        tr[i].onclick = function(e){
            e = e || window.event;
            var el = e.srcElement;
            var cls = el.className;
            var input = this.getElementsByTagName('input')[1];
            var val = parseInt(input.value);
            var reduce = this.getElementsByTagName('span')[1];
            switch (cls){
                case 'add':
                    input.value = val + 1;
                    reduce.innerHTML = '-';
                    getSubtotal(this);
                    break;
                case 'reduce':
                    input.value = val - 1;
                    if(input.value <= 1){
                        reduce.innerHTML = '';
                    }
                    if(input.value <= 1){
                        input.value = 1;
                    }
                    getSubtotal(this);
                    break;
                case 'delete':
                    var conf = confirm('确定邀删除么？');
                    if(conf){
                        this.parentNode.removeChild(this);
                    }
                    break;
                default :
                    break;
            }
            getTotal();
        }
        //键盘修改
        tr[i].getElementsByTagName('input')[1].onkeyup = function(){
            var val = parseInt(this.value);
            var tr = this.parentNode.parentNode;
            var reduce = tr.getElementsByTagName('span')[1];
            if(isNaN(val) || val < 1){
                val = 1;
            }
            this.value = val;
            if(this.value <= 1){
                reduce.innerHTML = '';
            }else{
                reduce.innerHTML = '-';
            }
            getSubtotal(tr);
            getTotal();
        }
    }

    //全选删除
    _deleteAll.onclick = function(){
        if(_selectedTotal.innerHTML != '0'){
            var conf = confirm('确定要删除么？');
            if(conf){
                for(var i=0; i<tr.length; i++){
                    var _input = tr[i].getElementsByTagName('input')[0];
                    if(_input.checked){
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        }
    }

    //弹框
    _selected.onclick = function(){
        if(_foot.className == 'foot'){
            if(_selectedTotal.innerHTML != '0'){
                _foot.className = 'foot show';
            }
        }else{
            _foot.className = 'foot';
        }
    }

    _selectedViewList.onclick = function(e){
        e = e || window.event;
        var el = e.srcElement;
        if(el.className == 'del'){
            var index = el.getAttribute('index');
            var input = tr[index].getElementsByTagName('input')[0];
            input.checked = false;
            input.onclick();
        }
    }


}