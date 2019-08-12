;(function($){
    "use strict";

    // $.fn.extend({
    //     banner:function(){
    //     }
    // })

    $.fn.banner = function(options){
        // console.log(this)
        var that = this;
        // 1.定义面向对象，的对象
        var ban = {};
        // 2.解析参数，处理默认参数
        // list:true,     //可选，默认有
        ban.list = options.list === false ? false : true;
        // autoPlay:true, //可选，默认有自动播放
        ban.autoPlay = options.autoPlay === false ? false : true;
        // delayTime:5000,//可选，默认2000
        ban.delayTime = options.delayTime || 2000;
        // moveTime:1000                           //可选，默认300
        ban.moveTime = options.moveTime || 300;
        
        // 处理当前显示的索引的默认值：
            // 此值在list功能中表示要走的，因为点击的是进来的
            // 此值在btn功能中表示要进来的，因为点击时没有当前索引，只能在此值身上++，所以此值在btn中表示要进来的
        if(options.index >= 0 && options.index <= options.items.length-1){
            ban.index = options.index;
        }else if(options.index > options.items.length-1){
            ban.index = options.items.length-1
        }else{
            ban.index = 0;
        }
        // 假设在btn中要走的值
        ban.iPrev = null;


        // 3.生成list（最下面的小圆点）
        ban.init = function(){
            if(!ban.list) return;
            this.ul = $("<ul>");
            var str = "";
            for(var i=0;i<options.items.length;i++){
                str += `<li></li>`
            }
            this.ul.html(str);
            that.append(this.ul);
            // 设置样式
            this.ul.css({
                width:"100px",
                height:30,
                lineHeight:"30px",
                display:"flex",
                position:"absolute",
                left:100,
                bottom:30,
                marginLeft:260,
                padding:5,
                listStyle:"none",
                textAlign:"center",
                zIndex:10
            }).children("li").css({
                width:10,
                height:10,
                display:"block",
                borderRadius:5,
                marginLeft:5,
                background:"black"
            }).eq(ban.index).css({
                backgroundColor:"black",
                color:"black"
            })

            this.listAction()
        }
        // 4.小圆点的点击切换对应图片的功能
        ban.listAction = function(){
            var _this = this;
            this.ul.children("li").click(function(){
                // 点击元素的索引：$(this).index()
                // 默认的索引：_this.index
                if($(this).index() > _this.index){
                    // console.log("左")
                    _this.listMove(1,$(this).index())
                }
                if($(this).index() < _this.index){
                    // console.log("右")
                    _this.listMove(-1,$(this).index())
                }

                // 点击之后，点击的就变成了当前
                _this.index = $(this).index();

                // 设置list的li当前项，取消所有，给点击的设置
                _this.ul.children("li").css({
                    backgroundColor:"black",
                    color:""
                }).eq(_this.index).css({
                    backgroundColor:"red",
                    color:"#fff"
                })
            })
        }
        ban.listMove = function(type,iNow){
            // 谁走：this.index
            // 谁进来：iNow
            options.items.eq(this.index).css({
                left:0
            }).stop().animate({
                left:-options.items.eq(0).width() * type
            },this.moveTime).end().eq(iNow).css({
                left:options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)
            // 上一步：end()
            // 父级：parent()
        }
        

        ban.btnActive = function(){
            // console.log(options.left)
            if(!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0)) return;

            var _this = this;

            // 绑定点击事件
            options.left.on("click",function(){
                // 计算索引
                if(_this.index == 0){
                    _this.index = options.items.length-1;
                    _this.iPrev = 0;
                }else{
                    _this.index--;
                    _this.iPrev = _this.index+1;
                }
                _this.btnMove(-1);
            })
            options.right.on("click",function(){
                // 计算索引
                if(_this.index == options.items.length-1){
                    _this.index = 0;
                    _this.iPrev = options.items.length-1;
                }else{
                    _this.index++;
                    _this.iPrev = _this.index - 1;
                }
                _this.btnMove(1);
            })
        }
        ban.btnMove = function(type){
            // 要走的：this.iPrev
            // 要进来：this.index
            options.items.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:-options.items.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:options.items.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime)

            // 设置list的li当前项，取消所有，给点击的设置
            this.ul.children("li").css({
                backgroundColor:"black",
                color:""
            }).eq(this.index).css({
                backgroundColor:"red",
                color:"#fff"
            })
        }

        ban.autoAction = function(){
            var _this = this;
            if(!ban.autoPlay) return;
            // 通过计时器执行右按钮的事件，实现自动轮播
            this.t = setInterval(() => {
                options.right.trigger("click")
            }, this.delayTime);

            // 给大框添加鼠标进入和离开事件，做停止和继续
            that.hover(function(){
                clearInterval(_this.t)
            },function(){
                _this.t = setInterval(() => {
                    options.right.trigger("click")
                }, _this.delayTime);
            })
        }
        

        ban.init()
        ban.btnActive()
        ban.autoAction()
    }
})(jQuery);