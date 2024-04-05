import {Point2D} from "./graph/point2d";
import {Perspective2D} from "./graph/perspective2d";
import {Graph} from "./graph/graph";
import {FaceLandmarker} from "@mediapipe/tasks-vision";
import {Connection, FACE_LANDMARKS_NOSE} from "./graph/face_landmarks_features";

export class Editor2D {
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private zoomScale: number = 1;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private prevMouseX: number = 0;
    private prevMouseY: number = 0;
    private mouseX: number = 0;
    private mouseY: number = 0;
    private mouseDelta: number = 5; // Constant for the hovering and selection
    private isMoving: boolean = false;
    private isPanning: boolean = false;
    private image: HTMLImageElement = new Image();
    private onPointsEditedCallback: ((graph: Graph<Point2D>) => void) | null = null;

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        // Size canvas
        this.clearAndFitToWindow();
        // Register event listeners
        this.canvas.addEventListener('mousedown', ev => this.handleMouseDown(ev));
        this.canvas.addEventListener('mousemove', ev => this.handleMouseMove(ev));
        this.canvas.addEventListener('mouseup', ev => this.handleMouseUp(ev));
        this.canvas.addEventListener('wheel', ev => this.handleWheel(ev));
        this.canvas.addEventListener('mouseout', ev => this.handleMouseUp(ev));
    }

    private _dragDepth: number = 0;

    get dragDepth(): number {
        return this._dragDepth;
    }

    set dragDepth(value: number) {
        this._dragDepth = value;
    }

    private _graph: Graph<Point2D> = new Graph<Point2D>([]);

    get graph(): Graph<Point2D> {
        return this._graph;
    }

    set graph(value: Graph<Point2D> | null | undefined) {
        if (value) {
            this._graph = value.clone();
            this.draw();
        }
    }

    private _showTesselation: boolean = false;

    get showTesselation(): boolean {
        return this._showTesselation;
    }

    set showTesselation(value: boolean) {
        this._showTesselation = value;
        this.draw();
    }

    setOnBackgroundLoadedCallback(callback: (image: HTMLImageElement) => void): void {
        this.image.onload = _ => callback(this.image);
    }

    setBackgroundSource(source: File): void {
        const reader = new FileReader();
        reader.onload = _ => {
            const result = reader.result;
            if (result) {
                this.image.src = result.toString();
            }
        };
        reader.readAsDataURL(source);
    }

    getBackgroundImage(): HTMLImageElement {
        return this.image;
    }

    setOnPointsEditedCallback(callback: (graph: Graph<Point2D>) => void) {
        this.onPointsEditedCallback = callback;
    }

    clearAndFitToWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    center() {
        const scaleX = this.canvas.width / this.image.width;
        const scaleY = this.canvas.height / this.image.height;
        this.zoomScale = scaleX < scaleY ? scaleX : scaleY;
        this.offsetX = this.canvas.width / 2 - this.image.width / 2 * this.zoomScale;
        this.offsetY = this.canvas.height / 2 - this.image.height / 2 * this.zoomScale;
        // Redraw
        this.draw();
    }

    zoom(out: boolean) {
        let dx = (this.mouseX - this.offsetX) / this.zoomScale;
        let dy = (this.mouseY - this.offsetY) / this.zoomScale;
        if (out) {
            this.canvas.style.cursor = "zoom-out";
            this.zoomScale /= 1.1;
        } else {
            this.canvas.style.cursor = "zoom-in";
            this.zoomScale *= 1.1;
        }
        // Ensure zoom level is within a reasonable range
        this.zoomScale = Math.min(Math.max(0.1, this.zoomScale), 25);
        // Update offsets
        this.offsetX = this.mouseX - dx * this.zoomScale;
        this.offsetY = this.mouseY - dy * this.zoomScale;
        // Redraw
        this.draw();
    }

    pan(deltaX: number, deltaY: number): void {
        this.canvas.style.cursor = "move";
        // update offsets
        this.offsetX += deltaX;
        this.offsetY += deltaY;
        // Redraw
        this.draw();
    }

    draw(): void {
        this.clearAndFitToWindow();
        // Set Transformations
        this.ctx.translate(this.offsetX, this.offsetY);
        this.ctx.scale(this.zoomScale, this.zoomScale);
        // Draw Background
        this.ctx.drawImage(this.image, 0, 0);
        // Draw Mesh
        if (this.showTesselation) {
            this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_TESSELATION, '#737373');
        }
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, '#42ffef');
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_LIPS, '#ff0883');
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, '#b3ff42');
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, '#b3ff42');
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, '#efffd8');
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, '#42c6ff');
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, '#42c6ff');
        this.drawFaceTrait(FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, '#b5ebff');
        this.drawFaceTrait(FACE_LANDMARKS_NOSE, '#eada70');
        // Reset Transformations
        this.ctx.restore();
    }

    private drawPoint(point: Point2D): void {
        if (point && !point.deleted) {
            const projectedPoint = Perspective2D.project(this.image, point);
            if (point.hovered) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'rgba(255,250,163,0.6)';
                this.ctx.arc(projectedPoint.x, projectedPoint.y, this.mouseDelta / this.zoomScale, 0, Math.PI * 2);
                // this.ctx.font = 20 / zoomScale + "px serif";
                // this.ctx.fillText(point.getId(), projectedPoint.x, projectedPoint.y);
                this.ctx.fill();
            }
            if (point.selected) {
                this.ctx.beginPath();
                this.ctx.fillStyle = 'rgba(255,250,58,0.6)';
                this.ctx.arc(projectedPoint.x, projectedPoint.y, this.mouseDelta / this.zoomScale, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.beginPath();
            this.ctx.fillStyle = '#4642ff';
            this.ctx.arc(projectedPoint.x, projectedPoint.y, 2 / this.zoomScale, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    private drawFaceTrait(connections: Connection[], color: string | CanvasGradient | CanvasPattern): void {
        connections.forEach(connection => {
            if (this.graph) {
                let startPoint = this.graph.getById(connection.start);
                this.drawPoint(startPoint);
                let endPoint = this.graph.getById(connection.end);
                this.drawPoint(endPoint);
                if (startPoint && endPoint && !startPoint.deleted && !endPoint.deleted) {
                    startPoint = Perspective2D.project(this.image, startPoint);
                    endPoint = Perspective2D.project(this.image, endPoint);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = color;
                    this.ctx.lineWidth = 1 / this.zoomScale;
                    this.ctx.moveTo(startPoint.x, startPoint.y);
                    this.ctx.lineTo(endPoint.x, endPoint.y);
                    this.ctx.stroke();
                }
            }
        });
    }

    private handleMouseDown(event: MouseEvent): void {
        // Check if any normalized 3D point is clicked
        if (event.button === 0) {
            // left button
            this._graph.points.filter(p => p.hovered && !p.deleted).forEach(p => {
                p.selected = true;
                this.isMoving = true;
            })
        } else if (event.button === 1) {
            // wheel button
            this.isPanning = true;
        }
    }

    private handleMouseMove(event: MouseEvent): void {
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        const relativeMouseX = (this.mouseX - this.offsetX) / this.zoomScale;
        const relativeMouseY = (this.mouseY - this.offsetY) / this.zoomScale;
        if (this.isMoving) {
            this.canvas.style.cursor = "pointer";
            // Update normalized coordinates based on mouse position
            var alreadyUpdated = new Set();
            const relativeMouse = Perspective2D.unproject(this.image, new Point2D(-1, relativeMouseX, relativeMouseY, []))
            const selectedPoint = this.graph.getSelected();
            var neighbourPoints = [selectedPoint];
            const deltaX = relativeMouse.x - selectedPoint.x;
            const deltaY = relativeMouse.y - selectedPoint.y;
            for (var depth = 0; depth <= this.dragDepth; depth++) {
                // Go through each depth step
                var tmpPoints: Point2D[] = [];
                for (const neigP of neighbourPoints) {
                    // const influenceFactor = Math.min(2 / Math.pow(depth + 1, 2), 1);
                    const influenceFactor = Math.exp(-depth);
                    const newX = neigP.x + deltaX * influenceFactor;
                    const newY = neigP.y + deltaY * influenceFactor;
                    const newPoint = new Point2D(-1, newX, newY, []);
                    neigP.moveTo(newPoint);
                    alreadyUpdated.add(neigP.getId());
                    // extract next depth of neighbours
                    // @ts-ignore
                    tmpPoints = tmpPoints.concat(this.graph.getNeighbourPointsOf(neigP));
                }
                neighbourPoints = tmpPoints.filter(p => !alreadyUpdated.has(p.getId()));
            }
            // Redraw
            this.draw();
        } else if (this.isPanning) {
            this.pan(this.mouseX - this.prevMouseX, this.mouseY - this.prevMouseY)
        } else if (this.image) {
            let pointHover = false;
            const relativeMouse = Perspective2D.unproject(this.image, new Point2D(-1, relativeMouseX, relativeMouseY, []))
            this._graph.points.forEach(point => {
                if (!pointHover && Perspective2D.intersects(this.image, point, relativeMouse, this.mouseDelta / this.zoomScale)) {
                    point.hovered = true;
                    pointHover = true;
                } else {
                    pointHover ||= point.hovered; // Also update if one point gets un-hovered!
                    point.hovered = false;
                }
            });
            if (pointHover) {
                this.draw();
            }
        }
    }

    private handleMouseUp(_: MouseEvent): void {
        if (this.isMoving && this.onPointsEditedCallback) {
            this.onPointsEditedCallback(this._graph);
        }
        this.canvas.style.cursor = "default";
        this.isPanning = false;
        this.isMoving = false;
        this._graph.points.forEach(point => point.selected = false);
    }

    private handleWheel(event: WheelEvent): void {
        if (this.image && !event.shiftKey) {
            this.zoom(event.deltaY > 0);
            event.preventDefault();
        }
    }
}