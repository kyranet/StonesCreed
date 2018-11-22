var Sprite = require('phaser').Sprite;

function HidingSpot(type) {
	if (!['haystack', 'cave', 'bushes'].includes(type)) throw new Error('Incorrect type.');
	Sprite.call(this);
	this.type = type;
}

HidingSpot.prototype = Object.create(Sprite.prototype);
HidingSpot.prototype.constructor = HidingSpot;

module.exports = HidingSpot;
