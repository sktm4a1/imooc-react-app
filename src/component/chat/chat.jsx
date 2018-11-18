import React from 'react'
import {List,InputItem,NavBar,Icon} from 'antd-mobile'
import { getChatId } from '../../util'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recMsg,readMsg} from '../../redux/chat.redux'


@connect(
	state=>state,
	{getMsgList,sendMsg,recMsg,readMsg}
)

class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state={
			text:'',
			msg:[]
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recMsg()	
		}
	}
	componentWillUnmount(){
		const to = this.props.match.params.user				
		this.props.readMsg(to)
	}
	handleSubmit(){
		const oFrom = this.props.user._id;
		const to = this.props.match.params.user;
		const msg = this.state.text;
		this.props.sendMsg({oFrom,to,msg})
		this.setState({text:''})
	}
	render(){	
		const userid = this.props.match.params.user
		const chatid = getChatId(userid,this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[userid]){
			return null;
		}
		return (
			<div id="chat-page">
				<NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={()=>{this.props.history.goBack()}}>{users[userid].name}</NavBar>
				<List>
					{chatmsgs.map((item,index) => {
						return item.from===userid?(					
							<Item key={index} thumb={require(`../img/${users[userid].avatar}.png`)}>{item.content}</Item>											
						):(						
							<Item key={index} extra={<img src={require(`../img/${users[item.from].avatar}.png`)} alt="" />} className="chat-me">{item.content}</Item>							
						)
					})}
				</List>
				<div className="stick-footer">
					<List>
						<InputItem placeholder="请输入" value={this.state.text} onChange={v => {
							this.setState({text:v})
						}} extra={<span onClick={this.handleSubmit}>发送</span>}>						
						</InputItem>
					</List>
				</div>
			</div>
		)
	}
}

export default Chat