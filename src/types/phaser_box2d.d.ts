/// <reference path="phaser.d.ts" />
/// <reference path="box2d.d.ts" />

declare namespace Phaser {

	namespace Physics {

		class Box2D {

			public constructor(game: Phaser.Game, config?: any);

			// @property {Phaser.Game} game - Local reference to game.
			public game: Phaser.Game;
			// @property {string} version - The version of the Box2D Plugin that is running.
			public version: string;
			// @property {number} ptmRatio - Pixels to Meters ratio - @default 50
			public ptmRatio: number;
			// @property {box2d.b2World} world - The Box2D world in which the simulation is run.
			public world: box2d.b2World;
			// @property {Phaser.Physics.Box2D.DefaultDebugDraw} - used for rendering debug information
			public debugDraw: Box2D.DefaultDebugDraw;
			// @property {Phaser.Physics.Box2D.DefaultContactListener} - used to check if bodies have contact callbacks set
			public contactListener: Box2D.DefaultContactListener;
			// @property {number} nextBodyId - The id to give the next created body
			public nextBodyId: number;
			//  @property {number} nextFixtureId - The id to give the next created fixture
			public nextFixtureId: number;
			// @property {box2d.b2Vec2} gravity - The gravity of the Box2D world.
			public gravity: Box2D.PointProxy;
			// @property {number} friction - The default friction for fixtures created by 'enable', or other functions like setRectangle, setPolygon etc
			public friction: number;
			// @property {number} restitution - The default restitution for fixtures created by 'enable', or other functions like setRectangle, setPolygon etc
			public restitution: number;
			// @property {number} density - The default density for fixtures created by 'enable', or other functions like setRectangle, setPolygon etc
			public density: number;
			// @property {number} frameRate - The frame rate the world will be stepped at. Defaults to 1 / 60, but you can change here. Also see useElapsedTime property.
			public frameRate: number;
			// @property {number} velocityIterations - The maximum number of iterations allowed to adjust velocities to match constraints. Defaults to 8.
			public velocityIterations: number;
			// @property {number} positionIterations - The maximum number of iterations allowed to adjust positions to match constraints. Defaults to 3.
			public positionIterations: number;
			// @property {boolean} useElapsedTime - If true the frameRate value will be ignored and instead Box2D will step with the value of Game.Time.physicsElapsed, which is a delta time value.
			public useElapsedTime: boolean;
			// @property {boolean} paused - The paused state of the Box2D world.
			public paused: boolean;
			// @property {box2d.b2ParticleSystem} particleSystem - The World Particle System. Enabled with World.createParticleSystem.
			public particleSystem: box2d.b2ParticleSystem;
			// @property {box2d.b2Body} mouseJointBody - A static body with no fixtures, used internally as the 'body A' for mouse joints when dragging dynamic bodies.
			public mouseJointBody: box2d.b2Body;
			// @property {box2d.b2MouseJoint} mouseJoint - The active mouse joint for dragging dynamic bodies.
			public mouseJoint: box2d.b2MouseJoint;
			// Pixel to meter function overrides.
			// mpx: Function;
			// pxm: Function;
			// @property {object} walls - An object containing the 4 wall bodies that bound the physics world.
			public walls: Box2D.WallsObject;
			// @property {Phaser.Signal} onBodyAdded - Dispatched when a new Body is added to the World.
			public onBodyAdded: Phaser.Signal;
			// @property {Phaser.Signal} onBodyRemoved - Dispatched when a Body is removed from the World.
			public onBodyRemoved: Phaser.Signal;

			public static worldBoundsFilterCategory: number;

