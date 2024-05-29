import { Point2D } from "./graph/point2d";
import { Graph } from "./graph/graph";
export declare class Editor2D {
    private readonly canvas;
    private ctx;
    private zoomScale;
    private offsetX;
    private offsetY;
    private prevMouseX;
    private prevMouseY;
    private mouseX;
    private mouseY;
    private isMoving;
    private isPanning;
    private image;
    private onPointsEditedCallback;
    constructor();
    private _dragDepth;
    get dragDepth(): number;
    set dragDepth(value: number);
    private _graph;
    get graph(): Graph<Point2D>;
    set graph(value: Graph<Point2D> | null | undefined);
    private _showTesselation;
    get showTesselation(): boolean;
    set showTesselation(value: boolean);
    setOnBackgroundLoadedCallback(callback: (image: HTMLImageElement) => void): void;
    setBackgroundSource(source: File): void;
    getBackgroundImage(): HTMLImageElement;
    setOnPointsEditedCallback(callback: (graph: Graph<Point2D>) => void): void;
    clearAndFitToWindow(): void;
    center(): void;
    zoom(out: boolean): void;
    pan(deltaX: number, deltaY: number): void;
    draw(): void;
    private drawPoint;
    private drawFaceTrait;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private handleWheel;
}
