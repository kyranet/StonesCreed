import { GameManager } from '../structures/managers/GameManager';

export class GameState extends Phaser.State {

	public preload() {
		super.preload();
		if (!GameState.gameManager) GameState.gameManager = new GameManager(this.game);
	}

	public create() {
		super.create();
		for (const task of GameState.gameManager.pendingOnCreate) task();
		GameState.gameManager.pendingOnCreate.length = 0;
	}

	public update() {
		super.update();
		GameState.gameManager.update();
	}

	public static gameManager: GameManager = null;
}
