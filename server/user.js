const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {'pwd':0,'__v':0}

Router.get('/list',function(req,res){
	const {type} = req.query
	User.find({type},(err,doc)=>{
		if(err)
			throw err;
		else{
			return res.json({code:0,data:doc})
		}
	})
})
Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid	
	User.find({},function(err,doc){
		let users = {}
		doc.forEach(function(item){
			users[item._id] = {name:item.user,avatar:item.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},(err,doc)=>{
			if(!err){
				return res.json({code:0,msgs:doc,users})
			}
		})
	})
})

Router.get('/delete',function(req,res){
	Chat.find({},(err,doc)=>{
		return res.json(doc)
	})
})

Router.post('/readmsg',function(req,res){
	const userid = req.cookies.userid
	const {from} = req.body
	Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},function(err,doc){
		if(!err){
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失败！'})
	})
})

Router.post('/update',function(req,res){
	const userid = req.cookies.userid
	if(!userid){
		return res.json({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data}) 
	})
})

Router.post('/login',function(req,res){
	const {user,pwd} = req.body;
	User.findOne({user,pwd:myMd5(pwd)},_filter,function(err,doc){
		if(err){
			throw err;
		}else{
			if(!doc){
				return res.json({code:1,msg:'用户名或密码错误'})
			}else{
				res.cookie('userid',doc._id)
				return res.json({code:0,data:doc})
			}
		}
	})
})
Router.post('/register',function(req,res){
	const {user,pwd,type} = req.body
	User.findOne({user},function(err,doc){
		if(err)
			throw err;
		else{
			if(doc){
				return res.json({code:1,msg:'用户名重复'})
			}
			const userModel = new User({user,type,pwd:myMd5(pwd)});
			userModel.save(function(err,doc){
				if(err)
					return res.json({code:1,msg:'注册失败！稍后再试'})
				const {user,type,_id} = doc
				res.cookie('userid',_id)
				return res.json({code:0,data:{user,type,_id}})				
			})
		}
	})
})

Router.get('/info',function(req,res){
	const {userid} = req.cookies
	if(!userid){
		return res.json({code:1})
	}
	User.findOne({_id:userid},_filter,function(err,doc){
		if(err){
			return res.json({code:1,msg:'服务器错误'})
		}
		if(doc){
			return res.json({code:0,data:doc})
		}
	})
})

function myMd5(pwd){
	return utils.md5(utils.md5('safji23iAs!#@#@Ddsds'+pwd));
}

module.exports = Router