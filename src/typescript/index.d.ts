import { Sprite } from 'phaser';

declare type CharacterState = 'run' | 'walk' | 'stand';
declare type Direction = 'up' | 'down' | 'right' | 'left';

declare class Character extends Sprite {
	walkSpeed: number;
	runSpeed: number;ç
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
	 * Hides the player, sets this.state to 'hidden' and displays the animation corresponding to
	 * the hiding type.
	 */
	hide(hidingType: HidingType): void;
	interact(sprite: Sprite): void;
}

declare type EnemyState = CharacterState | 'onRoute' | 'pursuit';

declare class Enemy extends Character {
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

declare class Target extends Enemy {
	/**
	 * Special enemy. A level is completed when all targets are killed.
	 * 
	 */
}

declare type HidingType = 'haystack' | 'cave' | 'bushes'

/**
 * An object that can be found sparced around the map. A Player hidden inside
 * cannot be seen by enemies.  
 */

declare class HidingSpot extends Sprite {

	/**
	 * The type of hiding spot. 
	 */
	type: HidingType;
}

declare class Trap extends Sprite {
	active: boolean;

	/**
	 * The trap will kill the given character. This methot will only be called when 'active' is true
	 * and collides with a Character.
	 */
	kill(character: Character): void;
}

declare class Boulder extends Trap {
	direction: Direction;

	/**
	 * While 'active' is true, the Boulder will move in a set Direction until it collides with a wall.
	 */
	move(dir: Direction) : void;
}