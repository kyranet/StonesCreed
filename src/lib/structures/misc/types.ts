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
	dead: 0,
	dying: 1,
	run: 2,
	stand: 3,
	walk: 4,
};

export const PlayerState: IPlayerState = {
	...CharacterState,
	hidden: 5
};

export const EnemyState: IEnemyState = {
	...CharacterState,
	onRoute: 6,
	pursuit: 7
};

/**
 * The character states
 */
interface ICharacterState {
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
	hidden: 5;
}

/**
 * The enemy states
 */
interface IEnemyState extends ICharacterState {
	onRoute: 6;
	pursuit: 7;
}
