var Sprite = require('phaser').Sprite;

function Character() {
	Sprite.call(this);
	this.walkSpeed = 0;
	this.runSpeed = 0;
	this.state = 'stand';
	this.direction = 'down'
	this.game.physics.enable(this);
}

Character.prototype = Object.create(Sprite.prototype);
Character.prototype.constructor = Character;

Character.prototype.attack = function attack(character) {
	if (!(character instanceof Character)) throw new TypeError('Expected a character');
	character.state = 'dead';
};

Character.prototype.walk = function walk() {
	this.state = 'walk';
	switch (this.direction) {
		case 'down': this.body.velocity.y = this.walkSpeed; break;
		case 'up': this.body.velocity.y = -this.walkSpeed; break;
		case 'left': this.body.velocity.x = -this.walkSpeed; break;
		case 'right': this.body.velocity.x = this.walkSpeed; break;
	}
};

Character.prototype.run = function run() {
	this.state = 'run';
	switch (this.direction) {
		case 'down': this.body.velocity.y = this.runSpeed; break;
		case 'up': this.body.velocity.y = -this.runSpeed; break;
		case 'left': this.body.velocity.x = -this.runSpeed; break;
		case 'right': this.body.velocity.x = this.runSpeed; break;
	}
};

Character.prototype.stand = function stand() {
	this.state = 'stand';
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
};

Character.prototype.changeDirection = function changeDirection(direction) {
	if (typeof direction !== 'string') throw new TypeError('Expected a string');
	if (!['up', 'down', 'left', 'right'].includes(direction)) throw new Error('Expected a direction');
	this.direction = direction;
}

// Character.prototype.update = function update() {
// 	Sprite.prototype.update.call(this);
// 	switch(this.state){
// 		case 'stand':
// 		break;
// 		case 'walking':
// 		break;
// 		case 'running':
// 		break;
// 	}
// }

module.exports = Character;
