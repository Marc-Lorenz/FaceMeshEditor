"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediapipeModel = void 0;
const graph_1 = require("../graph/graph");
const face_landmarks_features_1 = require("../graph/face_landmarks_features");
const tasks_vision_1 = require("@mediapipe/tasks-vision");
const point3d_1 = require("../graph/point3d");
/**
 * Represents a model using MediaPipe for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
class MediapipeModel {
    /**
     * Creates a new MediapipeModel instance.
     */
    constructor() {
        tasks_vision_1.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm").then(filesetResolver => tasks_vision_1.FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                // When adding user model of same type -> modelAssetBuffer
                delegate: "CPU"
            },
            minFaceDetectionConfidence: 0.3,
            minFacePresenceConfidence: 0.3,
            runningMode: "IMAGE",
            numFaces: 1
        })).then(landmarker => this.meshLandmarker = landmarker);
    }
    async detect(imageFile) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = _ => {
                var _a;
                const result = (_a = this.meshLandmarker) === null || _a === void 0 ? void 0 : _a.detect(image);
                if (result) {
                    const graphs = result.faceLandmarks
                        .map(landmarks => landmarks
                        .map((dict, idx) => {
                        const ids = Array.from((0, face_landmarks_features_1.findNeighbourPointIds)(idx, tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
                        return new point3d_1.Point3D(idx, dict.x, dict.y, dict.z, ids);
                    })
                        .map(point => point))
                        .map(landmarks => new graph_1.Graph(landmarks));
                    if (graphs) {
                        resolve(graphs[0]);
                    }
                }
                else {
                    reject('Face(s) could not be detected!');
                }
            };
            const reader = new FileReader();
            reader.onload = _ => {
                const result = reader.result;
                if (result) {
                    image.src = result.toString();
                }
                else {
                    reject('Image could not be read!');
                }
            };
            reader.readAsDataURL(imageFile);
        });
    }
    async uploadAnnotations(_) {
        return Promise.resolve();
    }
}
exports.MediapipeModel = MediapipeModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFwaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVsL21lZGlhcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwwQ0FBcUM7QUFDckMsOEVBQXVFO0FBQ3ZFLDBEQUF3RTtBQUV4RSw4Q0FBeUM7QUFFekM7OztHQUdHO0FBQ0gsTUFBYSxjQUFjO0lBR3ZCOztPQUVHO0lBQ0g7UUFDSSw4QkFBZSxDQUFDLGNBQWMsQ0FDMUIsa0VBQWtFLENBQ3JFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsNkJBQWMsQ0FBQyxpQkFBaUIsQ0FDdEQsZUFBZSxFQUNmO1lBQ0ksV0FBVyxFQUFFO2dCQUNULGNBQWMsRUFBRSxnSEFBZ0g7Z0JBQ2hJLDBEQUEwRDtnQkFDMUQsUUFBUSxFQUFFLEtBQUs7YUFDbEI7WUFDRCwwQkFBMEIsRUFBRSxHQUFHO1lBQy9CLHlCQUF5QixFQUFFLEdBQUc7WUFDOUIsV0FBVyxFQUFFLE9BQU87WUFDcEIsUUFBUSxFQUFFLENBQUM7U0FDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQWU7UUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUMxQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFOztnQkFDZixNQUFNLE1BQU0sR0FBRyxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWE7eUJBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVM7eUJBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTt3QkFDZixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUEsK0NBQXFCLEVBQUMsR0FBRyxFQUFFLDZCQUFjLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakcsT0FBTyxJQUFJLGlCQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6RCxDQUFDLENBQUM7eUJBQ0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBZ0IsQ0FBQyxDQUNsQzt5QkFDQSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLE1BQU0sRUFBRTt3QkFDUixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3RCO2lCQUNKO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2lCQUM1QztZQUNMLENBQUMsQ0FBQTtZQUNELE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNILE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQVM7UUFDN0IsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBOURELHdDQThEQyJ9