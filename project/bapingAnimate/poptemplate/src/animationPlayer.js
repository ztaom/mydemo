export default class animationPlayer {
	constructor(data) {
		this.data = data;
		return this;
	}
	create(aft, animationId, element) {
		let data = this.data;
		let animationKey = animationId;
		let animationList = data[animationKey][0].effects;
		let effect = aft.createEffect();
		let animation = aft.createAnimation(element, effect);
		[].forEach.call(animationList, (animationItem) => { 
			// basic
			effect
				.then()
					.ease(animationItem.easing || 'linear')
					.duration(animationItem.duration || 0)
					.delay(animationItem.delay || 0)
					.direction(animationItem.direction || 'normal')
			// style & transform
			let styleList = {};
			for (var styleKey in animationItem.style) {
				if (styleKey === 'transform') {
					let transformMap = new Map(animationItem.style[styleKey]);
					transformMap.forEach(function(key, value) {
						if (value === 'translateX') {
							effect.moveX(transformMap.get(value));
						} else if (value === 'translateY') {
							effect.moveY(transformMap.get(value));
						} else if (value === 'scaleX') {
							effect.scaleX(transformMap.get(value));
						} else if (value === 'scaleY') {
							effect.scaleY(transformMap.get(value));
						} else if (value === 'rotateX') {
							effect.rotateX(transformMap.get(value));
						} else if (value === 'rotateY') {
							effect.rotateY(transformMap.get(value));
						}
					});
				} else {
					styleList[styleKey] = animationItem.style[styleKey];
				}
			}
			effect.css(styleList);
			// loop
			effect.loopAll(1);
		});
		return animation;
	}
}