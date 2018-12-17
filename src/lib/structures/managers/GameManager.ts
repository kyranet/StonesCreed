import { Player } from '../gameObjects/characters/Player';
import { GameObject } from '../gameObjects/GameObject';
import { MapManager } from './MapManager';
import { StorageManager } from './StorageManager';

export class GameManager {
	public mapManager: MapManager = null;
	public storageManager = new StorageManager(this);
	public gameObjectsGroup: Phaser.Group = null;
	public player: Player = null;
	public playerName: string = null;
	public level = GameLevels.First;
	public pendingOnCreate: Function[] = [];

	public constructor(public game: Phaser.Game) {
		// this.gameObjectsGroup = game.add.group(null, 'gameObjects', undefined, true, Phaser.Physics.ARCADE);
		// this.obstaclesGroup = game.add.group(null, 'obstacles', undefined, true, Phaser.Physics.ARCADE);
		// this.gameObjectsGroup = game.add.group(null, 'gameObjectsGroup', true, false, Phaser.Physics.ARCADE);
		this.gameObjectsGroup = this.game.add.group();
		this.gameObjectsGroup.name = 'gameObjectsGroup';
		this.gameObjectsGroup.enableBody = true;
		this.gameObjectsGroup.enableBodyDebug = true;
		this.gameObjectsGroup.renderable = true;
		console.log(this);
	}

	public clear() {
		this.gameObjectsGroup.killAll();
		return this;
	}

	public update() {
		for (const gameObject of this.gameObjectsGroup.children as GameObject[]) {
			gameObject.update();
		}
		this.game.physics.arcade.collide(this.gameObjectsGroup, undefined, (g1: GameObject, g2: GameObject) => g1.collides(g2) && g2.collides(g1));
		this.gameObjectsGroup.sort('y', Phaser.Group.SORT_ASCENDING);
	}

}

/**
 * The game's levels
 */
export enum GameLevels {
	First
}
