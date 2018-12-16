import { GameManager } from '../managers/GameManager';
import { GameObjectFactory } from './GameObjectFactory';

export class GameObject extends Phaser.Sprite {

	public constructor(public gameManager: GameManager, x: number, y: number, key?: string, frame?: string) {
		super(gameManager.game, x, y, key, frame);
		// Add the gameobject itself to the game
		this.game.add.existing(this);
		this.game.physics.arcade.enable(this);
		this.gameManager.gameObjects.add(this);
		this.smoothed = false;
		console.log(this);
	}

	public destroy(destroyChildren?: boolean) {
		console.log(`Destroying GameObject ${this.key}`);
		super.destroy(destroyChildren);
	}

	/**
	 * Set the position for this game object
	 * @param x The new x position
	 * @param y The new y position
	 */
	public setPosition(x: number, y: number) {
		this.body.x = x;
		this.body.y = y;
		return this;
	}

	/**
	 * Set the velocity for this game object
	 * @param x The new x velocity
	 * @param y The new y velocity
	 */
	public setVelocity(x: number, y: number) {
		this.body.velocity.x = x;
		this.body.velocity.y = y;
		return this;
	}

	/**
	 * Interacts with a game object from the game
	 * @param gameObject The game object to interact with
	 */
	public interact(gameObject: GameObject) {
		gameObject.interaction(this);
		return this;
	}

	/**
	 * Handle the interactions to this game object
	 * @param gameObject The game object that interacted with this instance
	 */
	public interaction(gameObject: GameObject) {
		if (!(gameObject instanceof GameObject))
		throw new TypeError(`Expected gameObject to be a GameObject instance`);
	}

	public toJSON(): IGameObjectSerialized {
		return {
			frame: this.frame as string,
			key: this.key as string,
			name: this.name,
			position: {
				x: this.position.x,
				y: this.position.y
			},
			type: this.constructor.name,
			velocity: {
				x: this.body.velocity.x,
				y: this.body.velocity.y
			}
		};
	}

	public fromJSON(data: IGameObjectSerialized) {
		this.frame = data.frame;
		this.key = data.key;
		this.name = data.name;
		return this
		.setPosition(data.position.x, data.position.y)
		.setVelocity(data.velocity.x, data.velocity.y);
	}

	public static factory = new GameObjectFactory();

}

import { Character } from './characters/Character';
import { Enemy } from './characters/Enemy';
import { NPC } from './characters/NPC';
import { Player } from './characters/Player';
import { HidingSpot } from './hidingSpots/HidingSpot';
import { Boulder } from './traps/Boulder';
import { Trap } from './traps/Trap';

GameObject.factory.set('GameObject', GameObject);
GameObject.factory.set('Character', Character);
GameObject.factory.set('Player', Player);
GameObject.factory.set('Enemy', Enemy);
GameObject.factory.set('NPC', NPC);
GameObject.factory.set('HidingSpot', HidingSpot);
GameObject.factory.set('Boulder', Boulder);
GameObject.factory.set('Trap', Trap);

/**
 * The serialized game object data
 */
export interface IGameObjectSerialized {
	frame: string;
	key: string;
	name: string;
	position: {
		x: number;
		y: number;
	};
	type: string;
	velocity: {
		x: number;
		y: number;
	};
}
