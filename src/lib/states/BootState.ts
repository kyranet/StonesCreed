import { GameState } from './GameState';

export class BootState extends GameState {
	public preload() {
		super.preload();
		// load here assets required for the loading screen
		this.game.load.image('preloader_bar', 'images/preloader_bar.png');
		this.game.load.spritesheet('player', 'images/player.png', 16, 32);
	}

	public create() {
		this.game.state.start('preloader');
	}
}
