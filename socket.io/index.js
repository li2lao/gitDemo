const http=require("http")
const fs=require("fs")
const ws=require("socket.io")

//创建服务器
const server=http.createServer(function(req,res){
var html=fs.readFileSync("index.html")
res.end(html)
})
//基于WEB服务开启socket
const io=ws(server);
io.on("connection",function(socket){//检测链接事件
	console.log("有用户进来")
	socket.on("message",function(mes){//接受客户端所发送的信息
		console.log(mes)
		io.emit("message",mes)//向所有客户端广播信息
	})
})


server.listen(3000)