var houses = [
	{
		name: 'About House',
		id: '#aboutHouse',
		width: 200,
		height: 140,
		top: 470,
		left: 50,
		right: null,
		door: {
			width: 36,
			height: 39,
			left: 41,
			top: 100
		}
	},
	{
		name: 'Services House',
		id: '#servicesHouse',
		width: 200,
		height: 165,
		top: 754,
		left: null,
		right: 50,
		door: {
			width: 16,
			height: 32,
			left: 101,
			top: 133
		}		
	},
	{
		name: 'Portfolio House',
		id: '#portfolioHouse',
		width: 240,
		height: 154,
		top: 950,
		left: 50,
		right: null,
		door: {
			width: 32,
			height: 33,
			left: 105,
			top: 119
		}		
	}
];

var roads = [
	{
		name: 'About Road',
		id: '#aboutRoad',
		height: 200,
		top: 500,
		direction: 'left'
	},
	{
		name: 'Services Road',
		id: '#servicesRoad',
		height: 200,
		top: 784,
		direction: 'right'
	},
	{
		name: 'Portfolio Road',
		id: '#portfolioRoad',
		height: 200,
		top: 1000,
		direction: 'left'
	}
];

var notifications = [
	{
		id: 1,
		type: 'error',
		text: 'You can\'t teleport me here...',
		img: 'images/error.png'
	},
	{
		id: 2,
		type: 'info',
		text: 'If you\'re too lazy to walk, you can teleport yourself by clicking on the top navigation bar items',
		img: 'images/information.png'
	},
	{
		id: 3,
		type: 'info',
		text: 'Press "Return" on your keyboard or click with your mouse on the ship to sail and contact me!',
		img: 'images/information.png'
	},
	{
		id: 4,
		type: 'error',
		text: 'Stop trying to drown me down!!!',
		img: 'images/error.png'
	},
]