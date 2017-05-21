var net=require('net');
var port=9000;
var host='127.0.0.1';

var client=new net.Socket();
client.setEncoding='UTF-8';

client.connect(port,host,function(){
    client.write('nihao');

})

client.on('data',function(data){
    console.log('服务端传来：'+data);
    say()
})

client.on('error',function(err){
    console.log(err);
})

client.on('close',function(){
    console.log('xiaxians')
})

const readline=require('readline');
const r1=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function say(){
    r1.question('请输入：',(inputStr)=>{
        if(inputStr!='bye'){
            client.write(inputStr+'\n');
        }else{
            client.distroy();
            r1.close();
        }
    })
}