			// Returns the next id to use to keep body ids unique
			public getNextBodyId(): number;
			// Returns the next id to use to keep fixture ids unique
			public getNextFixtureId(): number;
			// This will add a Box2D physics body into the removal list for the next step.
			public removeBodyNextStep(body: Box2D.Body): void;
			// Called at the start of the core update loop. Purges flagged bodies from the world.
			public preUpdate(): void;
			// This will create a Box2D physics body on the given game object or array of game objects.
			// A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
			// Note: When the game object is enabled for Box2D physics it has its anchor x/y set to 0.5 so it becomes centered.
			public enable(object: any, children?: boolean): void;
			// Creates a Box2D physics body on the given game object.
			// A game object can only have 1 physics body active at any one time, and it can't be changed until the body is nulled.
			public enableBody(object: any): void;
			// Sets the bounds of the Physics world to match the Game.World dimensions.
			// You can optionally set which 'walls' to create: left, right, top or bottom.
			public setBoundsToWorld(left?: boolean, right?: boolean, top?: boolean, bottom?: boolean, collisionCategory?: number, collisionMask?: number): void;
			// Sets the bounds of the Physics world to match the given world pixel dimensions.
			// You can optionally set which 'walls' to create: left, right, top or bottom.
			public setBounds(x: number, y: number, width: number, height: number,
				left?: boolean, right?: boolean, top?: boolean, bottom?: boolean, collisionCategory?: number, collisionMask?: number): void;
			// Pauses the Box2D world independent of the game pause state.
			public pause(): void;
			// Resumes a paused Box2D world.
			public resume(): void;
			// Internal Box2D update loop.
			public update(): void;
			// Clears all bodies from the simulation, resets callbacks.
			public reset(): void;
			// Clears all bodies from the simulation, resets callbacks.
			public clear(): void;
			// Clears all bodies from the simulation and unlinks World from Game. Should only be called on game shutdown. Call `clear` on a State change.
			public destroy(): void;
			// Creates a new Body and adds it to the World.
			public createBody(x?: number, y?: number, density?: number): Box2D.Body;
			// Creates a new dynamic Body and adds a Circle fixture to it of the given size.
			public createCircle(x?: number, y?: number, radius?: number, offsetX?: number, offsetY?: number): Box2D.Body;
			// Creates a new dynamic Body and adds a Rectangle fixture to it of the given dimensions.
			public createRectangle(x?: number, y?: number, width?: number, height?: number, offsetX?: number, offsetY?: number, rotation?: number): Box2D.Body;
			// Creates a new dynamic Body and adds a Polygon fixture to it.
			public createPolygon(x: number, y: number, vertices: number[], firstIndex?: number, count?: number): Box2D.Body;
			// Adds an already created Box2D Body to this Box2D world.
			public addBody(body: Box2D.Body): boolean;
			// Removes a body from the world. This will silently fail if the body wasn't part of the world to begin with.
			public removeBody(body: Box2D.Body): Box2D.Body;
			// Populates and returns an array with references to of all current Bodies in the world.
			public getBodies(): Box2D.Body[];
			// Checks the given object to see if it has a Box2D body and if so returns it.
			public getBody(object: Object): Box2D.Body;
			// Converts the current world into a JSON object.
			public toJSON(): any;
			// Convert Box2D physics value (meters) to pixel scale.
			// By default we use a scale of 50px per meter.
			// If you need to modify this you can over-ride these functions via the Physics Configuration object.
			public mpx(v: number): number;
			// Convert pixel value to Box2D physics scale (meters).
			// By default we use a scale of 50px per meter.
			// If you need to modify this you can over-ride these functions via the Physics Configuration object.
			public pxm(v: number): number;
			// Runs the standard 'debug draw' rendering. What actually gets drawn will depend
			// on the current status of the flags set in the debug draw object held by the b2World.
			// This could perhaps be made modifiable at runtime, but for now it is just rendering
			// shapes (see usage of b2Shapes flag below).
			public renderDebugDraw(context: CanvasRenderingContext2D): void;
			// Renders information about the body as text. This is intended to be used internally by Phaser.Utils.Debug.
			// To make use of this from your code you would call something like game.debug.bodyInfo(sprite, x, y)
			public renderBodyInfo(debug: Utils.Debug, body: Box2D.Body): void;
			// Returns all fixtures found under the given point. Set the onlyOne parameter to true if you only
			// care about finding one fixture under the point.
			public getFixturesAtPoint(x: number, y: number, onlyOne?: boolean, onlyDynamic?: boolean): box2d.b2Fixture[];
			// Returns all bodies (Phaser.Physics.Box2D.Body) found under the given coordinates. Set the onlyOne
			// parameter to true if you only care about finding one body.
			public getBodiesAtPoint(x: number, y: number, onlyOne?: boolean, onlyDynamic?: boolean): box2d.b2Body[];

