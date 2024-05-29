import { ModelApi } from './modelApi';
import { Point2D } from '../graph/point2d';
import { Graph } from '../graph/graph';
/**
 * Represents a model using a WebService for face landmark detection.
 * Implements the ModelApi interface for working with Point2D graphs.
 */
export declare class WebServiceModel implements ModelApi<Point2D> {
    private readonly url;
    /**
     * Creates a new WebServiceModel instance.
     */
    constructor(url: string);
    detect(imageFile: File): Promise<Graph<Point2D>>;
    uploadAnnotations(annotationsJson: string): Promise<void>;
    /**
     * Verifies if a given URL is valid. Tries to connect to the endpoint.
     *
     * @param {string} url The URL to verify.
     *
     * @returns {urlError} Returns the type of URL error, if any.
     */
    static verifyUrl(url: string): Promise<urlError | null>;
}
export declare enum urlError {
    InvalidUrl = "InvalidUrl",
    Unreachable = "Unreachable"
}
