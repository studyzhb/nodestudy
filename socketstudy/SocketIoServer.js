var app=require('express')();

var http=require('http').Server(app);
var io=require('socket.io')(http);
var fs=require('fs');

app.get('/',function(req,res){

    function cb(data){
        res.send(data.toString())
    }

    fs.readFile('./socketIoClient.html',function(err,data){
        if(err) throw err;

        cb(data);
    })

})

app.get('/socket.io.js',function(){

})

var onlineUsers={};
var olConnectCount=0;

var i=0;

io.on('connection',function(socket){
    console.log('youren lianjie')
    //监听新用户的加入
    socket.name=++i;
    onlineUsers[socket.name]=socket;

    //监听用户退出
    socket.on('disconnect',function(){
        console.log('tuichu');
        delete onlineUsers[socket.name]
    })

    //监听用户内容
    socket.on('message',function(msg){
        broadcast(msg,socket);
    })
})

function broadcast(msg,socket){
    for(var key in onlineUsers){
        onlineUsers[key].send(socket.name+'say:'+msg);
    }
}

http.listen(9000,function(){
    console.log('listending on 9000')
})