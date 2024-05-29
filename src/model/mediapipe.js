import { Graph } from '../graph/graph';
import { findNeighbourPointIds } from '../graph/face_landmarks_features';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { Point3D } from '../graph/point3d';
/**
 * Represents a model using MediaPipe for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class MediapipeModel {
    meshLandmarker;
    /**
     * Creates a new MediapipeModel instance.
     */
    constructor() {
        FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm')
            .then((filesetResolver) => FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                // When adding user model of same type -> modelAssetBuffer
                delegate: 'CPU',
            },
            minFaceDetectionConfidence: 0.3,
            minFacePresenceConfidence: 0.3,
            runningMode: 'IMAGE',
            numFaces: 1,
        }))
            .then((landmarker) => (this.meshLandmarker = landmarker));
    }
    async detect(imageFile) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = (_) => {
                const result = this.meshLandmarker?.detect(image);
                if (result) {
                    const graphs = result.faceLandmarks
                        .map((landmarks) => landmarks
                        .map((dict, idx) => {
                        const ids = Array.from(findNeighbourPointIds(idx, FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
                        return new Point3D(idx, dict.x, dict.y, dict.z, ids);
                    })
                        .map((point) => point))
                        .map((landmarks) => new Graph(landmarks));
                    if (graphs) {
                        resolve(graphs[0]);
                    }
                }
                else {
                    reject('Face(s) could not be detected!');
                }
            };
            const reader = new FileReader();
            reader.onload = (_) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWFwaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL21lZGlhcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFM0M7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFDakIsY0FBYyxDQUFpQjtJQUV2Qzs7T0FFRztJQUNIO1FBQ0UsZUFBZSxDQUFDLGNBQWMsQ0FDNUIsa0VBQWtFLENBQ25FO2FBQ0UsSUFBSSxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FDeEIsY0FBYyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRTtZQUNoRCxXQUFXLEVBQUU7Z0JBQ1gsY0FBYyxFQUNaLGdIQUFnSDtnQkFDbEgsMERBQTBEO2dCQUMxRCxRQUFRLEVBQUUsS0FBSzthQUNoQjtZQUNELDBCQUEwQixFQUFFLEdBQUc7WUFDL0IseUJBQXlCLEVBQUUsR0FBRztZQUM5QixXQUFXLEVBQUUsT0FBTztZQUNwQixRQUFRLEVBQUUsQ0FBQztTQUNaLENBQUMsQ0FDSDthQUNBLElBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBZTtRQUMxQixPQUFPLElBQUksT0FBTyxDQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzFCLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1gsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWE7eUJBQ2hDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ2pCLFNBQVM7eUJBQ04sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO3dCQUNqQixNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNwQixxQkFBcUIsQ0FDbkIsR0FBRyxFQUNILGNBQWMsQ0FBQywwQkFBMEIsRUFDekMsQ0FBQyxDQUNGLENBQ0YsQ0FBQzt3QkFDRixPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDdkQsQ0FBQyxDQUFDO3lCQUNELEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBZ0IsQ0FBQyxDQUNwQzt5QkFDQSxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLElBQUksTUFBTSxFQUFFLENBQUM7d0JBQ1gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixDQUFDO2dCQUNILENBQUM7cUJBQU0sQ0FBQztvQkFDTixNQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztZQUNILENBQUMsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUM3QixJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNYLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDSCxDQUFDLENBQUM7WUFDRixNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFTO1FBQy9CLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FDRiJ9