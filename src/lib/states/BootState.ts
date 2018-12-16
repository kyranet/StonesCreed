import { GameState } from './GameState';

export class BootState extends GameState {
	public preload() {
		// load here assets required for the loading screen
		this.game.load.image('preloader_bar', 'images/preloader_bar.png');
		this.game.load.spritesheet('player', 'images/player.png', 48, 96);
		this.game.load.spritesheet('enemy', 'images/enemy.png', 48, 96);
	}

	public create() {
		this.game.state.start('preloader');
	}
}
