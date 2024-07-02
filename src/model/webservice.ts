import { ModelApi } from './modelApi';
import { Point2D } from '../graph/point2d';
import { Graph } from '../graph/graph';
import { findNeighbourPointIds } from '../graph/face_landmarks_features';
import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { calculateSHA } from '../util/sha';
import { ModelType } from './models';

/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class WebServiceModel implements ModelApi<Point2D> {
  private readonly _url: string;

  get type(): ModelType {
    return ModelType.custom;
  }

  /**
   * Creates a new WebServiceModel instance.
   */
  constructor(url: string) {
    this._url = url;
  }

  async detect(imageFile: File): Promise<Graph<Point2D>> {
    const formData: FormData = new FormData();
    formData.append('file', imageFile);

    const request: RequestInfo = new Request(this._url + '/detect', {
      method: 'POST',
      body: formData,
    });
    return fetch(request)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error((await res.json())['message']);
        }
        return res.json();
      })
      .then(async (json) => {
        const sha = await calculateSHA(imageFile);
        if (json['sha256'] !== sha) {
          throw new Error(
            `sha256 didn't match present file was ${json['sha256']},  is , ${sha}`,
          );
        }
        if (!json['points']) {
          throw new Error("The request didn't return any point data.");
        }
        return json['points'];
      })
      .then((landmarks) =>
        landmarks.map(
          (dict: { x: number; y: number; deleted: boolean; id: number }) => {
            const ids = Array.from(
              findNeighbourPointIds(
                dict.id,
                FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                1,
              ),
            );
            return new Point2D(dict.id, dict.x, dict.y, ids, dict.deleted);
          },
        ),
      )
      .then((landmarks) => new Graph(landmarks))
      .catch((err: Error) => {
        console.log(err.message);
        return null;
      });
  }

  async uploadAnnotations(annotationsJson: string): Promise<void> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request(this._url + '/annotations', {
      method: 'POST',
      headers: headers,
      body: annotationsJson,
    });

    return fetch(request).then();
  }

  async getHistory(
    file_name: string,
    sha256: string,
  ): Promise<Graph<Point2D>[]> {
    const req = new Request(
      this._url + '/history&file_name=' + file_name + '&sha256=' + sha256,
      {
        method: 'GET',
      },
    );

    return fetch(req)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error((await res.json())['message']);
        }
        return res.json();
      })
      .then((history: string[]) => {
        const res: Graph<Point2D>[] = [];
        history.forEach((landmarks_str) => {
          const landmarks = JSON.parse(landmarks_str);
          const points = landmarks.map(
            (dict: { x: number; y: number; deleted: boolean; id: number }) => {
              const ids = Array.from(
                findNeighbourPointIds(
                  dict.id,
                  FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                  1,
                ),
              );
              return new Point2D(dict.id, dict.x, dict.y, ids, dict.deleted);
            },
          );
          res.push(new Graph(points));
        });
        return res;
      })
      .catch((err: Error) => {
        console.log(err.message);
        return null;
      });
  }

  /**
   * Verifies if a given URL is valid. Tries to connect to the endpoint.
   *
   * @param {string} url The URL to verify.
   *
   * @returns {urlError} Returns the type of URL error, if any.
   */
  static async verifyUrl(url: string): Promise<urlError | null> {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator

    if (!pattern.test(url)) {
      return urlError.InvalidUrl;
    }

    // try connecting to the url
    const request: RequestInfo = new Request(url, {
      method: 'HEAD',
    });

    return fetch(request)
      .then((_) => {
        return null;
      })
      .catch((_) => {
        return urlError.Unreachable;
      });
  }
}

export enum urlError {
  InvalidUrl = 'InvalidUrl',
  Unreachable = 'Unreachable',
}
