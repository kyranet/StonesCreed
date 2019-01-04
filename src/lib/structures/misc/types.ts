/**
 * The directions
 */
export enum Direction {
	up,
	down,
	right,
	left
}

/**
 * The boulder states
 */
export enum BoulderState {
	stop,
	move
}

/**
 * The hiding types
 */
export enum HidingType {
	none,
	bushes,
	cave,
	haystack
}

export const CharacterState: ICharacterState = {
	0: 'dead',
	1: 'dying',
	2: 'run',
	3: 'stand',
	4: 'walk',
	dead: 0,
	dying: 1,
	run: 2,
	stand: 3,
	walk: 4,
};

export const PlayerState: IPlayerState = {
	...CharacterState,
	5: 'hidden',
	hidden: 5
};

export const EnemyState: IEnemyState = {
	...CharacterState,
	6: 'backToRoute',
	7: 'onRoute',
	8: 'pursuit',
	9: 'searching',
	backToRoute: 6,
	onRoute: 7,
	pursuit: 8,
	searching: 9
};

/**
 * The character states
 */
interface ICharacterState {
	0: 'dead';
	1: 'dying';
	2: 'run';
	3: 'stand';
	4: 'walk';
	dead: 0;
	dying: 1;
	run: 2;
	stand: 3;
	walk: 4;
}

/**
 * The player states
 */
interface IPlayerState extends ICharacterState {
	5: 'hidden';
	hidden: 5;
}

/**
 * The enemy states
 */
interface IEnemyState extends ICharacterState {
	6: 'backToRoute';
	7: 'onRoute';
	8: 'pursuit';
	9: 'searching';
	backToRoute: 6;
	onRoute: 7;
	pursuit: 8;
	searching: 9;
}
