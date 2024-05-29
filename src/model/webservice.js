import { Point2D } from '../graph/point2d';
import { Graph } from '../graph/graph';
import { findNeighbourPointIds } from '../graph/face_landmarks_features';
import { FaceLandmarker } from '@mediapipe/tasks-vision';
/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export class WebServiceModel {
    url;
    /**
     * Creates a new WebServiceModel instance.
     */
    constructor(url) {
        this.url = url;
    }
    async detect(imageFile) {
        const headers = new Headers();
        headers.set('Content-Type', 'multipart/form-data');
        const formData = new FormData();
        formData.append('file', imageFile);
        const request = new Request(this.url + '/detect', {
            method: 'POST',
            headers: headers,
            body: formData,
        });
        return fetch(request)
            .then((res) => res.json())
            .then((landmarks) => landmarks.map((dict, idx) => {
            const ids = Array.from(findNeighbourPointIds(idx, FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
            return new Point2D(idx, dict.x, dict.y, ids);
        }))
            .then((landmarks) => new Graph(landmarks));
    }
    async uploadAnnotations(annotationsJson) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = new Request(this.url + '/annotations', {
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
    static async verifyUrl(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        if (!pattern.test(url)) {
            return urlError.InvalidUrl;
        }
        // try connecting to the url
        const request = new Request(url, {
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
export var urlError;
(function (urlError) {
    urlError["InvalidUrl"] = "InvalidUrl";
    urlError["Unreachable"] = "Unreachable";
})(urlError || (urlError = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC93ZWJzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpEOzs7R0FHRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBQ1QsR0FBRyxDQUFTO0lBRTdCOztPQUVHO0lBQ0gsWUFBWSxHQUFXO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQWU7UUFDMUIsTUFBTSxPQUFPLEdBQVksSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sUUFBUSxHQUFhLElBQUksUUFBUSxFQUFFLENBQUM7UUFDMUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkMsTUFBTSxPQUFPLEdBQWdCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFO1lBQzdELE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDekIsSUFBSSxDQUFDLENBQUMsU0FBUyxF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