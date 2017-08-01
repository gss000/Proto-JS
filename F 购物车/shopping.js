window.onload = function(){
    //不支持类名获取的函数
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var elements = [];
            var arr = document.getElementsByTagName('*');
            for (var i = 0, len = arr.length; i < len; i++) {

                if (arr[i].className.indexOf(cls + ' ') >=0
                    || arr[i].className.indexOf(' ' + cls + ' ') >=0
                    || arr[i].className.indexOf(' ' + cls) >=0) {
                    elements.push(arr[i]);
                }
            }
            return elements;
        }
    }

    var _table = document.getElementById('table');
    var tr = _table.children[1].rows;//获取table下第二个子节点下的所有行数
    var checkInputs = document.getElementsByClassName('check');
    var checkAllInputs = document.getElementsByClassName('check-all')
    var _seletedTotal = document.getElementById('selectedTotal');
    var _priceTotal = document.getElementById('priceTotal');
    var _selected = document.getElementById('selected');
    var _foot = document.getElementById('foot');
    var _selectedViewList = document.getElementById('selectedViewList');
    var _deleteAll = document.getElementById('deleteAll');

    //总价计算函数
    function getTotal(){
        var seleted = 0;
        var price = 0;
        var html = '';
        for(var i=0; i<tr.length; i++){
            if(tr[i].getElementsByTagName('input')[0].checked){
                tr[i].className = 'on';
                seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
                price += parseFloat(tr[i].cells[4].innerHTML);
                //增加弹出框里面的div（图片）
                html += '<div><img src="'+ tr[i].getElementsByTagName('img')[0].src +'" ><span class="del" index="'+ i +'">取消选择</span></div>';
            }else{
                tr[i].className = '';
            }
        }
        _seletedTotal.innerHTML = seleted;
        _priceTotal.innerHTML = price.toFixed(2);//.toFixed（2）保留两位小数
        _selectedViewList.innerHTML = html;

        if(seleted == 0){
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

    //input选择框 全选和勾选
    for(var i=0; i < checkInputs.length; i++){
        checkInputs[i].onclick = function(){
            if(this.className === 'check-all check'){
                for(var j=0; j<checkInputs.length; j++){
                    checkInputs[j].checked = this.checked;
                }
            }
            if(this.checked == false){
                for(var k=0; k<checkAllInputs.length; k++){
                    checkAllInputs[k].checked = false;
                }
            }
            getTotal();
        }
    }

    //数量的增减，计算小计的数值,键盘事件,删除操作
    for(var i=0; i<tr.length; i++){
        //鼠标点击事件
        tr[i].onclick = function(e){
            e = e || window.event;
            var el = e.srcElement;
            var cls = el.className;
            var input = this.getElementsByTagName('input')[1];
            var val = parseInt(input.value);
            var reduce = this.getElementsByTagName('span')[1];
            switch(cls){
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
                    if(input.value <= 0){
                        input.value = 0;
                    }
                    getSubtotal(this);
                    break;
                case 'delete':
                    var conf = confirm('确定要删除么？');
                    if(conf){
                        this.parentNode.removeChild(this);
                    }
                    break;
                default :
                    break;
            }
            getTotal();
        }
        //键盘点击修改事件
        tr[i].getElementsByTagName('input')[1].onkeyup = function(){
            var val = parseInt(this.value);
            var tr = this.parentNode.parentNode;
            var reduce = tr.getElementsByTagName('span')[1];
            if(isNaN(val) || val < 1){
                val = 1;
            }
            this.value = val;
            if(this.value <= 0){
                reduce.innerHTML = '';
            }else{
                reduce.innerHTML = '-';
            }
            getSubtotal(tr);
            getTotal();
        }
    }

    //全选删除功能
    _deleteAll.onclick = function(){
        if(_seletedTotal.innerHTML != '0'){
            var conf = confirm('确认删除？');
            if(conf){
                for(var i=0; i<tr.length; i++){
                    var _input = tr[i].getElementsByTagName('input')[0];
                    if(_input.checked){
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;//数组第一个删除之后，第二个元素就变成了0。
                    }
                }
            }
        }

    }

    //点击已选商品，出现弹框
    _selected.onclick = function(){
        if(_foot.className == 'foot'){
            if(_seletedTotal.innerHTML != 0){
                _foot.className = 'foot show';
            }

        }else{
            _foot.className = 'foot';
        }

    }

    //弹框取消选择，对应的列表同时也取消选择
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

    //默认全选
    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();

    //事件代理属性
    //_selectedViewList.onclick = function(e){
    //    console.log(e);
    //}
}
