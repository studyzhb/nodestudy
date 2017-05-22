var WebSocketServer=require('ws').Server;
var wss=new WebSocketServer({port:9000});

var clientMap=new Object();
var i=0;

wss.on('connection',function(ws){
    console.log(ws+'shangxian');
    ws.name=++i;
    clientMap[ws.name]=ws;
    ws.on('message',function(message){
        broadcast(message,ws);
    })

    ws.on('close',function(){
        console.log('likai');
        // global.gc();//垃圾回收方法
    })
})

function broadcast(msg,ws){
    for(var key in clientMap){
        clientMap[key].send(ws.name+'say:'+msg);
    }
}