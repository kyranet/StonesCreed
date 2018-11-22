var Character = require('./Character');
var Sprite = require('phaser').Sprite;

function Player() {
	Character.call(this);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.hide = function hide(hydingType) {
	if (typeof hydingType !== 'string') throw new TypeError('Expected a string.');
	if (!['haystack', 'cave', 'bushes'].includes(hydingType)) throw new Error('Incorrect type.');
	// TODO: What do we do with hydingType?
	this.state = 'hidden';
};

Player.prototype.interact = function interact(sprite) {
	if (!(sprite instanceof Sprite)) throw new TypeError('Expected a Sprite instance.');
	// TODO: Add interact logic
}

module.exports = Player;
