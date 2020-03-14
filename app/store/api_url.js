import config from '../config';  

export const API_USER = config.baseUrl + 'user'; //用户信息
export const API_USER_REGISTER = config.baseUrl + 'register'; //用户注册
export const API_USER_LOGIN = config.baseUrl + 'login'; //用户登录

export const API_AX = config.baseUrl + 'ax';     //斧头 
export const API_AX_USER = config.baseUrl + 'ax/user/';  //斧头
export const API_AX_USER_FOCUS = config.baseUrl + 'ax/userFocus/';  //关注的用户斧头列表
export const API_AX_READ = config.baseUrl + 'axRead';  //斧头阅读记录
export const API_AX_SEARCH = config.baseUrl + 'ax/search';  //搜索斧头

export const API_AX_COLLECTION = config.baseUrl + 'axCollection';  //斧头收藏
export const API_AX_ISCOLLECTION = config.baseUrl + 'axCollection/isCollected';  //斧头收藏

export const API_USER_FRIEND = config.baseUrl + 'userFriend';  //用户关注好友

export const API_AX_PRAISE = config.baseUrl + 'axPraise';  //斧头点赞
export const API_AX_ISPRAISE = config.baseUrl + 'axPraise/isPraised';  //是否点赞了

export const API_COMMENT = config.baseUrl + 'comment';  //评论
export const API_SEARCH = config.baseUrl + 'search';    //搜索记录