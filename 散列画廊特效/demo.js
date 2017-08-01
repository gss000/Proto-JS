//翻面控制
function turn(ele){
    var cls = ele.className;
    //使用正则表达式，判断传入的cls是否含有photo_front字符串
    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/, 'photo_back');
    }else{
        cls = cls.replace(/photo_back/, 'photo_front');
    }
    return ele.className = cls;
}