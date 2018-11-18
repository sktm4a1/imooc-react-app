const express = require('express')
const userRouter =require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

var app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){	
	socket.on('sendmsg',function(data){		
		const {oFrom,to,msg} = data
		const chatid = [oFrom,to].sort().join('_')
		Chat.create({chatid,from:oFrom,to,content:msg},function(err,doc){			
			io.emit('recMsg',Object.assign({},doc._doc))			
		})
	})	
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(8080,function(){
	console.log('http://localhost:8080已启动!')
})