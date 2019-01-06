import { BootState } from './states/BootState';
import { MenuState } from './states/MenuState';
import { NewGameState } from './states/NewGameState';
import { PlayState } from './states/PlayState';
import { WIN_HEIGHT, WIN_WIDTH } from './util/constants';

window.onload = function onload() {
	const game = new Phaser.Game(WIN_WIDTH, WIN_HEIGHT, Phaser.AUTO, 'game');

	game.state.add('boot', BootState);
	game.state.add('play', PlayState);
	game.state.add('menu', MenuState);
	game.state.add('newGame', NewGameState);

	// Start boot state
	game.state.start('boot');
};
