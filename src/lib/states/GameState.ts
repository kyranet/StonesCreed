import { GameManager } from '../structures/managers/GameManager';

export class GameState extends Phaser.State {

	public preload() {
		super.preload(this.game);
		if (!GameState.gameManager) GameState.gameManager = new GameManager(this.game);
	}

	public create() {
		super.create(this.game);
		for (const task of GameState.gameManager.pendingOnCreate) task();
		GameState.gameManager.pendingOnCreate.length = 0;
	}

	public update() {
		super.update(this.game);
		GameState.gameManager.update();
	}

	public static gameManager: GameManager = null;
}
