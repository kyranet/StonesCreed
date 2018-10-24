import { Sprite } from 'phaser';

declare type CharacterState = 'run' | 'walk' | 'stand';

declare class Character extends Sprite {
	walkSpeed: number;
	runSpeed: number;
	direction: 'up' | 'down' | 'right' | 'left';
	state: CharacterState;

	/**
	 * Try to attack a character.
	 * @param character The character this one is attempting to attack
	 */
	attack(character: Character): void;

	/**
	 * Sets this.state to 'walk'.
	 */
	walk(): void;

	/**
	 * Sets this.state to 'run'.
	 */
	run(): void;
}

declare type PlayerState = CharacterState | 'hidden';

declare class Player extends Character {
	// @ts-ignore
	state: PlayerState;

	/**
	 * Hides the player, sets this.state to 'hidden'
	 */
	hide(): void;
}

declare type EnemyState = PlayerState | 'routing' | 'pursuit';

declare class Enemy extends Player {
	/**
	 * Array of (x, y) positions.
	 * @example [[x, y], [x, y], [x, y]]
	 */
	route: Array<[number, number]>;

	// @ts-ignore
	state: EnemyState;

	/**
	 * The pov in radians
	 */
	pov: number;

	/**
	 * Calculates best route to chase the character finding the player, for which
	 * will change to 'pursuit'. If the player dissapears, the Enemy will go to
	 * the last known position. After 2 seconds, this.state changes to 'routing'
	 * and calculates best route to return to the route. Otherwise, if Enemy is
	 * within attack distance from the player, call this.attack(player).
	 */
	chase(): void;
}
