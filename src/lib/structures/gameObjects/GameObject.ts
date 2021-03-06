import { GameManager } from '../managers/GameManager';
import { GameObjectFactory } from './GameObjectFactory';

export class GameObject extends Phaser.Sprite {

	public body: Phaser.Physics.Arcade.Body;

	public constructor(public gameManager: GameManager, x: number, y: number, key?: string, frame?: string | number) {
		super(gameManager.game, x, y, key, frame);
		// Add the gameobject itself to the game
		this.game.add.existing(this);
		this.game.physics.arcade.enable(this);
		this.gameManager.gameObjectsGroup.add(this);
		this.body.collideWorldBounds = true;
		this.body.allowRotation = false;
		this.body.allowGravity = false;
		this.body.immovable = true;
		this.smoothed = false;
	}

	public collides(gameObject: GameObject) {
		if (!(gameObject instanceof GameObject)) throw new TypeError(`"gameObject" must be an instance of GameObject.`);
		return true;
	}

	/**
	 * Set the position for this game object
	 * @param x The new x position
	 * @param y The new y position
	 */
	public setPosition(x: number, y: number) {
		this.body.position.x = x;
		this.body.position.y = y;
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

	public fromJSON(data: IGameObjectSerialized) {
		this.name = data.name;
		this.setVelocity(data.velocity.x, data.velocity.y);
		return this;
	}

	public toJSON(): IGameObjectSerialized {
		return {
			frame: this.frame,
			key: this.key as string,
			name: this.name,
			position: {
				x: this.position.x,
				y: this.position.y
			},
			type: 'GameObject',
			velocity: {
				x: this.body.velocity.x,
				y: this.body.velocity.y
			}
		};
	}

	public positionInTiles() {
		return new Phaser.Point(this.body.position.x / TILE_SIZE, this.body.position.y / TILE_SIZE);
	}

	public distanceTo(gameObject: GameObject) {
		return this.body.position.distance(gameObject.body.position);
	}

	public distanceInTilesTo(gameObject: GameObject) {
		return this.distanceTo(gameObject) / TILE_SIZE;
	}

	public angleTo(gameObject: GameObject) {
		return Math.atan2(gameObject.body.position.y - this.body.position.y, gameObject.body.position.x - this.body.position.x);
	}

	public static factory = new GameObjectFactory();

}

import { TILE_SIZE } from '../../util/constants';
import { Character } from './characters/Character';
import { Enemy } from './characters/Enemy';
import { Player } from './characters/Player';
import { HidingSpot } from './hidingSpots/HidingSpot';
import { Boulder } from './traps/Boulder';
import { Trap } from './traps/Trap';

GameObject.factory.set('GameObject', GameObject);
GameObject.factory.set('Character', Character);
GameObject.factory.set('Player', Player);
GameObject.factory.set('Enemy', Enemy);
GameObject.factory.set('HidingSpot', HidingSpot);
GameObject.factory.set('Boulder', Boulder);
GameObject.factory.set('Trap', Trap);

/**
 * The serialized game object data
 */
export interface IGameObjectSerialized {
	frame: string | number;
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
