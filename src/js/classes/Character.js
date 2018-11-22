var Sprite = require('phaser').Sprite;

function Character() {
	Sprite.call(this);
	this.walkSpeed = 0;
	this.runSpeed = 0;
	this.state = 'stand';
}

Character.prototype = Object.create(Sprite.prototype);
Character.prototype.constructor = Character;

Character.prototype.attack = function attack(character) {
	if (!(character instanceof Character)) throw new TypeError('Expected a character');
	// TODO: How do we interact?
};

Character.prototype.walk = function walk() {
	this.state = 'walk';
	// TODO: Clarify what to do with this.walkSpeed
};

Character.prototype.run = function run() {
	this.state = 'run';
	// TODO: Clarify what to do with this.runSpeed
};

Character.prototype.stand = function stand() {
	this.state = 'stand';
};

module.exports = Character;
