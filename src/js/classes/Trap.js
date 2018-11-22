var Sprite = require('phaser').Sprite;
var Character = require('./Character');

function Trap(active) {
	Sprite.call(this);
	this.active = active;
}

Trap.prototype = Object.create(Sprite.prototype);
Trap.prototype.constructor = Trap;

Trap.prototype.kill = function kill(character) {
	if (!(character instanceof Character)) throw new TypeError('Expected a character');
	// TODO: How do we kill a character?
	// Perhaps add Character#kill?
}

module.exports = Trap;
