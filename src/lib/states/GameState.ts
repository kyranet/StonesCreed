export class GameState extends Phaser.State {

	public create() {
		super.create(this.game);
		for (const task of GameState.pendingOnCreate) task(this);
		GameState.pendingOnCreate.length = 0;
	}

	public static pendingOnCreate: Function[] = [];
}
