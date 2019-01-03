import { PathFinderPlugin } from '../plugins/PathFinderPlugin';
import { GameState } from './GameState';

export class BootState extends GameState {
	public preload() {
		// load here assets required for the loading screen
		this.game.load.image('preloader_bar', 'images/preloader_bar.png');
	}

	public create() {
		this.game.pathFinder = this.game.plugins.add(PathFinderPlugin);
		this.game.state.start('preloader');
	}
}
