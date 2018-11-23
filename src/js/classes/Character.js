var Sprite = require('phaser').Sprite;

function Character() {
	Sprite.call(this);
	this.walkSpeed = 0;
	this.runSpeed = 0;
	this.state = 'stand';
	this.direction = 'down'
	game.physics.enable(object);
}

Character.prototype = Object.create(Sprite.prototype);
Character.prototype.constructor = Character;

Character.prototype.attack = function attack(character) {
	if (!(character instanceof Character)) throw new TypeError('Expected a character');
	this.state = 'dead';
};

Character.prototype.walk = function walk() {
	this.state = 'walk';
	if(this.direction =='down'){
		this.body.velocity.y = this.walkSpeed;
	}
	if(this.direction =='up'){
		this.body.velocity.y = -this.walkSpeed;
	}
	if(this.direction =='left'){
		this.body.velocity.x = -this.walkSpeed;
	}
	if(this.direction =='right'){
		this.body.velocity.x = this.walkSpeed;
	}

};

Character.prototype.run = function run() {
	this.state = 'run';
	if(this.direction =='down'){
		this.body.velocity.y = this.runSpeed;
	}
	if(this.direction =='up'){
		this.body.velocity.y = -this.runSpeed;
	}
	if(this.direction =='left'){
		this.body.velocity.x = -this.runSpeed;
	}
	if(this.direction =='right'){
		this.body.velocity.x = this.runSpeed;
	}
};

Character.prototype.stand = function stand() {
	this.state = 'stand';
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
};

Character.prototype.update = function update() {
	Sprite.prototype.update.call(this);
	switch(this.state){
		case 'stand':
		break;
		case 'walking':
		break;
		case 'running':
		break;
	}
}

Character.prototype.changeDirection = function changeDirection(direction){
	if (!(direction instanceof String)) throw new TypeError('Expected a string');
	if (!(direction != 'up' && direction != 'down' && direction != 'left') && direction != 'right') throw new Error('Expected a direction');

	this.direction = direction;
}

module.exports = Character;
