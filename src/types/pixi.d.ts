// Type definitions for PIXI with Phaser Deviations.

declare namespace PIXI {

	export const game: Phaser.Game;
	export const WEBGL_RENDERER: number;
	export const CANVAS_RENDERER: number;
	export const VERSION: string;

	export enum blendModes {

		NORMAL,
		ADD,
		MULTIPLY,
		SCREEN,
		OVERLAY,
		DARKEN,
		LIGHTEN,
		COLOR_DODGE,
		COLOR_BURN,
		HARD_LIGHT,
		SOFT_LIGHT,
		DIFFERENCE,
		EXCLUSION,
		HUE,
		SATURATION,
		COLOR,
		LUMINOSITY

	}

	export enum scaleModes {

		DEFAULT,
		LINEAR,
		NEAREST

	}

	export const glContexts: WebGLRenderingContext[];
	export const instances: any[];

	export const TextureSilentFail: boolean;

	export function canUseNewCanvasBlendModes(): boolean;

	export function CompileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string[]): any;

	export interface IEventCallback {
		(e?: IEvent): void;
	}

	export interface IEvent {
		type: string;
		content: any;
	}

	export interface HitArea {
		contains(x: number, y: number): boolean;
	}

	export interface IInteractionDataCallback {
		(interactionData: InteractionData): void;
	}

	export interface PixiRenderer {

		autoResize: boolean;
		clearBeforeRender: boolean;
		height: number;
		resolution: number;
		transparent: boolean;
		type: number;
		view: HTMLCanvasElement;
		width: number;

		destroy(): void;
		render(stage: DisplayObjectContainer): void;
		resize(width: number, height: number): void;

	}

	export interface PixiRendererOptions {

		autoResize?: boolean;
		antialias?: boolean;
		clearBeforeRender?: boolean;
		preserveDrawingBuffer?: boolean;
		resolution?: number;
		transparent?: boolean;
		view?: HTMLCanvasElement;

	}

	export interface BitmapTextStyle {

		font?: string;
		align?: string;
		tint?: string;

	}

	export interface TextStyle {

		align?: string;
		dropShadow?: boolean;
		dropShadowColor?: string;
		dropShadowAngle?: number;
		dropShadowDistance?: number;
		fill?: string;
		font?: string;
		lineJoin?: string;
		stroke?: string;
		strokeThickness?: number;
		wordWrap?: boolean;
		wordWrapWidth?: number;

	}

	export interface Loader {

		load(): void;

	}

	export interface MaskData {

		alpha: number;
		worldTransform: number[];

	}

	export interface RenderSession {

		context: CanvasRenderingContext2D;
		maskManager: CanvasMaskManager;
		scaleMode: scaleModes;
		smoothProperty: string;
		roundPixels: boolean;

	}

	export interface ShaderAttribute {
		// TODO: Find signature of shader attributes
	}

	export interface FilterBlock {

		visible: boolean;
		renderable: boolean;

	}

	// Phaser.Filter is used instead
	export class AbstractFilter {

		public constructor(fragmentSrc: string | string[], uniforms: any);

		public dirty: boolean;
		public padding: number;
		public uniforms: any;
		public fragmentSrc: string | string[];

		public apply(frameBuffer: WebGLFramebuffer): void;
		public syncUniforms(): void;

	}

	/**
	 * A texture stores the information that represents an image. All textures have a base texture.
	 */
	export class BaseTexture implements Mixin {

		/**
		 * Helper function that creates a base texture from the given canvas element.
		 *
		 * @param canvas The canvas element source of the texture
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 * @param resolution the resolution of the texture (for HiDPI displays)
		 */
		public static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): BaseTexture;

		/**
		 * A texture stores the information that represents an image. All textures have a base texture.
		 *
		 * @param source the source object (image or canvas)
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 * @param resolution the resolution of the texture (for HiDPI displays)
		 */
		public constructor(source: HTMLImageElement, scaleMode: scaleModes);

		/**
		 * A texture stores the information that represents an image. All textures have a base texture.
		 *
		 * @param source the source object (image or canvas)
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 * @param resolution the resolution of the texture (for HiDPI displays)
		 */
		public constructor(source: HTMLCanvasElement, scaleMode: scaleModes);

		/**
		 * [read-only] The height of the base texture set when the image has loaded
		 */
		public height: number;

		/**
		 * [read-only] Set to true once the base texture has loaded
		 */
		public hasLoaded: boolean;

		/**
		 * Set this to true if a mipmap of this texture needs to be generated. This value needs to be set before the texture is used
		 * Also the texture must be a power of two size to work
		 */
		public mipmap: boolean;

		/**
		 * Controls if RGB channels should be pre-multiplied by Alpha  (WebGL only)
		 * Default: true
		 */
		public premultipliedAlpha: boolean;

		/**
		 * The Resolution of the texture.
		 */
		public resolution: number;

		/**
		 * The scale mode to apply when scaling this texture
		 * Default: PIXI.scaleModes.LINEAR
		 */
		public scaleMode: scaleModes;

		/**
		 * A BaseTexture can be set to skip the rendering phase in the WebGL Sprite Batch.
		 *
		 * You may want to do this if you have a parent Sprite with no visible texture (i.e. uses the internal `__default` texture)
		 * that has children that you do want to render, without causing a batch flush in the process.
		 */
		public skipRender: boolean;

		/**
		 * The image source that is used to create the texture.
		 */
		public source: HTMLImageElement;

		/**
		 * The multi texture batching index number.
		 */
		public textureIndex: number;

		/**
		 * [read-only] The width of the base texture set when the image has loaded
		 */
		public width: number;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		/**
		 * Forces this BaseTexture to be set as loaded, with the given width and height.
		 * Then calls BaseTexture.dirty.
		 * Important for when you don't want to modify the source object by forcing in `complete` or dimension properties it may not have.
		 *
		 * @param width The new width to force the BaseTexture to be.
		 * @param height The new height to force the BaseTexture to be.
		 */
		public forceLoaded(width: number, height: number): void;

		/**
		 * Destroys this base texture
		 */
		public destroy(): void;

		/**
		 * Sets all glTextures to be dirty.
		 */
		public dirty(): void;

		/**
		 * Removes the base texture from the GPU, useful for managing resources on the GPU.
		 * Atexture is still 100% usable and will simply be reuploaded if there is a sprite on screen that is using it.
		 */
		public unloadFromGPU(): void;

	}

	/**
	 * Creates a Canvas element of the given size.
	 */
	export class CanvasBuffer {

		/**
		 * Creates a Canvas element of the given size.
		 *
		 * @param width the width for the newly created canvas
		 * @param height the height for the newly created canvas
		 */
		public constructor(width: number, height: number);

		/**
		 * The Canvas object that belongs to this CanvasBuffer.
		 */
		public canvas: HTMLCanvasElement;

		/**
		 * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
		 */
		public context: CanvasRenderingContext2D;

		/**
		 * The height of the Canvas in pixels.
		 */
		public height: number;

		/**
		 * The width of the Canvas in pixels.
		 */
		public width: number;

		/**
		 * Frees the canvas up for use again.
		 */
		public destroy(): void;

		/**
		 * Clears the canvas that was created by the CanvasBuffer class.
		 */
		public clear(): void;

		/**
		 * Resizes the canvas to the specified width and height.
		 *
		 * @param width the new width of the canvas
		 * @param height the new height of the canvas
		 */
		public resize(width: number, height: number): void;

	}

	/**
	 * A set of functions used to handle masking.
	 */
	export class CanvasMaskManager {

		/**
		 * This method adds it to the current stack of masks.
		 *
		 * @param maskData the maskData that will be pushed
		 * @param renderSession The renderSession whose context will be used for this mask manager.
		 */
		public pushMask(maskData: MaskData, renderSession: RenderSession): void;

		/**
		 * Restores the current drawing context to the state it was before the mask was applied.
		 *
		 * @param renderSession The renderSession whose context will be used for this mask manager.
		 */
		public popMask(renderSession: RenderSession): void;

	}

	/**
	 * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
	 * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
	 */
	export class CanvasRenderer implements PixiRenderer {

		/**
		 * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
		 * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
		 *
		 * @param game A reference to the Phaser Game instance
		 */
		public constructor(game: Phaser.Game);

		/**
		 * A reference to the Phaser Game instance.
		 */
		public game: Phaser.Game;

		/**
		 * The renderer type.
		 */
		public type: number;

		/**
		 * The resolution of the canvas.
		 */
		public resolution: number;

		/**
		 * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
		 * If the Stage is NOT transparent Pixi will use a canvas sized fillRect operation every frame to set the canvas background color.
		 * If the Stage is transparent Pixi will use clearRect to clear the canvas every frame.
		 * Disable this by setting this to false. For example if your game has a canvas filling background image you often don't need this set.
		 */
		public clearBeforeRender: boolean;

		/**
		 * Whether the render view is transparent
		 */
		public transparent: boolean;

		/**
		 * Whether the render view should be resized automatically
		 */
		public autoResize: boolean;

		/**
		 * The width of the canvas view
		 * Default: 800
		 */
		public width: number;

		/**
		 * The height of the canvas view
		 * Default: 600
		 */
		public height: number;

		/**
		 * The canvas element that everything is drawn to.
		 */
		public view: HTMLCanvasElement;

		/**
		 * The canvas 2d context that everything is drawn with
		 */
		public context: CanvasRenderingContext2D;

		/**
		 * Boolean flag controlling canvas refresh.
		 */
		public refresh: boolean;

		/**
		 * Internal const.
		 */
		public count: number;

		/**
		 * Instance of a PIXI.CanvasMaskManager, handles masking when using the canvas renderer
		 */
		public maskManager: CanvasMaskManager;

		/**
		 * The render session is just a bunch of parameter used for rendering
		 */
		public renderSession: RenderSession;

		/**
		 * Renders the DisplayObjectContainer, usually the Phaser.Stage, to this canvas view.
		 *
		 * @param root The root element to be rendered.
		 */
		public render(stage: DisplayObjectContainer): void;

		/**
		 * Resizes the canvas view to the specified width and height
		 *
		 * @param width the new width of the canvas view
		 * @param height the new height of the canvas view
		 */
		public resize(width: number, height: number): void;
		public setTexturePriority(textureNameCollection: string[]): string[];

		/**
		 * Removes everything from the renderer and optionally removes the Canvas DOM element.
		 *
		 * @param removeView Removes the Canvas element from the DOM. - Default: true
		 */
		public destroy(removeView?: boolean): void;

	}

	/**
	 * Utility methods for Sprite/Texture tinting.
	 */
	export class CanvasTinter {

		/**
		 * Basically this method just needs a sprite and a color and tints the sprite with the given color.
		 *
		 * @param sprite the sprite to tint
		 * @param color the color to use to tint the sprite with
		 * @return The tinted canvas
		 */
		public static getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;

		/**
		 * Tint a texture using the "multiply" operation.
		 *
		 * @param texture the texture to tint
		 * @param color the color to use to tint the sprite with
		 * @param canvas the current canvas
		 */
		public static tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
		public static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
		public static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;

		public static canUseMultiply: boolean;
		public static tintMethod: any;

	}

	/**
	 * The base class for all objects that are rendered. Contains properties for position, scaling,
	 * rotation, masks and cache handling.
	 *
	 * This is an abstract class and should not be used on its own, rather it should be extended.
	 *
	 * It is used internally by the likes of PIXI.Sprite.
	 */
	export class DisplayObject {

		/**
		 * The alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.
		 * Please note that an object with an alpha value of 0 is skipped during the render pass.
		 *
		 * The value of this property does not reflect any alpha values set further up the display list.
		 * To obtain that value please see the `worldAlpha` property.
		 * Default: 1
		 */
		public alpha: number;
		public buttonMode: boolean;

		/**
		 * Sets if this DisplayObject should be cached as a bitmap.
		 *
		 * When invoked it will take a snapshot of the DisplayObject, as it is at that moment, and store it
		 * in a RenderTexture. This is then used whenever this DisplayObject is rendered. It can provide a
		 * performance benefit for complex, but static, DisplayObjects. I.e. those with lots of children.
		 *
		 * Transparent areas adjoining the edges may be removed ({@link https://github.com/photonstorm/phaser-ce/issues/283 #283}).
		 *
		 * Cached Bitmaps do not track their parents. If you update a property of this DisplayObject, it will not
		 * re-generate the cached bitmap automatically. To do that you need to call `DisplayObject.updateCache`.
		 *
		 * To remove a cached bitmap, set this property to `null`. Cache this DisplayObject as a Bitmap. Set to `null` to remove an existing cached bitmap.
		 */
		public cacheAsBitmap: boolean;
		public defaultCursor: string;

		/**
		 * The rectangular area used by filters when rendering a shader for this DisplayObject.
		 */
		public filterArea: Rectangle;

		/**
		 * Sets the filters for this DisplayObject. This is a WebGL only feature, and is ignored by the Canvas
		 * Renderer. A filter is a shader applied to this DisplayObject. You can modify the placement of the filter
		 * using `DisplayObject.filterArea`.
		 *
		 * To remove filters, set this property to `null`.
		 *
		 * Note: You cannot have a filter set, and a MULTIPLY Blend Mode active, at the same time. Setting a
		 * filter will reset this DisplayObjects blend mode to NORMAL. An Array of Phaser.Filter objects, or objects that extend them.
		 */
		public filters: AbstractFilter[];

		/**
		 * This is the defined area that will pick up mouse / touch events. It is null by default.
		 * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
		 */
		public hitArea: HitArea;
		public interactive: boolean;

		/**
		 * Sets a mask for this DisplayObject. A mask is an instance of a Graphics object.
		 * When applied it limits the visible area of this DisplayObject to the shape of the mask.
		 * Under a Canvas renderer it uses shape clipping. Under a WebGL renderer it uses a Stencil Buffer.
		 * To remove a mask, set this property to `null`. The mask applied to this DisplayObject. Set to `null` to remove an existing mask.
		 */
		public mask: Phaser.Graphics;

		/**
		 * The parent DisplayObjectContainer that this DisplayObject is a child of.
		 * All DisplayObjects must belong to a parent in order to be rendered.
		 * The root parent is the Stage object. This property is set automatically when the
		 * DisplayObject is added to, or removed from, a DisplayObjectContainer.
		 */
		public parent: DisplayObjectContainer;

		/**
		 * The pivot point of this DisplayObject that it rotates around. The values are expressed
		 * in pixel values.
		 */
		public pivot: Point;

		/**
		 * The coordinates, in pixels, of this DisplayObject, relative to its parent container.
		 *
		 * The value of this property does not reflect any positioning happening further up the display list.
		 * To obtain that value please see the `worldPosition` property.
		 */
		public position: Point;

		/**
		 * Should this DisplayObject be rendered by the renderer? An object with a renderable value of
		 * `false` is skipped during the render pass.
		 */
		public renderable: boolean;

		/**
		 * The rotation of this DisplayObject. The value is given, and expressed, in radians, and is based on
		 * a right-handed orientation.
		 *
		 * The value of this property does not reflect any rotation happening further up the display list.
		 * To obtain that value please see the `worldRotation` property.
		 */
		public rotation: number;

		/**
		 * The scale of this DisplayObject. A scale of 1:1 represents the DisplayObject
		 * at its default size. A value of 0.5 would scale this DisplayObject by half, and so on.
		 *
		 * The value of this property does not reflect any scaling happening further up the display list.
		 * To obtain that value please see the `worldScale` property.
		 */
		public scale: Point;
		public stage: DisplayObjectContainer;

		/**
		 * The visibility of this DisplayObject. A value of `false` makes the object invisible.
		 * A value of `true` makes it visible.
		 *
		 * An object with a visible value of `false` is skipped during the render pass.
		 * Equally a DisplayObject with visible `false` will not render any of its children.
		 *
		 * The value of this property does not reflect any visible values set further up the display list.
		 * To obtain that value please see the {@link PIXI.DisplayObject#worldVisible worldVisible} property.
		 *
		 * Objects that are not {@link PIXI.DisplayObject#worldVisible worldVisible} do not update their {@link PIXI.DisplayObject#worldPosition worldPosition}.
		 * Default: true
		 */
		public visible: boolean;

		/**
		 * The multiplied alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.
		 * This value is the calculated total, based on the alpha values of all parents of this DisplayObjects
		 * in the display list.
		 *
		 * To obtain, and set, the local alpha value, see the `alpha` property.
		 *
		 * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
		 * that happens this property will contain values based on the previous frame. Be mindful of this if
		 * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
		 */
		public worldAlpha: number;

		/**
		 * The coordinates, in pixels, of this DisplayObject within the world.
		 *
		 * This property contains the calculated total, based on the positions of all parents of this
		 * DisplayObject in the display list.
		 *
		 * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
		 * that happens this property will contain values based on the previous frame. Be mindful of this if
		 * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
		 */
		public worldPosition: Point;

		/**
		 * The global scale of this DisplayObject.
		 *
		 * This property contains the calculated total, based on the scales of all parents of this
		 * DisplayObject in the display list.
		 *
		 * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
		 * that happens this property will contain values based on the previous frame. Be mindful of this if
		 * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
		 */
		public worldScale: Point;

		/**
		 * The current transform of this DisplayObject.
		 *
		 * This property contains the calculated total, based on the transforms of all parents of this
		 * DisplayObject in the display list.
		 *
		 * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
		 * that happens this property will contain values based on the previous frame. Be mindful of this if
		 * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
		 */
		public worldTransform: Matrix;

		/**
		 * The rotation, in radians, of this DisplayObject.
		 *
		 * This property contains the calculated total, based on the rotations of all parents of this
		 * DisplayObject in the display list.
		 *
		 * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
		 * that happens this property will contain values based on the previous frame. Be mindful of this if
		 * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
		 */
		public worldRotation: number;

		/**
		 * Indicates if this DisplayObject is visible, based on it, and all of its parents, `visible` property values.
		 */
		public worldVisible: boolean;

		/**
		 * The horizontal position of the DisplayObject, in pixels, relative to its parent.
		 * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
		 */
		public x: number;

		/**
		 * The vertical position of the DisplayObject, in pixels, relative to its parent.
		 * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
		 */
		public y: number;

		public click(e: InteractionData): void;
		public displayObjectUpdateTransform(parent?: DisplayObjectContainer): void;

		/**
		 * Generates a RenderTexture based on this DisplayObject, which can they be used to texture other Sprites.
		 * This can be useful if your DisplayObject is static, or complicated, and needs to be reused multiple times.
		 *
		 * Please note that no garbage collection takes place on old textures. It is up to you to destroy old textures,
		 * and references to them, so they don't linger in memory.
		 *
		 * @param resolution The resolution of the texture being generated. - Default: 1
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values. - Default: PIXI.scaleModes.DEFAULT
		 * @param renderer The renderer used to generate the texture.
		 * @return - A RenderTexture containing an image of this DisplayObject at the time it was invoked.
		 */
		public generateTexture(resolution?: number, scaleMode?: number, renderer?: PixiRenderer | number): Phaser.RenderTexture;
		public mousedown(e: InteractionData): void;
		public mouseout(e: InteractionData): void;
		public mouseover(e: InteractionData): void;
		public mouseup(e: InteractionData): void;
		public mousemove(e: InteractionData): void;
		public mouseupoutside(e: InteractionData): void;
		public rightclick(e: InteractionData): void;
		public rightdown(e: InteractionData): void;
		public rightup(e: InteractionData): void;
		public rightupoutside(e: InteractionData): void;
		public setStageReference(stage: DisplayObjectContainer): void;
		public tap(e: InteractionData): void;

		/**
		 * Calculates the global position of this DisplayObject, based on the position given.
		 *
		 * @param position The global position to calculate from.
		 * @return - A point object representing the position of this DisplayObject based on the global position given.
		 */
		public toGlobal(position: Point): Point;

		/**
		 * Calculates the local position of this DisplayObject, relative to another point.
		 *
		 * @param position The world origin to calculate from.
		 * @param from An optional DisplayObject to calculate the global position from.
		 * @return - A point object representing the position of this DisplayObject based on the global position given.
		 */
		public toLocal(position: Point, from: DisplayObject): Point;
		public touchend(e: InteractionData): void;
		public touchendoutside(e: InteractionData): void;
		public touchstart(e: InteractionData): void;
		public touchmove(e: InteractionData): void;

		/**
		 * Updates the transform matrix this DisplayObject uses for rendering.
		 *
		 * If the object has no parent, and no parent parameter is provided, it will default to
		 * Phaser.Game.World as the parent transform to use. If that is unavailable the transform fails to take place.
		 *
		 * The `parent` parameter has priority over the actual parent. Use it as a parent override.
		 * Setting it does **not** change the actual parent of this DisplayObject.
		 *
		 * Calling this method updates the `worldTransform`, `worldAlpha`, `worldPosition`, `worldScale`
		 * and `worldRotation` properties.
		 *
		 * If a `transformCallback` has been specified, it is called at the end of this method, and is passed
		 * the new, updated, worldTransform property, along with the parent transform used.
		 *
		 * @param parent Optional parent to calculate this DisplayObjects transform from.
		 * @return - A reference to this DisplayObject.
		 */
		public updateTransform(parent?: DisplayObjectContainer): void;

		/**
		 * If this DisplayObject has a cached Sprite, this method generates and updates it.
		 * @return - A reference to this DisplayObject.
		 */
		public updateCache(): void;

	}

	/**
	 * A DisplayObjectContainer represents a collection of display objects.
	 * It is the base class of all display objects that act as a container for other objects.
	 */
	export class DisplayObjectContainer extends DisplayObject {

		/**
		 * A DisplayObjectContainer represents a collection of display objects.
		 * It is the base class of all display objects that act as a container for other objects.
		 */
		public constructor();

		/**
		 * [read-only] The array of children of this container.
		 */
		public children: DisplayObject[];

		/**
		 * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
		 */
		public height: number;

		/**
		 * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
		 */
		public width: number;

		/**
		 * If `ignoreChildInput`  is `false` it will allow this objects _children_ to be considered as valid for Input events.
		 *
		 * If this property is `true` then the children will _not_ be considered as valid for Input events.
		 *
		 * Note that this property isn't recursive: only immediate children are influenced, it doesn't scan further down.
		 */
		public ignoreChildInput: boolean;

		/**
		 * Adds a child to the container.
		 *
		 * @param child The DisplayObject to add to the container
		 * @return The child that was added.
		 */
		public addChild(child: DisplayObject): DisplayObject;

		/**
		 * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
		 *
		 * @param child The child to add
		 * @param index The index to place the child in
		 * @return The child that was added.
		 */
		public addChildAt(child: DisplayObject, index: number): DisplayObject;

		/**
		 * Retrieves the global bounds of the displayObjectContainer as a rectangle. The bounds calculation takes all visible children into consideration.
		 *
		 * @param targetCoordinateSpace Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
		 * @return The rectangular bounding area
		 */
		public getBounds(targetCoordinateSpace?: DisplayObject | Matrix): Rectangle;

		/**
		 * Returns the child at the specified index
		 *
		 * @param index The index to get the child from
		 * @return The child at the given index, if any.
		 */
		public getChildAt(index: number): DisplayObject;

		/**
		 * Returns the index position of a child DisplayObject instance
		 *
		 * @param child The DisplayObject instance to identify
		 * @return The index position of the child display object to identify
		 */
		public getChildIndex(child: DisplayObject): number;

		/**
		 * Retrieves the non-global local bounds of the displayObjectContainer as a rectangle without any transformations. The calculation takes all visible children into consideration.
		 * @return The rectangular bounding area
		 */
		public getLocalBounds(): Rectangle;

		/**
		 * Removes a child from the container.
		 *
		 * @param child The DisplayObject to remove
		 * @return The child that was removed.
		 */
		public removeChild(child: DisplayObject): DisplayObject;

		/**
		 * Removes a child from the specified index position.
		 *
		 * @param index The index to get the child from
		 * @return The child that was removed.
		 */
		public removeChildAt(index: number): DisplayObject;

		/**
		 * Removes all children from this container that are within the begin and end indexes.
		 *
		 * @param beginIndex The beginning position. Default value is 0.
		 * @param endIndex The ending position. Default value is size of the container.
		 */
		public removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
		public removeStageReference(): void;

		/**
		 * Changes the position of an existing child in the display object container
		 *
		 * @param child The child DisplayObject instance for which you want to change the index number
		 * @param index The resulting index number for the child display object
		 */
		public setChildIndex(child: DisplayObject, index: number): void;

		/**
		 * Swaps the position of 2 Display Objects within this container.
		 *
		 * @param child
		 * @param child2
		 */
		public swapChildren(child: DisplayObject, child2: DisplayObject): void;

		/**
		 * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself.
		 *
		 * @param child
		 */
		public contains(child: DisplayObject): boolean;

	}

	export class FilterTexture {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 * @param width the horizontal range of the filter
		 * @param height the vertical range of the filter
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 */
		public constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: scaleModes);

		public fragmentSrc: string[];
		public frameBuffer: WebGLFramebuffer;
		public gl: WebGLRenderingContext;
		public program: WebGLProgram;
		public scaleMode: number;
		public texture: WebGLTexture;

		/**
		 * Clears the filter texture.
		 */
		public clear(): void;

		/**
		 * Resizes the texture to the specified width and height
		 *
		 * @param width the new width of the texture
		 * @param height the new height of the texture
		 */
		public resize(width: number, height: number): void;

		/**
		 * Destroys the filter texture.
		 */
		public destroy(): void;

	}

	export class ImageLoader implements Mixin {

		public constructor(url: string, crossorigin?: boolean);

		public texture: Texture;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		public load(): void;
		public loadFramedSpriteSheet(frameWidth: number, frameHeight: number, textureName: string): void;

	}

	export class InteractionData {

		public global: Point;
		public target: Sprite;
		public originalEvent: Event;

		public getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

	}

	// Phaser.Matrix is used instead
	export class Matrix {

		public a: number;
		public b: number;
		public c: number;
		public d: number;
		public tx: number;
		public ty: number;

		public append(matrix: Matrix): Matrix;
		public apply(pos: Point, newPos: Point): Point;
		public applyInverse(pos: Point, newPos: Point): Point;
		public determineMatrixArrayType(): number[];
		public identity(): Matrix;
		public rotate(angle: number): Matrix;
		public fromArray(array: number[]): void;
		public translate(x: number, y: number): Matrix;
		public toArray(transpose: boolean): number[];
		public scale(x: number, y: number): Matrix;

	}

	export interface Mixin {

		listeners(eventName: string): Function[];
		emit(eventName: string, data?: any): boolean;
		dispatchEvent(eventName: string, data?: any): boolean;
		on(eventName: string, fn: Function): Function;
		addEventListener(eventName: string, fn: Function): Function;
		once(eventName: string, fn: Function): Function;
		off(eventName: string, fn: Function): Function;
		removeAllEventListeners(eventName: string): void;

	}

	export interface IPixiShader {

		fragmentSrc: string[];
		gl: WebGLRenderingContext;
		program: WebGLProgram;
		vertexSrc: string[];

		destroy(): void;
		init(): void;

	}

	export class PixiShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * Uniform attributes cache.
		 */
		public attributes: ShaderAttribute[];

		/**
		 * The Default Vertex shader source.
		 */
		public defaultVertexSrc: string[];

		/**
		 * A dirty flag
		 */
		public dirty: boolean;

		/**
		 * A local flag
		 */
		public firstRun: boolean;

		/**
		 * A local texture counter for multi-texture shaders.
		 */
		public textureCount: number;

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;
		public vertexSrc: string[];

		/**
		 * Initialises a Sampler2D uniform (which may only be available later on after initUniforms once the texture has loaded)
		 */
		public initSampler2D(): void;

		/**
		 * Initialises the shader uniform values.
		 *
		 * Uniforms are specified in the GLSL_ES Specification: http://www.khronos.org/registry/webgl/specs/latest/1.0/
		 * http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
		 */
		public initUniforms(): void;

		/**
		 * Updates the shader uniform values.
		 */
		public syncUniforms(): void;

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class PixiFastShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * A local texture counter for multi-texture shaders.
		 */
		public textureCount: number;

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class PrimitiveShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class ComplexPrimitiveShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	export class StripShader implements IPixiShader {

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public constructor(gl: WebGLRenderingContext);

		/**
		 * The fragment shader.
		 */
		public fragmentSrc: string[];
		public gl: WebGLRenderingContext;

		/**
		 * The WebGL program.
		 */
		public program: WebGLProgram;

		/**
		 * The vertex shader.
		 */
		public vertexSrc: string[];

		/**
		 * Destroys the shader.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader.
		 */
		public init(): void;

	}

	// Overwritten by Phaser.Point
	export class Point {

		public constructor(x?: number, y?: number);

		public x: number;
		public y: number;

		public clone(): Point;
		public set(x: number, y: number): void;

	}

	// Overwritten by Phaser.Rectangle
	export class Rectangle implements HitArea {

		public constructor(x?: number, y?: number, width?: number, height?: number);

		public bottom: number;
		public bottomRight: Phaser.Point;
		public bottomLeft: Phaser.Point;
		public centerX: number;
		public centerY: number;
		public empty: boolean;
		public halfHeight: number;
		public halfWidth: number;
		public height: number;
		public left: number;
		public perimeter: number;
		public randomX: number;
		public randomY: number;
		public right: number;
		public top: number;
		public topLeft: Phaser.Point;
		public topRight: Phaser.Point;
		public type: number;
		public volume: number;
		public width: number;
		public x: number;
		public y: number;

		public clone(): Rectangle;
		public contains(x: number, y: number): boolean;

	}

	export class Rope extends Strip {

		public points: Point[];
		public vertices: number[];

		public constructor(texture: Texture, points: Point[]);

		public refresh(): void;
		public setTexture(texture: Texture): void;

	}

	/**
	 * The Sprite object is the base for all textured objects that are rendered to the screen
	 */
	export class Sprite extends DisplayObjectContainer {

		/**
		 * The Sprite object is the base for all textured objects that are rendered to the screen
		 *
		 * @param texture The texture for this sprite
		 */
		public constructor(texture: Texture);

		/**
		 * The anchor sets the origin point of the texture.
		 * The default (0, 0) is the top left.
		 * (0.5, 0.5) is the center.
		 * (1, 1) is the bottom right.
		 *
		 * You can modify the default values in PIXI.Sprite.defaultAnchor.
		 */
		public anchor: Point;

		/**
		 * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.
		 *
		 * Warning: You cannot have a blend mode and a filter active on the same Sprite. Doing so will render the sprite invisible.
		 * Default: PIXI.blendModes.NORMAL;
		 */
		public blendMode: blendModes;

		/**
		 * Controls if this Sprite is processed by the core Phaser game loops and Group loops (except {@link Phaser.Group#update}).
		 * Default: true
		 */
		public exists: boolean;

		/**
		 * The shader that will be used to render this Sprite.
		 * Set to null to remove a current shader.
		 * Default: null
		 */
		public shader: IPixiShader;

		/**
		 * The texture that the sprite is using
		 */
		public texture: Texture;

		/**
		 * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF (Phaser.Color.WHITE) will remove any tint effect.
		 * Default: 0xFFFFFF
		 */
		public tint: number;

		/**
		 * A Point-like object.
		 * Default: {"x":0,"y":0}
		 */

							   /**
							   * The horizontal position of the DisplayObject, in pixels, relative to its parent.
							   * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
							   */

										  /**
										  * The vertical position of the DisplayObject, in pixels, relative to its parent.
										  * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
										  */
		public static defaultAnchor: {x: number; y: number};

		/**
		 * Sets the texture of the sprite. Be warned that this doesn't remove or destroy the previous
		 * texture this Sprite was using.
		 *
		 * @param texture The PIXI texture that is displayed by the sprite
		 * @param destroy Call Texture.destroy on the current texture before replacing it with the new one?
		 */
		public setTexture(texture: Texture, destroyBase?: boolean): void;

	}

	export class SpriteBatch extends DisplayObjectContainer {

		public constructor(texture?: Texture);

		public ready: boolean;
		public textureThing: Texture;

		public initWebGL(gl: WebGLRenderingContext): void;

	}

	export class Strip extends DisplayObjectContainer {

		public static DrawModes: {

			TRIANGLE_STRIP: number;
			TRIANGLES: number;

		};

		public constructor(texture: Texture);

		public blendMode: number;
		public colors: number[];
		public dirty: boolean;
		public indices: number[];
		public canvasPadding: number;
		public texture: Texture;
		public uvs: number[];
		public vertices: number[];

		public getBounds(matrix?: Matrix): Rectangle;

	}

	/**
	 * A texture stores the information that represents an image or part of an image. It cannot be added
	 * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
	 */
	export class Texture implements Mixin {

		public static emptyTexture: Texture;

		/**
		 * Helper function that creates a new a Texture based on the given canvas element.
		 *
		 * @param canvas The canvas element source of the texture
		 * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
		 */
		public static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): Texture;

		/**
		 * A texture stores the information that represents an image or part of an image. It cannot be added
		 * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
		 *
		 * @param baseTexture The base texture source to create the texture from
		 * @param frame The rectangle frame of the texture to show
		 * @param crop The area of original texture
		 * @param trim Trimmed texture rectangle
		 */
		public constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle);

		/**
		 * The base texture that this texture uses.
		 */
		public baseTexture: BaseTexture;

		/**
		 * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
		 * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
		 */
		public crop: Rectangle;

		/**
		 * The frame specifies the region of the base texture that this texture uses
		 */
		public frame: Rectangle;

		/**
		 * The height of the Texture in pixels.
		 */
		public height: number;

		/**
		 * Does this Texture have any frame data assigned to it?
		 */
		public noFrame: boolean;

		/**
		 * This will let a renderer know that a texture has been updated (used mainly for webGL uv updates)
		 */
		public requiresUpdate: boolean;

		/**
		 * The texture trim data.
		 */
		public trim: Point;

		/**
		 * The width of the Texture in pixels.
		 */
		public width: number;
		public scope: any;

		/**
		 * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
		 */
		public valid: boolean;

		/**
		 * A flag that controls if this frame is rotated or not.
		 * Rotation allows you to use rotated frames in texture atlas packing, it has nothing to do with
		 * Sprite rotation.
		 */
		public rotated: boolean;

		public listeners(eventName: string): Function[];
		public emit(eventName: string, data?: any): boolean;
		public dispatchEvent(eventName: string, data?: any): boolean;
		public on(eventName: string, fn: Function): Function;
		public addEventListener(eventName: string, fn: Function): Function;
		public once(eventName: string, fn: Function): Function;
		public off(eventName: string, fn: Function): Function;
		public removeAllEventListeners(eventName: string): void;

		/**
		 * Destroys this texture
		 *
		 * @param destroyBase Whether to destroy the base texture as well
		 */
		public destroy(destroyBase: boolean): void;

		/**
		 * Specifies the region of the baseTexture that this texture will use.
		 *
		 * @param frame The frame of the texture to set it to
		 */
		public setFrame(frame: Rectangle): void;

	}

	export class TilingSprite extends Sprite {

		public constructor(texture: Texture, width: number, height: number);

		public canvasBuffer: PIXI.CanvasBuffer;
		public blendMode: number;
		public refreshTexture: boolean;
		public texture: Texture;
		public textureDebug: boolean;
		public tint: number;
		public tilePosition: Point;
		public tilePattern: PIXI.Texture;
		public tileScale: Point;
		public tileScaleOffset: Point;

		public destroy(): void;
		public generateTilingTexture(forcePowerOfTwo?: boolean): void;
		public setTexture(texture: Texture): void;

	}

	export class VideoTexture extends BaseTexture {

		public static baseTextureFromVideo(video: HTMLVideoElement, scaleMode: number): BaseTexture;
		public static textureFromVideo(video: HTMLVideoElement, scaleMode: number): Texture;
		public static fromUrl(videoSrc: string, scaleMode?: number, autoPlay?: boolean, type?: string, loop?: boolean): Texture;

		public controls: boolean;
		public autoUpdate: boolean;
		public type: string;

		public changeSource(src: string, type: string, loop: boolean): void;
		public play(): void;
		public stop(): void;

		public destroy(): void;
		public updateBound(): void;
		public onPlayStart: () => void;
		public onPlayStop: () => void;
		public onCanPlay: (event: any) => void;

	}

	export class WebGLBlendModeManager {

		public currentBlendMode: number;

		/**
		 * Destroys this object.
		 */
		public destroy(): void;

		/**
		 * Sets-up the given blendMode from WebGL's point of view.
		 *
		 * @param blendMode the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
		 */
		public setBlendMode(blendMode: number): boolean;

		/**
		 * Sets the WebGL Context.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	export class WebGLFastSpriteBatch {

		public constructor(gl: CanvasRenderingContext2D);

		public currentBatchSize: number;
		public currentBaseTexture: BaseTexture;
		public currentBlendMode: number;
		public renderSession: RenderSession;
		public drawing: boolean;
		public indexBuffer: any;

		/**
		 * Index data
		 */
		public indices: number[];
		public lastIndexCount: number;
		public matrix: Matrix;
		public maxSize: number;
		public shader: IPixiShader;
		public size: number;
		public vertexBuffer: any;

		/**
		 * Vertex data
		 */
		public vertices: number[];
		public vertSize: number;

		public end(): void;

		/**
		 *
		 *
		 * @param spriteBatch
		 * @param renderSession
		 */
		public begin(spriteBatch: SpriteBatch, renderSession: RenderSession): void;
		public destroy(removeView?: boolean): void;
		public flush(): void;

		/**
		 *
		 *
		 * @param spriteBatch
		 */
		public render(spriteBatch: SpriteBatch): void;

		/**
		 *
		 *
		 * @param sprite
		 */
		public renderSprite(sprite: Sprite): void;

		/**
		 * Sets the WebGL Context.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;
		public start(): void;
		public stop(): void;

	}

	export class WebGLFilterManager {

		public filterStack: AbstractFilter[];
		public transparent: boolean;
		public offsetX: number;
		public offsetY: number;

		/**
		 * Applies the filter to the specified area.
		 *
		 * @param filter the filter that needs to be applied
		 * @param filterArea TODO - might need an update
		 * @param width the horizontal range of the filter
		 * @param height the vertical range of the filter
		 */
		public applyFilterPass(filter: AbstractFilter, filterArea: Texture, width: number, height: number): void;

		/**
		 *
		 *
		 * @param renderSession
		 * @param buffer
		 */
		public begin(renderSession: RenderSession, buffer: ArrayBuffer): void;

		/**
		 * Destroys the filter and removes it from the filter stack.
		 */
		public destroy(): void;

		/**
		 * Initialises the shader buffers.
		 */
		public initShaderBuffers(): void;

		/**
		 * Removes the last filter from the filter stack and doesn't return it.
		 */
		public popFilter(): void;

		/**
		 * Applies the filter and adds it to the current filter stack.
		 *
		 * @param filterBlock the filter that will be pushed to the current filter stack
		 */
		public pushFilter(filterBlock: FilterBlock): void;

		/**
		 * Initialises the context and the properties.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	/**
	 * A set of functions used by the webGL renderer to draw the primitive graphics data
	 */
	export class WebGLGraphics {

		public static graphicsDataPool: any[];

		/**
		 * Renders the graphics object
		 *
		 * @param graphics
		 * @param renderSession
		 */
		public static renderGraphics(graphics: Phaser.Graphics, renderRession: RenderSession): void;

		/**
		 * Updates the graphics object
		 *
		 * @param graphicsData The graphics object to update
		 * @param gl the current WebGL drawing context
		 */
		public static updateGraphics(graphics: Phaser.Graphics, gl: WebGLRenderingContext): void;

		/**
		 *
		 *
		 * @param webGL
		 * @param type
		 */
		public static switchMode(webGL: WebGLRenderingContext, type: number): any;

		/**
		 * Builds a rectangle to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData
		 */
		public static buildRectangle(graphicsData: Phaser.GraphicsData, webGLData: any): void;

		/**
		 * Builds a rounded rectangle to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData
		 */
		public static buildRoundedRectangle(graphicsData: Phaser.GraphicsData, webGLData: any): void;

		/**
		 * Calculate the points for a quadratic bezier curve. (helper function..)
		 * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
		 *
		 * @param fromX Origin point x
		 * @param fromY Origin point x
		 * @param cpX Control point x
		 * @param cpY Control point y
		 * @param toX Destination point x
		 * @param toY Destination point y
		 */
		public static quadraticBezierCurve(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number[];

		/**
		 * Builds a circle to draw
		 *
		 * @param graphicsData The graphics object to draw
		 * @param webGLData
		 */
		public static buildCircle(graphicsData: Phaser.GraphicsData, webGLData: any): void;

		/**
		 * Builds a line to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData
		 */
		public static buildLine(graphicsData: Phaser.GraphicsData, webGLData: any): void;

		/**
		 * Builds a complex polygon to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData
		 */
		public static buildComplexPoly(graphicsData: Phaser.GraphicsData, webGLData: any): void;

		/**
		 * Builds a polygon to draw
		 *
		 * @param graphicsData The graphics object containing all the necessary properties
		 * @param webGLData
		 */
		public static buildPoly(graphicsData: Phaser.GraphicsData, webGLData: any): boolean;

		public reset(): void;
		public upload(): void;

	}

	export class WebGLGraphicsData {

		public constructor(gl: WebGLRenderingContext);

		public gl: WebGLRenderingContext;
		public glPoints: any[];
		public color: number[];
		public points: any[];
		public indices: any[];
		public buffer: WebGLBuffer;
		public indexBuffer: WebGLBuffer;
		public mode: number;
		public alpha: number;
		public dirty: boolean;

		public reset(): void;
		public upload(): void;

	}

	export class WebGLMaskManager {

		/**
		 * Destroys the mask stack.
		 */
		public destroy(): void;

		/**
		 * Removes the last filter from the filter stack and doesn't return it.
		 *
		 * @param maskData
		 * @param renderSession an object containing all the useful parameters
		 */
		public popMask(renderSession: RenderSession): void;

		/**
		 * Applies the Mask and adds it to the current filter stack.
		 *
		 * @param maskData
		 * @param renderSession
		 */
		public pushMask(maskData: any[], renderSession: RenderSession): void;

		/**
		 * Sets the drawing context to the one given in parameter.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	/**
	 * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
	 * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
	 * So no need for Sprite Batches or Sprite Clouds.
	 * Don't forget to add the view to your DOM or you will not see anything :)
	 */
	export class WebGLRenderer implements PixiRenderer {

		public static createWebGLTexture(texture: Texture, gl: WebGLRenderingContext): void;

		/**
		 * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
		 * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
		 * So no need for Sprite Batches or Sprite Clouds.
		 * Don't forget to add the view to your DOM or you will not see anything :)
		 *
		 * @param game A reference to the Phaser Game instance
		 */
		public constructor(game: Phaser.Game);

		/**
		 * A reference to the Phaser Game instance.
		 */
		public game: Phaser.Game;
		public type: number;

		/**
		 * The resolution of the renderer
		 * Default: 1
		 */
		public resolution: number;

		/**
		 * Whether the render view is transparent
		 */
		public transparent: boolean;

		/**
		 * Whether the render view should be resized automatically
		 */
		public autoResize: boolean;

		/**
		 * The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
		 */
		public preserveDrawingBuffer: boolean;

		/**
		 * This sets if the WebGLRenderer will clear the context texture or not before the new render pass. If true:
		 * If the Stage is NOT transparent, Pixi will clear to alpha (0, 0, 0, 0).
		 * If the Stage is transparent, Pixi will clear to the target Stage's background color.
		 * Disable this by setting this to false. For example: if your game has a canvas filling background image, you often don't need this set.
		 */
		public clearBeforeRender: boolean;

		/**
		 * The width of the canvas view
		 */
		public width: number;

		/**
		 * The height of the canvas view
		 */
		public height: number;
		public currentBatchedTextures: string[];

		/**
		 * The canvas element that everything is drawn to
		 */
		public view: HTMLCanvasElement;
		public projection: Point;
		public offset: Point;

		/**
		 * Deals with managing the shader programs and their attribs
		 */
		public shaderManager: WebGLShaderManager;

		/**
		 * Manages the rendering of sprites
		 */
		public spriteBatch: WebGLSpriteBatch;

		/**
		 * Manages the masks using the stencil buffer
		 */
		public maskManager: WebGLMaskManager;

		/**
		 * Manages the filters
		 */
		public filterManager: WebGLFilterManager;

		/**
		 * Manages the stencil buffer
		 */
		public stencilManager: WebGLStencilManager;

		/**
		 * Manages the blendModes
		 */
		public blendModeManager: WebGLBlendModeManager;
		public renderSession: RenderSession;

		public initContext(): void;

		/**
		 * Renders the stage to its webGL view
		 *
		 * @param stage the Stage element to be rendered
		 */
		public render(stage: DisplayObjectContainer): void;

		/**
		 * Renders a Display Object.
		 *
		 * @param displayObject The DisplayObject to render
		 * @param projection The projection
		 * @param buffer a standard WebGL buffer
		 */
		public renderDisplayObject(displayObject: DisplayObject, projection: Point, buffer: WebGLBuffer): void;

		/**
		 * Resizes the webGL view to the specified width and height.
		 *
		 * @param width the new width of the webGL view
		 * @param height the new height of the webGL view
		 */
		public resize(width: number, height: number): void;

		/**
		 * Updates and Creates a WebGL texture for the renderers context.
		 *
		 * @param texture the texture to update
		 * @return True if the texture was successfully bound, otherwise false.
		 */
		public updateTexture(texture: Texture): void;

		/**
		 * Removes everything from the renderer (event listeners, spritebatch, etc...)
		 */
		public destroy(): void;

		/**
		 * Maps Pixi blend modes to WebGL blend modes.
		 */
		public mapBlendModes(): void;

		/**
		 * If Multi Texture support has been enabled, then calling this method will enable batching on the given
		 * textures. The texture collection is an array of keys, that map to Phaser.Cache image entries.
		 *
		 * The number of textures that can be batched is dependent on hardware. If you provide more textures
		 * than can be batched by the GPU, then only those at the start of the array will be used. Generally
		 * you shouldn't provide more than 16 textures to this method. You can check the hardware limit via the
		 * `maxTextures` property.
		 *
		 * You can also check the property `currentBatchedTextures` at any time, to see which textures are currently
		 * being batched.
		 *
		 * To stop all textures from being batched, call this method again with an empty array.
		 *
		 * To change the textures being batched, call this method with a new array of image keys. The old ones
		 * will all be purged out and no-longer batched, and the new ones enabled.
		 *
		 * Note: Throws a warning if you haven't enabled Multiple Texture batching support in the Phaser Game config.
		 *
		 * @param textureNameCollection An Array of Texture Cache keys to use for multi-texture batching.
		 * @return An array containing the texture keys that were enabled for batching.
		 */
		public setTexturePriority(textureNameCollection: string[]): string[];

	}

	export class WebGLShaderManager {

		public maxAttibs: number;
		public attribState: any[];
		public stack: any[];
		public tempAttribState: any[];

		/**
		 * Destroys this object.
		 */
		public destroy(): void;

		/**
		 * Takes the attributes given in parameters.
		 *
		 * @param attribs attribs
		 */
		public setAttribs(attribs: ShaderAttribute[]): void;

		/**
		 * Initialises the context and the properties.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

		/**
		 * Sets the current shader.
		 *
		 * @param shader
		 */
		public setShader(shader: IPixiShader): boolean;

	}

	export class WebGLStencilManager {

		public stencilStack: any[];
		public reverse: boolean;
		public count: number;

		/**
		 * TODO this does not belong here!
		 *
		 * @param graphics
		 * @param webGLData
		 * @param renderSession
		 */
		public bindGraphics(graphics: Phaser.Graphics, webGLData: any[], renderSession: RenderSession): void;

		/**
		 * Destroys the mask stack.
		 */
		public destroy(): void;

		/**
		 *
		 *
		 * @param graphics
		 * @param webGLData
		 * @param renderSession
		 */
		public popStencil(graphics: Phaser.Graphics, webGLData: any[], renderSession: RenderSession): void;
		public pushStencil(graphics: Phaser.Graphics, webGLData: any[], renderSession: RenderSession): void;

		/**
		 * Sets the drawing context to the one given in parameter.
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;

	}

	export class WebGLSpriteBatch {

		public blendModes: number[];

		/**
		 * View on the vertices as a Uint32Array
		 */
		public colors: number[];
		public currentBatchSize: number;
		public currentBaseTexture: Texture;
		public defaultShader: AbstractFilter;
		public dirty: boolean;
		public drawing: boolean;

		/**
		 * Holds the indices
		 */
		public indices: number[];
		public lastIndexCount: number;

		/**
		 * View on the vertices as a Float32Array
		 */
		public positions: number[];
		public textures: Texture[];
		public shaders: IPixiShader[];

		/**
		 * The number of images in the SpriteBatch before it flushes
		 */
		public size: number;
		public sprites: any[];

		/**
		 * Holds the vertices
		 */
		public vertices: number[];
		public vertSize: number;

		/**
		 *
		 *
		 * @param renderSession The RenderSession object
		 */
		public begin(renderSession: RenderSession): void;

		/**
		 * Destroys the SpriteBatch.
		 */
		public destroy(): void;
		public end(): void;

		/**
		 * Renders the content and empties the current batch.
		 */
		public flush(shader?: IPixiShader): void;

		/**
		 *
		 *
		 * @param sprite the sprite to render when using this spritebatch
		 * @param matrix Optional matrix. If provided the Display Object will be rendered using this matrix, otherwise it will use its worldTransform.
		 */
		public render(sprite: Sprite): void;

		/**
		 *
		 *
		 * @param texture
		 * @param size
		 * @param startIndex
		 */
		public renderBatch(texture: Texture, size: number, startIndex: number): void;

		/**
		 * Renders a TilingSprite using the spriteBatch.
		 *
		 * @param sprite the sprite to render
		 */
		public renderTilingSprite(sprite: TilingSprite): void;
		public setBlendMode(blendMode: blendModes): void;

		/**
		 *
		 *
		 * @param gl the current WebGL drawing context
		 */
		public setContext(gl: WebGLRenderingContext): void;
		public start(): void;
		public stop(): void;

	}

}

declare function requestAnimFrame(callback: Function): void;

declare namespace PIXI.PolyK {
	export function Triangulate(p: number[]): number[];
}
