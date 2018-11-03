!function(global,factory){
    typeof exports ==='object' && typeof module !=='undefined'?module.exports = factory(): global.Plug = factory()
}(this,function(){ 'use strict'
    function Plug(){}
    Plug.prototype={
        strData:function(str){
            var box=''
            for(var i in str){
                box+=`${i}=${str[i]}&`
            }
            box.substring(1,box.length-1)
            return box
        },
        xhr:function(json){
            if(json.method===''){
                throw new Error("以对象形式传入参数")
            }
            var ajax=new XMLHttpRequest()
            if(json.method == "get"||json.method == "GET"){
            if(json.data){
                json.url+="?";
                json.url+=this.strData(json.data)
            }else{}
            ajax.timeout=3000||json.Date;
            ajax.ontimeout=function(){
                    ajax.abort()
                    alert('请求超时')
             };
            ajax.open(json.method,json.url);
            ajax.send(null)
        }else{
            ajax.open(json.method,json.url)
            ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            ajax.timeout=1000||json.Date;
            ajax.ontimeout=function(){
                    ajax.abort()
                    alert('请求超时')
             };
            if(json.data){
                ajax.send(this.strData(json.data))
            }else{
                ajax.send(null)
            }
        }
        ajax.onreadystatechange=function(){
            if(json.loadingBox) {
                var loading = document.querySelector(json.loadingBox);
                loading.style.display = 'block';
                if (ajax.readyState == 4 && ajax.status == 200) {
                    loading.style.display = 'none';
                    json.success(ajax.responseText);
                }
            }else{
                if (ajax.readyState == 4 && ajax.status == 200) {
                    json.success(ajax.responseText);
                }
            }
        }
        },
        doc:function(){
            console.log('doc');
        }
    }
return Plug
})
/*
 var a = new Plug()
 a.xhr({
 url:'https://route.showapi.com/181-1',
 data:'',  {name：'zhangsan',age:'nan'}
 method:'',  get  post
 Date:'',    请求容忍时间
 loadingBox:''   loading 容器  #box||.box
 success:function(res){  数据 回调
 console.log(res)
 }
 });
 */