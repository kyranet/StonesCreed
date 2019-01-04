import { TILE_SIZE } from '../../../util/constants';
import { GameManager } from '../../managers/GameManager';
import { Route } from '../../misc/Route';
import { Direction, EnemyState, PlayerState } from '../../misc/types';
import { Character, ICharacterSerialized } from './Character';
import { Player } from './Player';

export class Enemy extends Character {
	public route = new Route();
	protected routeAt = 1;
	protected pov = 80 * (Math.PI / 180);
	protected isTarget = false;
	private reverse = false;
	private playerLastKnownPosition: Phaser.Point = null;
	private pathRoute: Phaser.Point[] = [];
	private updatedRoute = true;
	private timer: Phaser.TimerEvent = null;

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'enemy');
	}

	public setTarget(isTarget: boolean) {
		this.isTarget = isTarget;
		return this;
	}

	public update() {
		super.update();

		// If it's dying or dead, do nothing
		if (this.state === EnemyState.dying || this.state === EnemyState.dead) {
			return;
		}

		// If it's still on pursuit, call onDetection
		if (this.state === EnemyState.pursuit) {
			this.onDetection(this.gameManager.player);
			return;
		}

		// If it detected the player, begin pursuit
		if (this.detectPlayer()) {
			this.onBeginDetection(this.gameManager.player);
			return;
		}

		// If it's searching, let the concurrent system operate
		if (this.state === EnemyState.searching) {
			return;
		}

		if (this.state === EnemyState.backToRoute && this.pathRoute.length) {
			if (!this.moveTowards(this.pathRoute[0])) {
				this.pathRoute.shift();
				if (!this.pathRoute.length) this.setState(EnemyState.onRoute);
			}
			return;
		}

		if (this.route.size > 1) {
			if (!this.moveTowards(this.route.get(this.routeAt))) {
				if (this.routeAt === (this.reverse ? 0 : this.route.size - 1)) this.reverse = !this.reverse;
				this.routeAt += this.reverse ? -1 : 1;
			}
			return;
		}

		this.stand().setState(EnemyState.stand);
	}

	public moveTowards(point: Phaser.Point) {
		const nextDirection = this.findNextDirection(point.x, point.y);
		if (nextDirection === null) {
			this.stand();
			return false;
		}

		this.setDirection(nextDirection).walk();
		return true;
	}

	public findNextDirection(x: number, y: number) {
		if (this.direction === Direction.up || this.direction === Direction.down) {
			const yNext = this.findNextYDirection(y);
			return yNext === null ? this.findNextXDirection(x) : yNext;
		} else {
			const xNext = this.findNextXDirection(x);
			return xNext === null ? this.findNextYDirection(y) : xNext;
		}
	}

	public findNextXDirection(x: number) {
		if (this.body.position.x === x) return null;

		const diff = this.body.position.x - x;
		if (diff < -2) return Direction.right;
		if (diff > 2) return Direction.left;
		this.setPosition(x, this.body.position.y);
		return null;
	}

	public findNextYDirection(y: number) {
		if (this.body.position.y === y) return null;

		const diff = this.body.position.y - y;
		if (diff < -2) return Direction.down;
		if (diff > 2) return Direction.up;
		this.setPosition(this.body.position.x, y);
		return null;
	}

	public setPov(pov: number) {
		this.pov = pov;
		return this;
	}

	public fromJSON(data: IEnemySerialized) {
		super.fromJSON(data);
		this.isTarget = data.isTarget;
		this.pov = data.pov;
		this.route.set(data.route.map((point) => new Phaser.Point(point[0], point[1])));
		return this;
	}

	public toJSON(): IEnemySerialized {
		return {
			...super.toJSON(),
			isTarget: this.isTarget,
			pov: this.pov,
			route: this.route.toJSON(),
			type: 'Enemy'
		};
	}

	private detectPlayer() {
		// If the enemy doesn't see the player, return false
		if (!this.seesPlayer()) return false;
		const { player } = this.gameManager;

		// Draw a line between the enemy and the player
		const line = new Phaser.Line(
			this.body.position.x + this.body.halfWidth,
			this.body.position.y + this.body.halfHeight,
			player.body.position.x + player.body.halfWidth,
			player.body.position.y + player.body.halfHeight);
		const tiles = this.gameManager.state.obstacleLayer.getRayCastTiles(line, 4, true, false)
			.filter((tile) => tile.index !== -1);

		// If there is a tile or more between the enemy and the player,
		// it won't "see" the player unless it's running
		if (tiles.length && player.state !== PlayerState.run) return false;

		// Call onDetection
		this.onBeginDetection(player);

		return true;
	}

	private onBeginDetection(player: Player) {
		// TODO: 1. Show a !
		this.pathRoute.length = 0;
		this.setState(EnemyState.pursuit);
		this.preparePathRoute(player.body.position);
		this.playerLastKnownPosition = player.position.clone();
		if (this.timer) {
			this.game.time.events.remove(this.timer);
			this.timer = null;
		}
	}

	private onDetection(player: Player) {
		// If the player is already in the current path,
		if (this.pathRoute.length && !this.moveTowards(this.pathRoute[0])) {
			// If the enemy sees the player, prepare the new route
			if (this.seesPlayer()) {
				player.body.position.clone(this.playerLastKnownPosition);
				this.preparePathRoute(this.playerLastKnownPosition);
			}
			// If the route has more than one tile, shift until there's only one element
			if (this.pathRoute.length > 1) this.pathRoute.shift();
			// If the enemy reached LKP, call end detection
			else this.onEndDetection();
		}
		// 3. Calculate the shortest path to the player
		// 4. Walk one tile
		// 5. Repeat from the step 3 until the enemy does not find
		//    the player anymore
	}

	private onEndDetection() {
		if (this.timer) return;

		// Cleans up the LKP and path route
		this.playerLastKnownPosition = null;
		this.pathRoute.length = 0;
		// Set state to searching, and holds on for a second
		this.setState(EnemyState.searching);
		let repeat = 0;
		this.timer = this.game.time.events.repeat(Phaser.Timer.SECOND, 4, () => {
			// In the last iteration
			if (++repeat === 4) {
				this.timer = null;
				// After a second has elapsed, change state to backToRoute and
				// calculate the path route to the last point from the route
				this.setState(EnemyState.backToRoute);
				this.preparePathRoute(this.route.get(this.routeAt));
			} else {
				// Rotate the character in three directions
				let next: Direction;
				switch (this.direction) {
					case Direction.down: next = Direction.up; break;
					case Direction.left: next = Direction.right; break;
					case Direction.up: next = Direction.left; break;
					default: next = Direction.down;
				}
				this.setDirection(next);
				this.animations.play(`stand.${Direction[this.direction]}`, 0);
			}
		});
	}

	private preparePathRoute(point: Phaser.Point) {
		// If the route has not been updated yet, cancel the preparation
		if (!this.updatedRoute) return;

		this.updatedRoute = false;
		this.game.pathFinder.setCallbackFunction((route) => {
			this.updatedRoute = true;
			// If null, end the detection
			if (route) {
				this.pathRoute = route.map((value) => new Phaser.Point(value.x * TILE_SIZE, value.y * TILE_SIZE));
				this.pathRoute.shift();
			} else {
				this.onEndDetection();
			}
		});
		const eTiles = this.positionInTiles();
		this.game.pathFinder.preparePathCalculation(
			[Math.floor(eTiles.x), Math.floor(eTiles.y)],
			[Math.floor(point.x / TILE_SIZE), Math.floor(point.y / TILE_SIZE)]
		);
		this.game.pathFinder.calculatePath();
	}

	private seesPlayer() {
		const { player } = this.gameManager;

		// If there is no player or it is hidden, return false
		if (!player || player.hidingSpot) return false;

		// If the player is out of the 5-tile range, return false
		if (this.distanceInTilesTo(player) > 5) return false;

		// Get the relative angle from this enemy to the player
		// If the player is not inside the POV radius, return false
		const direction = this.relativeAngleTo(player);
		const inPOV = Math.abs(direction) < this.pov / 2;
		return inPOV;
	}

}

/**
 * The serialized enemy data
 */
export interface IEnemySerialized extends ICharacterSerialized {
	isTarget: boolean;
	pov: number;
	route: [number, number][];
}
