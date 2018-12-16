import { Player } from '../gameObjects/characters/Player';
import { GameObject, IGameObjectSerialized } from '../gameObjects/GameObject';
import { GameManager } from './GameManager';

export class StorageManager {

	public constructor(private readonly gameManager: GameManager) { }

	public save() {
		localStorage.clear();
		localStorage.setItem('gameObjects', JSON.stringify(this.gameManager.gameObjectsGroup.children));
		localStorage.setItem('level', this.gameManager.level.toString());
		localStorage.setItem('playerName', this.gameManager.playerName);
	}

	public load() {
		// Clear the game manager
		this.gameManager.clear();

		// Load the data
		const rawLevel = localStorage.getItem('level');
		if (rawLevel === null) throw new Error(`Could not find a saved file.`);
		const level = Number(rawLevel);

		this.gameManager.level = level;

		const gameObjects = JSON.parse(localStorage.getItem('gameObjects')) as IGameObjectSerialized[];
		if (gameObjects) this.loadGameObjects(gameObjects);

		const playerName = localStorage.getItem('playerName');
		if (playerName) this.loadPlayerName(playerName);
	}

	public loadGameObjects(gameObjects: IGameObjectSerialized[]) {
		for (const gameObject of gameObjects) {
			const Ctor = GameObject.factory.get(gameObject.type);
			if (!Ctor) throw new Error(`Could not find a constructor for ${gameObject.type || 'unknown'}. Aborting.`);
			const instance = new Ctor(this.gameManager, gameObject.position.x, gameObject.position.y, gameObject.key, gameObject.frame).fromJSON(gameObject);
			if (gameObject.type === 'Player') this.gameManager.player = instance as Player;
		}
	}

	public loadPlayerName(playerName: string) {
		this.gameManager.playerName = playerName;
	}

}
