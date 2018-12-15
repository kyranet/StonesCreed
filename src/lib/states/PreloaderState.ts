export class PreloaderState extends Phaser.State {

	private loadingBar: Phaser.Sprite;

	public preload() {
		this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
		this.loadingBar.anchor.setTo(0, 0.5);
		this.load.setPreloadSprite(this.loadingBar);

		// TODO: load here the assets for the game
		this.game.load.image('logo', 'images/StonesCreed.png');
		this.game.load.spritesheet('overworld', 'images/overworld.png', 16, 16);
		this.game.load.spritesheet('cave', 'images/cave.png', 16, 16);
		this.game.load.spritesheet('objects', 'images/objects.png', 16, 16);
	}

	public create() {
		this.game.state.start('menu');
	}
}
