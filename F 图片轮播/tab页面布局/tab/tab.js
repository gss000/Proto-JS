window.onload = function(){
    var _title = document.getElementById('title');
    var titleli = _title.getElementsByTagName('li');
    var _con = document.getElementById('content');
    var moddivs = _con.getElementsByTagName('div');

    for(var i=0; i<titleli.length; i++){
        var curtli = titleli[i];
        curtli.id = i;//给当前对象添加一个id的属性
        curtli.onmouseover = function(){
            //去掉所有li上的class
            for(var j=0;j<titleli.length; j++){
                titleli[j].className = '';
                moddivs[j].style.display = 'none';
            }
            this.className = 'select';
            moddivs[this.id].style.display = 'block';
        }
    }




}
