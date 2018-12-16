import { GameManager } from '../structures/managers/GameManager';

export class GameState extends Phaser.State {

	public preload() {
		if (!GameState.gameManager) GameState.gameManager = new GameManager(this.game);
	}
	public static gameManager: GameManager = null;
}
