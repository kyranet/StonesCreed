import { Player } from '../gameObjects/characters/Player';
import { GameObject } from '../gameObjects/GameObject';
import { MapManager } from './MapManager';
import { StorageManager } from './StorageManager';

export class GameManager {
	public mapManager: MapManager = null;
	public storageManager = new StorageManager(this);
	public gameObjects: Set<GameObject> = new Set();
	public gameObjectsGroup: Phaser.Group = null;
	public player: Player = null;
	public playerName: string = null;
	public level = GameLevels.First;
	public pendingOnCreate: Function[] = [];

	public constructor(public game: Phaser.Game) {
		// this.gameObjectsGroup = game.add.group(null, 'gameObjects', undefined, true, Phaser.Physics.ARCADE);
		// this.obstaclesGroup = game.add.group(null, 'obstacles', undefined, true, Phaser.Physics.ARCADE);
		this.gameObjectsGroup = game.add.group(game.world, 'gameObjectsGroup', true, false, Phaser.Physics.ARCADE);
	}

	public clear() {
		for (const gameObject of this.gameObjects) gameObject.destroy(true);
		this.gameObjects.clear();
		return this;
	}

	public update() {
		for (const gameObject of this.gameObjects) gameObject.update();
		this.game.physics.arcade.collide(this.gameObjectsGroup, this.obstaclesGroup, console.log, null, this);
	}

}

/**
 * The game's levels
 */
export enum GameLevels {
	First
}
