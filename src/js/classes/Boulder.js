var Trap = require('./Trap');

function Boulder(direction) {
	if (!['up', 'down', 'right', 'left'].includes(direction)) throw new Error('Incorrect direction.');
	Trap.call(this);
	this.direction = direction;
}

Boulder.prototype = Object.create(Trap.prototype);
Boulder.prototype.constructor = Boulder;

Boulder.prototype.move = function move(direction) {
	if (!['up', 'down', 'right', 'left'].includes(direction)) throw new Error('Incorrect direction.');
	this.direction = direction;
}

module.exports = Boulder;
