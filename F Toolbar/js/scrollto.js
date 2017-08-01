/**
 * Created by Administrator on 2016/11/27.
 */
define(['jquery'],function($){   //定义模块
    function ScrollTo(opts){     //构造函数
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
        //extend方法当用户传参opts，覆盖默认值ScrollTo.DEFAULTS，生成一个新的对象{}， 然后将新的对象返回出来并保存
        this.$el = $('html, body');   //整理，将这两个对象缓存到$el变量中
    }
    ScrollTo.prototype.move = function (){  //将move方法添加到构造函数的原型中
        var opts = this.opts; //使用局部变量，对性能有帮助，否则下面两处都是this.opts

        if($(window).scrollTop() != this.opts.dest){  //加判断，点击向上按钮后不停的执行animate动画
            if(!this.$el.is(':animated')){
                this.$el.animate({
                    scrollTop: opts.dest
                }, opts.speed);
            }
        }
    }
    ScrollTo.prototype.go = function(){    //将go方法添加到构造函数的原型中
        this.$el.scrollTop(this.opts.dest); //到达指定位置
    }
    ScrollTo.DEFAULTS = {       //赋值给构造函数，默认值假如用户没有传参进来
        dest:0,                 //位置
        speed: 800
    };

    return {
        ScrollTo: ScrollTo    //返回一个对象(对象中有一个属性，属性值就是ScrollTo 构造函数)这样外部就可以访问，就是ScrollTo函数
    };
});