import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use(function(config){
	Toast.loading('正在加载',0)
	return config
})
axios.interceptors.response.use(function(config){
	Toast.hide()
	return config
})