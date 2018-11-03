var express = require('express');
var router = express.Router();
var mysql=require('mysql')

/* GET home page. */
//渲染注册页面
router.get('/', function(req, res, next) {

  res.render('index');
});
//注册数据
router.post('/zhuce',function(req,res){
  var d=req.body
  var connection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"web11"
  })
  connection.connect();
  connection.query("insert into web13(name,pass,age,tel)values(?,?,?,?)",[d.username,d.userpass,d.age,d.usertel],function(err,data){
    if(!err){
      res.send("注册成功")
    }else{
      console.log(err);
    }
  })
  connection.end()
})
//显示所有数据
router.get("/shuju",function(req,res){
      res.render("data")
})
//删除数据
router.get("/dirt",function(req,res){
  var d=req.query.id
  var connection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"web11"
  })
  connection.connect();
  connection.query("delete from web13 where id = ?",d,function(err,data){
    if(!err){
      res.send("删除成功")
    }
  })
  connection.end()
})
//修改路由
router.get("/gb",function(req,res){
  var d=req.query.id
  console.log(req.query.id)
  var connection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"web11"
  })
  connection.connect();
  connection.query("select * from web13 where id = ?",d,function(err,data){
    if(!err){
      res.render("form",{id:data})
      console.log(data)
    }
  })
  connection.end()
})
//修改数据
router.post("/updata",function(req,res){
  var d=req.body;
 
  var connection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"web11"
})
  connection.connect()
  connection.query("update web13 set name=?,pass=?,age=?,tel=? where id =?",[d.username,d.userpass,d.age,d.usertel,d.id],function(err,data){
    if(!err){

      res.send("修改成功")
    }
  });
  connection.end()
})
//分页
router.post("/fenyedata",function(req,res){
  var  p=req.body.p
  var connection =mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"web11"
  });
  connection.connect();
  connection.query("select * from web13 limit ?,?",[(p-1)*3,3],function (err,data) {
    if(!err){
      res.send({users:data})
    }
  })
  connection.end();
})
module.exports = router;
