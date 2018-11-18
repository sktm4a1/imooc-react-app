import React from 'react'

export default function imoocForm(Comp){
	return class WrappComp extends React.Component{
		constructor(props){
			super(props)
			this.state={}
			this.handleChange = this.handleChange.bind(this)
		}
		handleChange(key,v){			
			this.setState({
				[key]:v
			})
		}
		render(){
			return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
		}
	}
}