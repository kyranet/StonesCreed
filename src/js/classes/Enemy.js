var Character = require('./Character');

function Enemy() {
	Character.call(this);

	// TODO: Fill this route with code later
	this.route = [];

	// TODO: Assign another pov, current 85% 180º
	this.pov = Math.PI * 0.85;

	// TODO: Add a method to make this editable
	this.isTarget = false;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.chase = function chase() {
	// TODO: How do we know the Player's position?
	// TODO: Implement actual logic
	this.state = 'pursuit';
}

// TODO: Implement method to reset pursuit to onRoute, including
// the usage of Dijkstra's algorithm to go back to the previous route.
// TODO: Add method to pinpoint positions to the route

module.exports = Enemy;
