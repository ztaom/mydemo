# Mtop接口调用 -- src／api/index.js

## 接口列表使用说明

### 1. getGameConfig
- 参数：无
- 功能：页面初始化时，获取用户的游戏基本配置，并显示
- 返回值 - res.data
	``` 
    {
		code: 0, 
		data: {
			boxList:[],
			commonConfig:{
				foodCount,
				gameTime
			},
			foodList:[],
			generalList:[],
			itemList:[],
			loginInfo:{
				client: {
					appkey : '4272',
					buyerId: 0,
					buyerNick: '',
					ip:'10.65.146.178',
					riskLevel: 0,
					sec: true,
					t: 0,
					userDomain: 'tao',
				},
				env: 'daily',
				isApp: false,
				islogin: false,
			}
		}
	}
	```

### 2. getOpponent
- 参数：无
- 功能：已登录用户选择武将时候选择对手
- 返回值：

	```
		{

		}
	```

### 3. usePlayChance 
- 参数：
    1. count: user.count, 
   
- 功能：已登录用户开始游戏，需要使用游戏资格，当返回成功后，用户方可开始游戏
- 返回值：
    ``
		{
			code: 0,
			data: {
				
			}
		}
	```

### 4. queryPlayChance
- 参数：无
- 功能：已登录用户，点击开始游戏时，查询当前用户的游戏资格
- 返回值：
	
	```
		{
			code: 0,
			data: {
				count: 1,
				limit: 10
			}
		}
	```

### 5. addPlayChance
- 参数：
    1. count: params.count,
    2. taskType: params.taskType,
- 功能：根据用户登录信息，获取用户id，给对应用户增加游戏资格，返回当前用户次数和最大次数限制；
- 返回值：result.e.code
    ``
		{
			code: 0,
			data: {
				
			}
		}
	```


### 6. queryBoxStatus
- 参数：
    1. count: params.count,
    2. taskType: params.taskType,
- 功能：查询用户宝箱状态；
- 返回值：result.e.code
    ``
		{
			code: 0,
			data: {
				
			}
		}
	```



### MT上数据配置
- js链接hudong.alicdn.com/api/data/v2/870666c8ac2544c69c80dd5a34d6d579.js
- 数据使用说明：
	
	initData: 游戏基本配置
		type: object
		data: {
			generalList: 武将列表
			foodList: 食材列表
			itemList: 道具列表
			boxList:  宝箱列表
			commonConfig: {
				foodCount: 食物总数
				gameTime: 游戏持续时长
			}  
		}
	myAwardURL: 我的奖品H5地址
	starUrl: 跳转到星球地址
	imgGroup: 静态图片配置
		type: object,
		data: {
			sloginImg: 首页slogin图片地址
			sortIcon: 首页排行榜图标地址
			giftIcon: 首页我的奖品图标地址	
			startBtn: 首页开始游戏按钮
		} 

		