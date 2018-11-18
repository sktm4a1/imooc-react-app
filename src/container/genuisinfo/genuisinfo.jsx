import React from 'react'
import{ NavBar,InputItem,TextareaItem,Button,WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-select/avatar-select'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { update } from '../../redux/user.redux'


@connect(
	state=>state.user,
	{update}
)

class Genuisinfo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			title:'',
			avatar:'',
			desc:''
		}
		this.handleUpdate = this.handleUpdate.bind(this)
	}
	handleChange(key,v){
		this.setState({
			[key]:v
		})
	}
	handleUpdate(){
		this.props.update(this.state)
	}
	render(){
		const path = this.props.location.pathname
		const redirectTo = this.props.redirectTo
		return (
			<div>
				{redirectTo&&redirectTo!==path ? <Redirect to={redirectTo} />:null}
				<NavBar mode="dark">牛人信息完善</NavBar>
				<AvatarSelector selectAvatar={imgname => {this.setState({
					avatar:imgname
				})}} ></AvatarSelector>
				<WhiteSpace size="lg" />
				<InputItem style={{fontSize:'14px'}} onChange={v=>{this.handleChange('title',v)}} >求职岗位</InputItem>
				<TextareaItem style={{fontSize:'14px'}} title="个人简介" autoHeight="true" rows="3" onChange={v=>{this.handleChange('desc',v)}} ></TextareaItem>
				<WhiteSpace size="lg" />
				<Button type="primary" onClick={this.handleUpdate} >保存</Button>
			</div>
		)
	}
}

export default Genuisinfo