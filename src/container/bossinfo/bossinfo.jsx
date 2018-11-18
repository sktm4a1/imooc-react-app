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

class Bossinfo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			title:'',
			avatar:'',
			desc:'',
			company:'',
			money:''
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
				<NavBar mode="dark">Boss信息完善</NavBar>
				<AvatarSelector selectAvatar={imgname => {this.setState({
					avatar:imgname
				})}} ></AvatarSelector>
				<WhiteSpace size="lg" />
				<InputItem style={{fontSize:'14px'}} onChange={v=>{this.handleChange('title',v)}} >招聘职位</InputItem>
				<InputItem style={{fontSize:'14px'}} onChange={v=>{this.handleChange('company',v)}} >公司名称</InputItem>
				<InputItem style={{fontSize:'14px'}} onChange={v=>{this.handleChange('money',v)}} >职位薪资</InputItem>
				<TextareaItem style={{fontSize:'14px'}} title="职位要求" autoHeight="true" rows="3" onChange={v=>{this.handleChange('desc',v)}} ></TextareaItem>
				<WhiteSpace size="lg" />
				<Button type="primary" onClick={this.handleUpdate} >保存</Button>
			</div>
		)
	}
}

export default Bossinfo