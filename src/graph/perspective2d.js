/**
 * Represents a utility class for 2D perspective transformations.
 */
export class Perspective2D {
    /**
     * Converts a normalized point (in the range [0, 1]) to display coordinates (pixel values).
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The corresponding point in display coordinates.
     */
    static normalizedToDisplay(image, point) {
        const copy = point.clone();
        copy.x = point.x * image.width;
        copy.y = point.y * image.height;
        return copy;
    }
    /**
     * Projects a point from normalized coordinates to display coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The normalized point.
     * @returns {Point2D} - The projected point in display coordinates.
     */
    static project(image, point) {
        const displayedPoint = Perspective2D.normalizedToDisplay(image, point);
        const copy = point.clone();
        copy.x = displayedPoint.x;
        copy.y = displayedPoint.y;
        return copy;
    }
    /**
     * Calculates the Euclidean distance between two points in display coordinates.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} pointFrom - The starting point.
     * @param {Point2D} pointTo - The ending point.
     * @returns {number} - The distance between the two points.
     */
    static distanceTo(image, pointFrom, pointTo) {
        const projectPointFrom = Perspective2D.project(image, pointFrom);
        const projectPointTo = Perspective2D.project(image, pointTo);
        return Math.sqrt(Math.pow(projectPointFrom.x - projectPointTo.x, 2) +
            Math.pow(projectPointFrom.y - projectPointTo.y, 2));
    }
    /**
     * Checks if two points intersect within a specified delta distance.
     * @param {HTMLImageElement} image - The image on which the points are defined.
     * @param {Point2D} point - The first point.
     * @param {Point2D} pointCheck - The second point to check against.
     * @param {number} delta - The maximum allowed distance for intersection.
     * @returns {boolean} - True if the points intersect within the specified delta, false otherwise.
     */
    static intersects(image, point, pointCheck, delta) {
        return this.distanceTo(image, point, pointCheck) <= delta;
    }
    /**
     * Converts a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
    static displayToNormalized(image, point) {
        const copy = point.clone();
        copy.x = point.x / image.width;
        copy.y = point.y / image.height;
        return copy;
    }
    /**
     * Unprojects a point from display coordinates to normalized coordinates.
     * @param {HTMLImageElement} image - The image on which the point is defined.
     * @param {Point2D} point - The point in display coordinates.
     * @returns {Point2D} - The corresponding point in normalized coordinates.
     */
    static unproject(image, point) {
        const normalizedPoint = Perspective2D.displayToNormalized(image, point);
        const copy = point.clone();
        copy.x = normalizedPoint.x;
        copy.y = normalizedPoint.y;
        return copy;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc3BlY3RpdmUyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaC9wZXJzcGVjdGl2ZTJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGFBQWE7SUFDeEI7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBdUIsRUFBRSxLQUFjO1FBQ2hFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBdUIsRUFBRSxLQUFjO1FBQ3BELE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FDZixLQUF1QixFQUN2QixTQUFrQixFQUNsQixPQUFnQjtRQUVoQixNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sY0FBYyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDZCxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNyRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxNQUFNLENBQUMsVUFBVSxDQUNmLEtBQXVCLEVBQ3ZCLEtBQWMsRUFDZCxVQUFtQixFQUNuQixLQUFhO1FBRWIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDO0lBQzVELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUF1QixFQUFFLEtBQWM7UUFDaEUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUF1QixFQUFFLEtBQWM7UUFDdEQsTUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RSxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiJ9