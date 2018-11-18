const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost/imooc-chat'

mongoose.connect(DB_URL,{ useNewUrlParser: true }).then(() => {
	console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const models = {
	user:{
		'user':{type:String,required:true},
		'pwd':{type:String,required:true},
		'type':{type:String,required:true},
		'avatar':{type:String},
		'desc':{type:String},
		'title':{type:String},
		'money':{type:String},
		'company':{type:String}
	},
	chat:{
		'chatid':{type:String,required:true},
		'from':{type:String,required:true},
		'to':{type:String,required:true},
		'read':{type:Boolean,default:false},
		'content':{type:String,required:true,default:''},
		'create_time':{type:Number,default:new Date().getTime()}
	}
}

for(let m in models){
	mongoose.model(m,new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return	mongoose.model(name)
	}
}