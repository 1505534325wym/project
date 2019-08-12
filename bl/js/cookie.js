function setCookie(key,value,options){
    // options默认参数的处理
    options = options || {};

    // options中expires默认的处理
    var date = "";
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        date = ";expires="+d;
    }

    // options中path默认的处理
    var path = options.path ? ";path="+options.path : "";

    // 当有效期和路径的默认处理结束后，可以设置cookie了
    document.cookie = key + "="+ value + date + path;
}

function removeCookie(key,options){
    // options默认参数的处理
    options = options || {};
    // 必须设置options中expires为-1
    options.expires = -1;
    // 借助设置cookie的方法，将options传过去
    setCookie(key,null,options)
}

function getCookie(key){
    // 获取所有cookie
    var str = document.cookie;
    // 第一次分割：每对cookie是一个数据
    var arr = str.split("; ");
    // 遍历每对cookie，再次分割：名字和值
    for(var i=0;i<arr.length;i++){
        // 根据名字
        if(arr[i].split("=")[0] == key){
            // 返回值
            return arr[i].split("=")[1];
        }
    }
    // 如果for循环结束后，函数还在执行，说明没有找到数据，返回空字符
    return "";
}

// 替换for循环部分
// var v = "";
// arr.some((value)=>{
//     var sArr = value.split("=");
//     v = sArr[1];
//     return sArr[0] == key;
// })
// return v;
