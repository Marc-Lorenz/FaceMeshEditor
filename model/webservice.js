"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlError = exports.WebServiceModel = void 0;
const point2d_1 = require("../graph/point2d");
const graph_1 = require("../graph/graph");
const face_landmarks_features_1 = require("../graph/face_landmarks_features");
const tasks_vision_1 = require("@mediapipe/tasks-vision");
/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
class WebServiceModel {
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
            body: formData
        });
        return fetch(request)
            .then(res => res.json())
            .then(landmarks => landmarks.map((dict, idx) => {
            const ids = Array.from((0, face_landmarks_features_1.findNeighbourPointIds)(idx, tasks_vision_1.FaceLandmarker.FACE_LANDMARKS_TESSELATION, 1));
            return new point2d_1.Point2D(idx, dict.x, dict.y, ids);
        }))
            .then(landmarks => new graph_1.Graph(landmarks));
    }
    async uploadAnnotations(annotationsJson) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        const request = new Request(this.url + '/annotations', {
            method: 'POST',
            headers: headers,
            body: annotationsJson
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
            .then(_ => { return null; })
            .catch(_ => { return urlError.Unreachable; });
    }
}
exports.WebServiceModel = WebServiceModel;
var urlError;
(function (urlError) {
    urlError["InvalidUrl"] = "InvalidUrl";
    urlError["Unreachable"] = "Unreachable";
})(urlError = exports.urlError || (exports.urlError = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbC93ZWJzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUF5QztBQUN6QywwQ0FBcUM7QUFDckMsOEVBQXVFO0FBQ3ZFLDBEQUF1RDtBQUV2RDs7O0dBR0c7QUFDSCxNQUFhLGVBQWU7SUFHeEI7O09BRUc7SUFDSCxZQUFZLEdBQVc7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBZTtRQUN4QixNQUFNLE9BQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFbkQsTUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVuQyxNQUFNLE9BQU8sR0FBZ0IsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLEVBQUU7WUFDM0QsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsUUFBUTtTQUNqQixDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDM0MsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFBLCtDQUFxQixFQUFDLEdBQUcsRUFBRSw2QkFBYyxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakcsT0FBTyxJQUFJLGlCQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQzthQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxlQUF1QjtRQUMzQyxNQUFNLE9BQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUUxQyxNQUFNLE9BQU8sR0FBZ0IsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLEVBQUU7WUFDaEUsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsZUFBZTtTQUN4QixDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBVztRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRSxXQUFXO1lBQ3pELGtEQUFrRCxHQUFFLGNBQWM7WUFDbEUsNkJBQTZCLEdBQUUscUJBQXFCO1lBQ3BELGlDQUFpQyxHQUFFLGdCQUFnQjtZQUNuRCwwQkFBMEIsR0FBRSxlQUFlO1lBQzNDLG9CQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsbUJBQW1CO1FBRWhELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQTtTQUM3QjtRQUVELDRCQUE0QjtRQUM1QixNQUFNLE9BQU8sR0FBZ0IsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzFDLE1BQU0sRUFBRSxNQUFNO1NBQ2pCLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRSxPQUFPLElBQUksQ0FBQSxDQUFBLENBQUMsQ0FBQzthQUN4QixLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRSxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0o7QUExRUQsMENBMEVDO0FBRUQsSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2hCLHFDQUF5QixDQUFBO0lBQ3pCLHVDQUEyQixDQUFBO0FBQy9CLENBQUMsRUFIVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUduQiJ9