import React from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter

class UserCard extends React.Component{
	static propTypes = {
		userList:PropTypes.array.isRequired
	}
	
	handleCilck(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render(){
		return (
			<WingBlank>
				<WhiteSpace size="lg" />
					{
						this.props.userList.map(v=>(<div key={v._id}>
							<Card onClick={() => this.handleCilck(v)} >
							    <Card.Header
							        title={v.user}
							        thumb={v.avatar ? (require(`../img/${v.avatar}.png`)):null}
							        extra={<span>{v.title}</span>}
						     	/>
						      	<Card.Body>
						      		{v.type==='boss' ? <p className="company">公司：{v.company} </p> : null}
						        	{v.desc.split('\n').map(item=>(<div key={item} >{item}</div>))}
						        	{v.type==='boss' ? <p className="salary">薪资：{v.money} </p> : null}
						      	</Card.Body>
						      	<Card.Footer content="2018-11-7 01:23:28" extra={<div>急需，速度联系我</div>} />
						    </Card>
						    <WhiteSpace size="lg" /></div>	
						))
					}				
			</WingBlank>
		)
	}
}

export default UserCard