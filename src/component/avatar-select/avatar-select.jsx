import React from 'react'
import { Grid,List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		const avatarList = 'boy,man,woman,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
						.split(',').map(function(elem, index) {
							return {
								icon:require(`../img/${elem}.png`),
								text:elem
							}
						})
		const gridHeader = this.state.icon ? (<div style={{height:20}}>
							<span>已选择头像</span>
							<img style={{height:20,verticalAlign: 'top'}} src={this.state.icon} alt="选择头像" />
					</div>)	: '请选择头像'			
		return (
			<List renderHeader={() =>gridHeader} >
				<Grid onClick={_el => {
					this.props.selectAvatar(_el.text)
					this.setState(_el)
				}} data={avatarList} columnNum={5} />
			</List>
		)
	}
}

AvatarSelector.propTypes = {
	selectAvatar:PropTypes.func.isRequired
}

export default AvatarSelector