var express=require('express');

var port=process.env.PORT||3000;

var app=express();

//设置视图根路径
app.set('views','./views');
//设置模板引擎
app.set('view engine','jade');
app.listen(port);

app.get('/',function(req,res){
    res.render('index',{title:'首页'})
})

app.get('/list',function(req,res){
    res.render('list',{title:'列表页'})
})

app.get('/detail',function(req,res){
    res.render('detail',{title:'详情页'})
})
