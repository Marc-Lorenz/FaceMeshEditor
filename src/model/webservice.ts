import { ModelApi } from './modelApi';
import { Point2D } from '../graph/point2d';
import { Graph } from '../graph/graph';
import { findNeighbourPointIds } from '../graph/face_landmarks_features';
import { FaceLandmarker } from '@mediapipe/tasks-vision';

/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class WebServiceModel implements ModelApi<Point2D> {
  private readonly url: string;

  /**
   * Creates a new WebServiceModel instance.
   */
  constructor(url: string) {
    this.url = url;
  }

  async detect(imageFile: File): Promise<Graph<Point2D>> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'multipart/form-data');

    const formData: FormData = new FormData();
    formData.append('file', imageFile);

    const request: RequestInfo = new Request(this.url + '/detect', {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    return fetch(request)
      .then((res) => res.json())
      .then((landmarks) =>
        landmarks.map((dict, idx) => {
          const ids = Array.from(
            findNeighbourPointIds(
              idx,
              FaceLandmarker.FACE_LANDMARKS_TESSELATION,
              1,
            ),
          );
          return new Point2D(idx, dict.x, dict.y, ids);
        }),
      )
      .then((landmarks) => new Graph(landmarks));
  }

  async uploadAnnotations(annotationsJson: string): Promise<void> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request(this.url + '/annotations', {
      method: 'POST',
      headers: headers,
      body: annotationsJson,
    });

    return fetch(request).then();
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