			// If there is a dynamic body under the given point, a mouse joint will be created
			// to drag that body around. Use the mouseDragMove and mouseDragEnd functions to
			// continue the drag action. Any mouse drag already in progress will be canceled.
			public mouseDragStart(point: Phaser.Point): void;
			// Updates the target location of the active mouse joint, if there is one. If there
			// is no mouse joint active, this does nothing.
			public mouseDragMove(point: Phaser.Point): void;
			// Ends the active mouse joint if there is one. If there is no mouse joint active, does nothing.
			public mouseDragEnd(): void;

			// Creates a distance joint.
			public distanceJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite, length?: number,
				ax?: number, ay?: number, bx?: number, by?: number, frequency?: number, damping?: number): box2d.b2DistanceJoint;
			// Creates a rope joint.
			public ropeJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite, length?: number,
				ax?: number, ay?: number, bx?: number, by?: number): box2d.b2RopeJoint;
			// Creates a revolute joint.
			public revoluteJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
				ax?: number, ay?: number, bx?: number, by?: number,
				motorSpeed?: number, motorTorque?: number, motorEnabled?: boolean,
				lowerLimit?: number, upperLimit?: number, limitEnabled?: boolean): box2d.b2RevoluteJoint;
			// Creates a prismatic joint.
			public prismaticJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
				axisX?: number, axisY?: number,
				ax?: number, ay?: number, bx?: number, by?: number,
				motorSpeed?: number, motorForce?: number, motorEnabled?: boolean,
				owerLimit?: number, upperLimit?: number, limitEnabled?: boolean,
				offsetAngle?: number): box2d.b2PrismaticJoint;
			// Creates a friction joint.
			public frictionJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
				maxForce?: number, maxTorque?: number,
				ax?: number, ay?: number, bx?: number, by?: number): box2d.b2FrictionJoint;
			// Creates a weld joint.
			public weldJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
				ax?: number, ay?: number, bx?: number, by?: number,
				frequency?: number, damping?: number): box2d.b2WeldJoint;
			// Creates a motor joint.
			public motorJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
				maxForce?: number, maxTorque?: number, correctionFactor?: number,
				offsetX?: number, offsetY?: number,
				offsetAngle?: number): box2d.b2MotorJoint;
			// Creates a wheel joint.
			public wheelJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
				ax?: number, ay?: number, bx?: number, by?: number,
				axisX?: number, axisY?: number,
				frequency?: number, damping?: number, motorSpeed?: number, motorTorque?: number, motorEnabled?: boolean): box2d.b2WheelJoint;
			// Creates a pulley joint.
			public pulleyJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
				ax?: number, ay?: number, bx?: number, by?: number,
				gax?: number, gay?: number, gbx?: number, gby?: number,
				ratio?: number, lengthA?: number, lengthB?: number): box2d.b2PulleyJoint;
			// Creates a gear joint.
			public gearJoint(joint1: box2d.b2Joint, joint2: box2d.b2Joint, ratio?: number): box2d.b2GearJoint;

			// Clears all physics bodies from the given TilemapLayer that were created with `World.convertTilemap`.
			public clearTilemapLayerBodies(map: Phaser.Tilemap, layer: number | string | Phaser.TilemapLayer): void;
			// Goes through all tiles in the given Tilemap and TilemapLayer and converts those set to collide into physics bodies.
			// Only call this *after* you have specified all of the tiles you wish to collide with calls like Tilemap.setCollisionBetween, etc.
			// Every time you call this method it will destroy any previously created bodies and remove them from the world.
			// Therefore understand it's a very expensive operation and not to be done in a core game update loop.
			public convertTilemap(map: Phaser.Tilemap, layer: number | string | Phaser.TilemapLayer, addToWorld?: boolean, optimize?: boolean): Box2D.Body[];

			// Casts a ray and finds intersecting fixtures in the world.
			public raycast(x1: number, y1: number, x2: number, y2: number, closestHitOnly?: boolean, filterFunction?: Function): Box2D.RaycastHit[];
			// Finds all fixtures with AABBs overlapping the given area. This does NOT mean
			// that the fixtures themselves are actually overlapping the given area.
			public queryAABB(x: number, y: number, width: number, height: number): Box2D.AABBHit[];
			// Finds all fixtures that overlap the given fixture.
			public queryFixture(fixture: box2d.b2Fixture): Box2D.AABBHit[];

			// If the PTM ratio is changed after creating the world, the debug draw scale needs to be updated.
			public setPTMRatio(newRatio: number): void;
		}

		namespace Box2D {

			class DefaultDebugDraw {

				public constructor(pixelsPerMeter: number);

				public color: box2d.b2Color;

				// Sets which aspects of the world to render
				public SetFlags(flags: number): void;
				// Gets which aspects of the world are currently set to be rendered
				public GetFlags(): number;
				// Sets the canvas context to use in subsequent rendering and applies overall transform.
				public start(context: CanvasRenderingContext2D): void;
				// Resets transform state to original
				public stop(): void;
				// Push transform
				public PushTransform(xf: box2d.b2Transform): void;
				// Pop transform
				public PopTransform(): box2d.b2Transform;
				// Draw polygon
				public DrawPolygon(vertices: Array<box2d.b2Vec2>, vertexCount: number, color: box2d.b2Color): void;
				// Draw solid polygon
				public DrawSolidPolygon(vertices: Array<box2d.b2Vec2>, vertexCount: number, color: box2d.b2Color): void;
				// Draw circle
				public DrawCircle(center: box2d.b2Vec2, radius: number, color: box2d.b2Color): void;
				// Draw solid circle
				public DrawSolidCircle(center: box2d.b2Vec2, radius: number, axis: box2d.b2Vec2, color: box2d.b2Color): void;
				// Draw segment
				public DrawSegment(p1: box2d.b2Vec2, p2: box2d.b2Vec2, color: box2d.b2Color): void;
				// Draw transform
				public DrawTransform(xf: box2d.b2Transform): void;
				// Draw point
				public DrawPoint(p: box2d.b2Vec2, size: number, color: box2d.b2Color): void;
				// Draw AABB
				public DrawAABB(aabb: box2d.b2AABB, color: box2d.b2Color): void;

				// shapes - Specifies whether the debug draw should render shapes.
				public shapes: boolean;
				// joints - Specifies whether the debug draw should render joints.
				public joints: boolean;
				//  @property {boolean} aabbs - Specifies whether the debug draw should render fixture AABBs.
				public aabbs: boolean;
				// @property {boolean} pairs - Specifies whether the debug draw should render contact pairs.
				public pairs: boolean;
				// @property {boolean} centerOfMass - Specifies whether the debug draw should render the center of mass of bodies.
				public centerOfMass: boolean;
			}

			class DefaultContactListener {

				public constructor();

				// Called when two fixtures begin to touch.
				public BeginContact(contact: box2d.b2Contact): void;
				// Called when two fixtures cease touching.
				public EndContact(contact: box2d.b2Contact): void;
				// Common code for begin and end contacts.
				public handleContactBeginOrEnd(contact: box2d.b2Contact, begin: boolean): void;
				// This is called after a contact is updated. This allows you to
				// inspect a contact before it goes to the solver. If you are
				// careful, you can modify the contact manifold (e.g. disable contact).
				public PreSolve(contact: box2d.b2Contact, oldManifold: box2d.b2Manifold): void;
				// This lets you inspect a contact after the solver is finished.
				public PostSolve(contact: box2d.b2Contact, impulse: box2d.b2ContactImpulse): void;
			}

			class PointProxy {

				public constructor(world: Physics.Box2D, object: any, gettor: Function, settor: Function);

				public x: number;
				public y: number;
			}

			class Body {

				public constructor(game: Phaser.Game, sprite: Phaser.Sprite, x?: number, y?: number, density?: number, world?: Physics.Box2D);

				// @property {Phaser.Game} game - Local reference to game.
				public game: Phaser.Game;
				// @property {Phaser.Physics.Box2D} world - Local reference to the Box2D World.
				public world: Physics.Box2D;
				// @property {number} id - a unique id for this body in the world
				public id: number;
				// @property {Phaser.Sprite} sprite - Reference to the parent Sprite.
				public sprite: Phaser.Sprite;
				// @property {number} type - The type of physics system this body belongs to.
				public type: number;
				// @property {Phaser.Point} offset - The offset of the Physics Body from the Sprite x/y position.
				public offset: Phaser.Point;
				// @property {box2d.b2BodyDef} bodyDef - The Box2D body definition
				public bodyDef: box2d.b2BodyDef;
				// @property {box2d.b2Body} data - The Box2D body data.
				public data: box2d.b2Body;
				// @property {Phaser.Physics.Box2D.PointProxy} velocity - The velocity of the body. Set velocity.x to a negative value to move to the left, position to the right. velocity.y negative values move up, positive move down.
				public velocity: Box2D.PointProxy;
				// @property {boolean} removeNextStep - To avoid deleting this body during a physics step, and causing all kinds of problems, set removeNextStep to true to have it removed in the next preUpdate.
				public removeNextStep: boolean;

				//  Sets a callback to be fired any time a fixture in this Body begins or ends contact with a fixture in the given Body.
				public setBodyContactCallback(object: Phaser.Sprite | Box2D.Body, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired any time the given fixture begins or ends contact something
				public setFixtureContactCallback(fixture: box2d.b2Fixture, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired any time a fixture in this body begins contact with a fixture in another body that matches given category set.
				public setCategoryContactCallback(category: number, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired when PreSolve is done for contacts between a fixture in this body and a fixture in the given Body.
				public setBodyPresolveCallback(object: Phaser.Sprite | Box2D.Body, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired when PreSolve is done for contacts between a fixture in this body the given fixture.
				public setFixturePresolveCallback(fixture: box2d.b2Fixture, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired when PreSolve is done for contacts between a fixture in this body and a fixture in another body that matches given category set.
				public setCategoryPresolveCallback(category: number, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired when PostSolve is done for contacts between a fixture in this body and a fixture in the given Body.
				public setBodyPostsolveCallback(object: Phaser.Sprite | Box2D.Body, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired when PostSolve is done for contacts between a fixture in this body the given fixture.
				public setFixturePostsolveCallback(fixture: box2d.b2Fixture, callback: Function, callbackContext: any): void;
				// Sets a callback to be fired when PostSolve is done for contacts between a fixture in this body and a fixture in another body that matches given category set.
				public setCategoryPostsolveCallback(category: number, callback: Function, callbackContext: any): void;

				// Sets the given collision category for all fixtures in this Body, unless a specific fixture is given.
				public setCollisionCategory(category: number, fixture?: box2d.b2Fixture): void;
				// Sets the given collision mask for all fixtures in this Body, unless a specific fixture is given.
				public setCollisionMask(mask: number, fixture?: box2d.b2Fixture): void;

				// Apply force at the center of mass. This will not cause any rotation.
				public applyForce(x: number, y: number): void;
				// If this Body is dynamic then this will zero its angular velocity.
				public setZeroRotation(): void;
				// If this Body is dynamic then this will zero its velocity on both axis.
				public setZeroVelocity(): void;
				// Sets the linear damping and angular damping to zero.
				public setZeroDamping(): void;

				// Transform a world point to local body frame.
				public toLocalPoint(out: box2d.b2Vec2, worldPoint: box2d.b2Vec2): box2d.b2Vec2;
				// Transform a local point to world frame.
				public toWorldPoint(out: box2d.b2Vec2, localPoint: box2d.b2Vec2): box2d.b2Vec2;
				// Transform a world vector to local body frame.
				public toLocalVector(out: box2d.b2Vec2, worldVector: box2d.b2Vec2): box2d.b2Vec2;
				// Transform a local vector to world frame.
				public toWorldVector(out: box2d.b2Vec2, localVector: box2d.b2Vec2): box2d.b2Vec2;

				// This will rotate the Body by the given speed to the left (counter-clockwise).
				public rotateLeft(speed: number): void;
				// This will rotate the Body by the given speed to the left (clockwise).
				public rotateRight(speed: number): void;
				// Moves the Body forwards based on its current angle and the given speed.
				// The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
				public moveForward(speed: number): void;
				// Moves the Body backwards based on its current angle and the given speed.
				// The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
				public moveBackward(speed: number): void;
				// Applies a force to the Body that causes it to 'thrust' forwards, based on its current angle and the given speed.
				public thrust(power: number): void;
				// Applies a force to the Body that causes it to 'thrust' backwards (in reverse), based on its current angle and the given speed.
				public reverse(power: number): void;
				// If this Body is dynamic then this will move it to the left by setting its x velocity to the given speed.
				// The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
				public moveLeft(speed: number): void;
				// If this Body is dynamic then this will move it to the right by setting its x velocity to the given speed.
				// The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
				public moveRight(speed: number): void;
				// If this Body is dynamic then this will move it up by setting its y velocity to the given speed.
				// The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
				public moveUp(speed: number): void;
				// If this Body is dynamic then this will move it down by setting its y velocity to the given speed.
				// The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
				public moveDown(speed: number): void;

				// Internal method. This is called directly before the sprites are sent to the renderer and after the update function has finished.
				// preUpdate(): void;
				// Internal method. This is called directly before the sprites are sent to the renderer and after the update function has finished.
				// postUpdate(): void;

				// Sets this body as inactive. It will not participate in collisions or
				// any other aspect of the physics simulation. Intended for use by Phaser.Sprite.kill()
				public kill(): void;
				// Restores the active status of this body.
				public reset(x: number, y: number): void;
				// Removes this physics body from the world.
				public removeFromWorld(): void;
				// Destroys this Body and all references it holds to other objects.
				public destroy(): void;

				// Removes all fixtures from this Body.
				public clearFixtures(): void;
				// Adds a Circle fixture to this Body. You can control the offset from the center of the body and the rotation.
				// It will use the World friction, restitution and density by default.
				public addCircle(radius: number, offsetX ?: number, offsetY ?: number): box2d.b2Fixture;
				// Adds a Rectangle fixture to this Body. You can control the offset from the center of the body and the rotation.
				// It will use the World friction, restitution and density by default.
				public addRectangle(width ?: number, height ?: number, offsetX ?: number, offsetY ?: number, rotation ?: number): box2d.b2Fixture;
				// Creates a new Edge Shape and adds it to this Body.
				// It will use the World friction, restitution and density by default.
				public addEdge(x1 ?: number, y1 ?: number, x2 ?: number, y2 ?: number): box2d.b2Fixture;
				// Creates a new chain shape and adds it to this Body.
				// It will use the World friction, restitution and density by default.
				public addChain(vertices: number[], firstIndex ?: number, count ?: number, loop ?: boolean): box2d.b2Fixture;
				// Creates a new loop shape and adds it to this Body.
				public addLoop(vertices: number[], firstIndex ?: number, count ?: number): box2d.b2Fixture;
				// Creates a new polygon shape and adds it to this Body.
				public addPolygon(vertices: number[], firstIndex ?: number, count ?: number): box2d.b2Fixture;
				// Remove a shape from the body. Will automatically update the mass properties and bounding radius.
				public removeFixture(fixture: box2d.b2Fixture): boolean;
				// Clears any previously set fixtures. Then creates a new Circle shape and adds it to this Body.
				public setCircle(radius ?: number, offsetX ?: number, offsetY ?: number): box2d.b2Fixture;
				// Clears any previously set fixtures. The creates a new Rectangle fixture at the given size and offset, and adds it to this Body.
				// If you wish to create a Rectangle to match the size of a Sprite or Image see Body.setRectangleFromSprite.
				public setRectangle(width ?: number, height ?: number, offsetX ?: number, offsetY ?: number, rotation ?: number): box2d.b2Fixture;
				// Clears any previously set fixtures.
				// Then creates a Rectangle shape sized to match the dimensions and orientation of the Sprite given.
				// If no Sprite is given it defaults to using the parent of this Body.
				public setRectangleFromSprite(sprite: Phaser.Sprite | Phaser.Image): box2d.b2Fixture;
				// Clears any previously set fixtures. Then creates a new edge shape and adds it to this Body.
				public setEdge(x1 ?: number, y1 ?: number, x2 ?: number, y2?: number): box2d.b2Fixture;
				// Clears any previously set fixtures. Then creates a new chain shape and adds it to this Body.
				public setChain(vertices: number[], firstIndex?: number, count?: number, loop?: boolean): box2d.b2Fixture;
				// An alias for setChain.
				public setLoop(vertices: number[], firstIndex?: number, count?: number): box2d.b2Fixture;
				// Clears any previously set fixtures. Then creates a new polygon shape and adds it to this Body.
				public setPolygon(vertices: number[], firstIndex?: number, count?: number): box2d.b2Fixture;
				// Reads the shape data from a physics data file stored in the Game.Cache and adds it as a polygon to this Body.
				public loadPolygon(key: string, object: string, sprite: Phaser.Sprite | Phaser.Image): boolean;

				// Checks if the given point (pixel coords) is contained by any of the fixtures on this body.
				// Not efficient for checking a large number of bodies to find which is under the mouse. (Use
				// Phaser.Physics.Box2D.getBodiesAtPoint for that.)
				public containsPoint(point: Phaser.Point): boolean;

				// @property {boolean} static - Returns true if the Body is static. Setting Body.static to 'false' will make it dynamic.
				public static: boolean;
				// @property {boolean} dynamic - Returns true if the Body is dynamic. Setting Body.dynamic to 'false' will make it static.
				public dynamic: boolean;
				// @property {boolean} kinematic - Returns true if the Body is kinematic. Setting Body.kinematic to 'false' will make it static.
				public kinematic: boolean;

				// @property {number} angle - The angle of this Body in degrees.
				public angle: number;
				// @property {number} linearDamping - The linear damping acting acting on the body.
				public linearDamping: number;
				// @property {number} angularDamping - The angular damping acting acting on the body.
				public angularDamping: number;
				// @property {number} angularVelocity - The angular velocity of the body.
				public angularVelocity: number;
				// @property {boolean} fixedRotation - If true, the body will not rotate.
				public fixedRotation: boolean;
				// @property {number} gravityScale - Set to zero to completely ignore gravity, or negative values to reverse gravity for this body.
				public gravityScale: number;
				// @property {number} friction - When setting, all fixtures on the body will be set to the given friction. When getting, the friction of the first fixture will be returned, or zero if no fixtures are present.
				public friction: number;
				// @property {number} restitution - When setting, all fixtures on the body will be set to the given restitution. When getting, the restitution of the first fixture will be returned, or zero if no fixtures are present.
				public restitution: number;
				// @property {boolean} sensor - When setting, all fixtures on the body will be set to the given sensor status. When getting, the sensor status of the first fixture will be returned, or false if no fixtures are present.
				public sensor: boolean;
				// @property {boolean} bullet - Set to true to give the body 'bullet' status, and use continous collision detection when moving it.
				public bullet: boolean;
				// @property {number} mass - the new mass for the body. Setting this to zero will cause the body to become a static body.
				public mass: number;
				// @property {number} rotation - The angle of this Body in radians.
				public rotation: number;
				// @property {number} x - The x coordinate of this Body.
				public x: number;
				// @property {number} y - The y coordinate of this Body.
				public y: number;
				// @property {boolean} collideWorldBounds - Should the Body collide with the World bounds?
				public collideWorldBounds: boolean;
			}

			class WallsObject {
				public left: any;
				public right: any;
				public top: any;
				public bottom: any;
			}

			class AABBHit {
				public body: Box2D.Body;
				public fixture: box2d.b2Fixture;
			}

			class RaycastHit extends AABBHit {
				public point: Phaser.Point;
				public normal: Phaser.Point;
			}
		}
	}
}
