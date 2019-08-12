var aimg = document.querySelectorAll("img");
    var arr = Array.from(aimg);
    var t;

    onload = onscroll = function(){
        // 函数节流：同一个时间单位内，如果多次执行同一个函数，拿到的结果一致的，利用计时器的方式，使得同一个时间单位内，只执行一次这个函数，达到节流的目的
        clearTimeout(t);
        t = setTimeout(function(){
            fn();
        },100)
    }

    function fn(){
        var scrollT = document.documentElement.scrollTop;
        var clientH = document.documentElement.clientHeight;
        
        for(var i=0;i<arr.length;i++){
            console.log(`i:${i}`);
            if(arr[i].offsetTop - scrollT < clientH){
                arr[i].src = arr[i].getAttribute("ljz");
                // 小心使用：在循环中修改了循环次数
                arr.splice(i,1)
            }
        }
    }
