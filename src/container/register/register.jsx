import React from 'react'
import Logo from '../../component/logo/logo'
import { List,InputItem,Radio,WingBlank,WhiteSpace,Button } from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
	state=>state.user,
	{register}
)
@imoocForm

class Register extends React.Component{
	constructor(props){
		super(props)		
		this.handleRegister = this.handleRegister.bind(this)
	}
	
	handleRegister(){
		this.props.register(this.props.state)
	}
	componentDidMount(){
		this.props.handleChange('type','genuis')
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg?<p className="error-msg" >{this.props.msg}</p>:null}
						<InputItem onChange={v=>{this.props.handleChange('user',v)}}>用户名</InputItem>
							<WhiteSpace />
						<InputItem type="password" onChange={v=>{this.props.handleChange('pwd',v)}} >密码</InputItem>
							<WhiteSpace />
						<InputItem type="password" onChange={v=>this.props.handleChange('repeatpwd',v)} >确认密码</InputItem>
							<WhiteSpace />
						<RadioItem checked={this.props.state.type === 'genuis'} onChange={()=>{this.props.handleChange('type','genuis')}} >
							牛人
						</RadioItem>
						<RadioItem checked={this.props.state.type === 'boss'} onChange={()=>{this.props.handleChange('type','boss')}} >
							老板
						</RadioItem>
						<WhiteSpace />
						<Button type="primary" onClick={this.handleRegister} >注册</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}

export default Register