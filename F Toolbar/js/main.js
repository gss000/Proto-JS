/**
 * Created by Administrator on 2016/11/27.
 */
requirejs.config({
    paths:{
        jquery: 'jquery-3.1.1'
    }
    });

requirejs(['jquery', 'scrollto'],function($, scrollto) {
    var scroll = new scrollto.ScrollTo({

    })//实例化对象（引入的模块），这儿需要一个参数也可以不给，模块中已经有了默认值

    $('#backTop').on('click', $.proxy(scroll.move), scroll);
    //这儿的scroll.move是事件处理函数，使用proxy来手动调整this的指向，第一个参数是方法，第二个是指向
    $(window).on('scroll', function(){
        checkPosition($(window).height());//传递的参数，一个窗口的高度
    });

    checkPosition($(window).height());//先执行判断是否需要隐藏 top

    function move(){
        $('html,body').animate({
            scrollTop: 0
        }, 2000)
    }

    function go(){
        $('html,body').scrollTop(0);
    }

    function checkPosition(pos){
        if($(window).scrollTop() > pos){
            $('#backTop').fadeIn();
        }else{
            $('#backTop').fadeOut();
        }
    }
});