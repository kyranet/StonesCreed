import { GameState } from './GameState';

export class PreloaderState extends GameState {

	private loadingBar: Phaser.Sprite;

	public preload() {
		this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
		this.loadingBar.anchor.setTo(0, 0.5);
		this.load.setPreloadSprite(this.loadingBar);

		// TODO: load here the assets for the game
		this.game.load.spritesheet('player', 'images/player.png', 48, 96);
		this.game.load.spritesheet('enemy', 'images/enemy.png', 48, 96);
		this.game.load.tilemap('Level-0', 'json/Level-0.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('overworld', 'images/overworld.png');
		this.game.load.image('cave', 'images/cave.png');
		this.game.load.image('objects', 'images/objects.png');
		this.game.load.image('logo', 'images/StonesCreed.png');
	}

	public create() {
		this.game.state.start('menu');
	}
}
