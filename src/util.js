
export function getRedirectPath({type,avatar}){
	// 根据用户信息返回跳转地址
	// user.type   /genuis   /boss
	// user.avatar   /genuisinfo  /bossinfo
	let url = (type==='boss') ? '/boss' :'/genuis'
	if(!avatar){
		url += 'info'
	}
	return url;
}

export function getChatId(userId,targetId){
	return [userId,targetId].sort().join('_')
}