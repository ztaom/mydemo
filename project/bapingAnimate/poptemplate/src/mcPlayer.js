import animationPlayer from './animationPlayer';

export default class mcPlayer {
	constructor(data) {
		this.data = data;
		return this;
	}
	create(aft, scene, animations) {
		this.aft = aft;
		this.scene = scene;
		let data = this.data;
		let container = aft.createElement('group'); 
		scene.add(container);
		let timelines = [];
		this.timelines = timelines;
		let timeline = this.parseData(data, container, animations);
		return timelines;
	}
	parseData(arrList, parentEl, animations) {
		let aft = this.aft;
		let scene = this.scene;
		let timelines = this.timelines;
		[].forEach.call(arrList, (arrListItem) => {
			let type = arrListItem.type;
			let element;
			let style = arrListItem.style;
			let children = arrListItem.children;
			let cw = parentEl.width || aft.viewportWidth;
			let ch = parentEl.height || aft.viewportHeight;

			// TODO 判断类型
			if (type === 'font') {
				element = aft.createElement('font', style.width, style.height, arrListItem.text, 'center center');
			} else {
				if (children && children.length > 0) {
					element = aft.createElement('group');
				} else {
					element = aft.createElement('rectangle', style.width, style.height);
				}
			}
			
			// style & transform
			for (var key in style) {
				if (key === 'width' || key === 'height') {
					element[key] = style[key];
				} else if (key === 'transform') {
					let transformMap = new Map(style[key]);
					transformMap.forEach(function(key, value) {
						element.transform.set(value, transformMap.get(value));
					});
				} else if (key === 'left' || key === 'x') {
					element.position.set(style[key] - cw / 2 + element.width / 2, undefined);
				} else if (key === 'top' || key === 'y') {
					element.position.set(undefined, - (style[key] - ch / 2) - element.height / 2);
				} else {
					element.style.set(key, style[key]);
				}
			}
			// TODO attr
			// TODO text
			if (arrListItem.text) {
				setTimeout(function() {
					element.domElement.innerHTML = arrListItem.text;
				}, 1000);
			}
			// children
			if (children && children.length > 0) {
				this.parseData(children, element, animations);
			}
			parentEl.add(element);
			// animation & timeline
			if (arrListItem.animation && arrListItem.animation.ref) {
				let id = arrListItem.animation.ref;
				let animation = animations.create(aft, id, element);
				let timeline = aft.createTimeline().add(animation, {
					playAt: 0
				});
				timelines.push(timeline);
			}
		});

	}
}