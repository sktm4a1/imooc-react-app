import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {handleLogOut} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
	state=>state.user,
	{handleLogOut}
)

class User extends React.Component{
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
	}
	logout(){
		const alert = Modal.alert;
		alert('确认退出', '注销?', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确认', onPress: () => {
          		browserCookies.erase('userid')
          		this.props.handleLogOut()
          } },
        ])
	}
	render(){
		return this.props.user ?
			(<div>		
				<Result
					img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt="" />}
					title={this.props.user}
					message={this.props.company ? <span style={{color:'#00bcd4',fontSize:18}} >{this.props.company}</span>:null}
				/>
				<List renderHeader={'简介'}>
					<List.Item multipleLine>
						{this.props.title}						
						{this.props.desc.split('\n').map(v=><List.Item.Brief key={v}>{v}</List.Item.Brief>)}
						{this.props.money?<List.Item.Brief>薪资：{this.props.money}</List.Item.Brief>:null}
					</List.Item>
				</List>	
				<WhiteSpace size="lg"></WhiteSpace>			 				
				<WhiteSpace size="lg"></WhiteSpace>			 				
				<WhiteSpace size="lg"></WhiteSpace>			 				
				<Button type="primary" onClick={this.logout}>退出登录</Button>
			</div>
		):<Redirect to={this.props.redirectTo} />						
	}
}

export default User