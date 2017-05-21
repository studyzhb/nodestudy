var net=require('net')

var chatserver=net.createServer(),
    clientMap=new Object();

var i=0;
chatserver.on('connection',function(client){
    console.log('lianjie');
    client.name=++i;
    clientMap[client.name]=client;

    //对客户端发送消息的监听

    client.on('data',function(data){
        console.log('客户端传来'+data);
        broadcast(data,client);
    })

    client.on('error',function(e){
        console.log('client error'+e);
        client.end()
    })

    client.on('close',function(){
        delete clientMap[client.name];
        console.log(client.name+'xiaxian');
        broadcast(client.name+'下线',client);
    })

})

function broadcast(msg,client){
    for(var key in clientMap){
        clientMap[key].send(client.name+'say:'+msg);
    }
}

chatserver.listen(9000)