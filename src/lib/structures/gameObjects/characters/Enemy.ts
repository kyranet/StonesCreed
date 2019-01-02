import { GameManager } from '../../managers/GameManager';
import { Route } from '../../misc/Route';
import { Direction, EnemyState } from '../../misc/types';
import { Character, ICharacterSerialized } from './Character';

export class Enemy extends Character {
	public route = new Route();
	protected routeAt = 1;
	protected pov = 80 * (Math.PI / 180);
	protected isTarget = false;
	protected onRoute = true;
	protected reverse = false;

	public constructor(gameManager: GameManager, x: number, y: number) {
		super(gameManager, x, y, 'enemy');
	}

	public setTarget(isTarget: boolean) {
		this.isTarget = isTarget;
		return this;
	}

	public update() {
		super.update();

		this.detectPlayer();
		if (this.onRoute && this.route.size > 1) {
			const [x, y] = this.route.get(this.routeAt);
			if (!this.moveTowards(x, y)) {
				if (this.routeAt === (this.reverse ? 0 : this.route.size - 1)) this.reverse = !this.reverse;
				this.routeAt += this.reverse ? -1 : 1;
			}
		}
	}

	public kill() {
		this.onRoute = false;
		return super.kill();
	}

	public moveTowards(x: number, y: number) {
		const nextDirection = this.findNextDirection(x, y);
		if (nextDirection === null) {
			this.stand();
			return false;
		}

		this.changeDirection(nextDirection).walk();
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
		if (this.position.x === x) return null;

		const diff = this.position.x - x;
		if (diff < -2) return Direction.right;
		if (diff > 2) return Direction.left;
		this.setPosition(x, this.position.y);
		return null;
	}

	public findNextYDirection(y: number) {
		if (this.position.y === y) return null;

		const diff = this.position.y - y;
		if (diff < -2) return Direction.down;
		if (diff > 2) return Direction.up;
		this.setPosition(this.position.x, y);
		return null;
	}

	public setPov(pov: number) {
		this.pov = pov;
		return this;
	}

	public chase() {
		// TODO: How do we know the Player's position?
		// TODO: Implement actual logic
		this.setState(EnemyState.pursuit);

		// TODO: Implement method to reset pursuit to onRoute, including
		// the usage of Dijkstra's algorithm to go back to the previous route.
		// TODO: Add method to pinpoint positions to the route
	}

	public fromJSON(data: IEnemySerialized) {
		super.fromJSON(data);
		this.isTarget = data.isTarget;
		this.pov = data.pov;
		this.route.set(data.route);
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
		const { player } = this.gameManager;

		// If there is no player or it is hidden, return false
		if (!player || player.hidingSpot) return false;

		// If the player is out of the 5-tile range, return false
		if (this.distanceInTilesTo(player) > 5) return false;

		// Get the relative angle from this enemy to the player
		// If the player is not inside the POV radius, return false
		const direction = this.relativeAngleTo(player);
		const inPOV = Math.abs(direction) < this.pov / 2;
		if (!inPOV) return false;

		// TODO: Add collision/obstacle detection
		// this.gameManager.state.obstacleLayer.layer.data;

		// TODO: Remove console.log once all changes are done
		console.log(`I am near, and I'm seeing you at ${Math.floor(direction * 180 / Math.PI)} degrees from me.`);

		// Call onDetection
		this.onDetection();

		return true;
	}

	private onDetection() {
		// TODO: Implement this method
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
