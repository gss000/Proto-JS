
    function add(){
        document.getElementById('hidden').style.display = 'block';
        document.getElementById('more').innerHTML = '精简选项';
        document.getElementById('more').href = "javascript:reduce()";
    }

    function reduce(){
        document.getElementById('hidden').style.display = 'none';
        document.getElementById('more').innerHTML = '更多选项';
        document.getElementById('more').href = "javascript:add()";
    }

