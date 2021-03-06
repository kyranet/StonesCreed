/**
 * The array route data
 */
export interface ArrayRoute extends Array<Phaser.Point> { }

export class Route {
	private route: ArrayRoute = [];

	public get size() {
		return this.route.length;
	}

	public get(position: number) {
		return position < this.route.length ? this.route[position] : null;
	}

	/**
	 * Set a new route for this instance
	 * @param route The new route
	 */
	public set(route: ArrayRoute) {
		this.route = route;
		return this;
	}

	/**
	 * Add a new route position
	 * @param x The new x position
	 * @param y The new y position
	 */
	public add(x: number, y: number): this;
	public add(point: Phaser.Point): this;
	public add(x: number | Phaser.Point, y?: number) {
		this.route.push(typeof x === 'number' ? new Phaser.Point(x, y) : x);
		return this;
	}

	/**
	 * Remove a route position
	 * @param x The x position
	 * @param y The y position
	 */
	public remove(x: number, y: number): this;
	public remove(position: [number, number]): this;
	public remove(x: number | [number, number], y?: number) {
		const position = typeof x === 'number' ? [x, y] as [number, number] : x;
		const index = this.route.findIndex((route) => route[0] === position[0] && route[0] === position[1]);
		if (index !== -1) this.route.splice(index, 1);
		return this;
	}

	/**
	 * Reset this route
	 */
	public reset() {
		this.route.length = 0;
		return this;
	}

	public toJSON() {
		return this.route.map((point) => [point.x, point.y]) as [number, number][];
	}

}
