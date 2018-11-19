import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:8080')
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg:[],
	users:{},
	unread:0
}

export function chat(state=initState, action){
	switch(action.type){
		case MSG_LIST:
			return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
		case MSG_RECV:
			const n = action.userid===action.payload.to?1:0
			return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
		case MSG_READ:
			const {from,num} = action.payload;
			return {...state,chatmsg:state.chatmsg.map(function(item, index) {
				item.read = from===item.from ? true:item.read;
				return item;
			}),unread:state.unread-num}
		default:
			return state
	}
}
function msgList(msgs,users,userid){
	return {type:MSG_LIST,payload:{msgs,users,userid}}
}
export function getMsgList(){
	return (dispatch,getState) => {
		axios.get('/user/getmsglist').then(res=>{
			if(res.status===200 && res.data.code===0){
				const userid = getState().user._id
				dispatch(msgList(res.data.msgs,res.data.users,userid))
			}
		})
	}
}
function msgRecv(data,userid){
	return {type:MSG_RECV,payload:data,userid}
}
export function recMsg(data){
	return (dispatch,getState) => {
		socket.on('recMsg',function(data){
			const userid = getState().user._id			
			dispatch(msgRecv(data,userid))
		})
	}
}
export function sendMsg({oFrom,to,msg}){
	return dispatch => {
		socket.emit('sendmsg',{oFrom,to,msg})
	}
}
function msgRead({from,userid,num}){
	return {type:MSG_READ,payload:{from,userid,num}}
}
export function readMsg(from){
	return (dispatch,getState) => {
		axios.post('/user/readmsg',{from}).then(res=>{
			const userid = getState().user._id
			if(res.status===200&&res.data.code===0){
				dispatch(msgRead({from,userid,num:res.data.num}))
			}
		})
	}
}