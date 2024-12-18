import {
  FaceLandmarker,
  type FaceLandmarkerResult,
  FilesetResolver
} from '@mediapipe/tasks-vision';
import type { ModelApi } from './modelApi';
import { findNeighbourPointIds } from '@/graph/face_landmarks_features';
import { Graph } from '@/graph/graph';
import { Point2D } from '@/graph/point2d';
import { Point3D } from '@/graph/point3d';
import { ModelType } from '@/enums/modelType';
import type { ImageFile } from '@/imageFile';

/**
 * Represents a model using MediaPipe for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class MediapipeModel implements ModelApi<Point2D> {
  private meshLandmarker: FaceLandmarker | null = null;

  /**
   * Creates a new MediapipeModel instance.
   */
  constructor() {
    FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    )
      .then((filesetResolver) =>
        FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            // When adding user model of same type -> modelAssetBuffer
            delegate: 'CPU'
          },
          minFaceDetectionConfidence: 0.3,
          minFacePresenceConfidence: 0.3,
          runningMode: 'IMAGE',
          numFaces: 1
        })
      )
      .then((landmarker) => (this.meshLandmarker = landmarker));
  }

  async detect(imageFile: ImageFile): Promise<Graph<Point2D>> {
    return new Promise<Graph<Point2D>>((resolve, reject) => {
      const image = new Image();
      image.onload = (_) => {
        const result = this.meshLandmarker?.detect(image);
        if (!result) {
          reject(new Error('Face(s) could not be detected!'));
        }
        const res = MediapipeModel.processResult(result as FaceLandmarkerResult);
        if (!res) {
          reject(new Error('Face(s) could not be detected!'));
        }
        resolve(res as Graph<Point2D>);
      };
      image.src = imageFile.html;
    });
  }

  private static processResult(result: FaceLandmarkerResult) {
    const graphs = result.faceLandmarks
      .map((landmarks) =>
        landmarks
          .map((dict, idx) => {
            const ids = Array.from(
              findNeighbourPointIds(idx, FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1)
            );
            return new Point3D(idx, dict.x, dict.y, dict.z, ids);
          })
          .map((point) => point as Point2D)
      )
      // filter out the iris markings
      .map((landmarks) => {
        landmarks = landmarks.filter((point) => {
          return ![
            ...FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS.map((con) => con.start),
            ...FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS.map((con) => con.start)
          ].includes(point.id);
        });
        return new Graph(landmarks);
      });
    if (graphs) {
      return graphs[0];
    }
    return null;
  }

  async uploadAnnotations(_: string): Promise<void | Response> {
    return Promise.resolve();
  }

  type(): ModelType {
    return ModelType.mediapipe;
  }
}
