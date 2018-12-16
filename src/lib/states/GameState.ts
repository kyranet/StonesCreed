import { GameManager } from '../structures/managers/GameManager';

export class GameState extends Phaser.State {

	public preload() {
		super.preload();
		if (!GameState.gameManager) GameState.gameManager = new GameManager(this.game);
	}

	public create() {
		super.create();
		for (const task of GameState.gameManager.pendingOnCreate) task();
	}

	public static gameManager: GameManager = null;
}
