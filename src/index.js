import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import {
	createStore,
	applyMiddleware
} from 'redux'

import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
import './config'
import './index.css'
import Authroute from './component/authRoute/authroute'
import Dashboard from './component/dashboard/dashboard'
import Bossinfo from './container/bossinfo/bossinfo'
import Genuisinfo from './container/genuisinfo/genuisinfo'
import Chat from './component/chat/chat'

// applyMiddleware 为 createStore 注入了 middleware thunk处理异步action:
const store = createStore(reducers,applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>	
			<div>
				<Authroute></Authroute>
				<Switch>
					<Route path="/bossinfo" component={Bossinfo} ></Route>
					<Route path="/genuisinfo" component={Genuisinfo} ></Route>
					<Route path="/login" component={Login} ></Route>
					<Route path="/register" component={Register} ></Route>
					<Route path="/chat/:user" component={Chat} ></Route>
					<Route component={Dashboard} ></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)




