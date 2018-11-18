import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
	state=>state
)

class Msg extends React.Component{

	getLastMsg(arr){
		return arr[arr.length-1];
	}

	render(){
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id
		const userinfo = this.props.chat.users
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			var a_last = this.getLastMsg(a).create_time;
			var b_last = this.getLastMsg(b).create_time;
			return b_last - a_last;
		})
		return (
			<div>
				<List>
					{chatList.map(v=>{
						const lastItem = this.getLastMsg(v)
						const targetId = v[0].from===userid?v[0].to:v[0].from
						const unreadNum = v.filter(item => !item.read&&item.to===userid).length;
						if(!userinfo[targetId]) return null;
						return (<Item 
							key={lastItem._id} 
							extra={<Badge text={unreadNum} />} 
							thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
							onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
							>
							{lastItem.content}
							<Brief>{userinfo[targetId].name}</Brief>
						</Item>)
					})}
				</List>
			</div>
		)
	}
}

export default Msg