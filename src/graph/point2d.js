/**
 * Represents a 2D point with an ID, coordinates, and neighbor information.
 */
export class Point2D {
    _id;
    neighbourIds;
    /**
     * Creates a new Point2D instance.
     * @param {number} id - The unique identifier for the point.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number[]} neighbourIds - An array of neighbor IDs.
     */
    constructor(id, x, y, neighbourIds) {
        this._id = id;
        this._x = x;
        this._y = y;
        this.neighbourIds = neighbourIds;
    }
    _selected = false;
    /**
     * Gets or sets whether the point is selected.
     * @returns {boolean} - True if selected, false otherwise.
     */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
    }
    _hovered = false;
    /**
     * Gets or sets whether the point is hovered.
     * @returns {boolean} - True if hovered, false otherwise.
     */
    get hovered() {
        return this._hovered;
    }
    set hovered(value) {
        this._hovered = value;
    }
    _deleted = false;
    /**
     * Gets or sets whether the point is marked as deleted.
     * @returns {boolean} - True if deleted, false otherwise.
     */
    get deleted() {
        return this._deleted;
    }
    set deleted(value) {
        this._deleted = value;
    }
    _x;
    /**
     * Gets or sets the x-coordinate of the point.
     * @returns {number} - The x-coordinate.
     */
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    _y;
    /**
     * Gets or sets the y-coordinate of the point.
     * @returns {number} - The y-coordinate.
     */
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
    /**
     * Returns a string representation of the point.
     * @returns {string} - A formatted string with point details.
     */
    toString() {
        return `Point2D(id=${this.id}, x=${this.x}, y=${this.y})`;
    }
    /**
     * Retrieves the unique ID of the point.
     * @returns {number} - The point's ID.
     */
    get id() {
        return this._id;
    }
    /**
     * Retrieves a copy of the neighbor IDs.
     * @returns {number[]} - An array of neighbor IDs.
     */
    getNeighbourIds() {
        return [...this.neighbourIds];
    }
    /**
     * Moves the point to the specified coordinates.
     * @param {Point2D} point - The target point.
     */
    moveTo(point) {
        this.x = point.x;
        this.y = point.y;
    }
    /**
     * Creates a shallow copy of the point.
     * @returns {Point2D} - A new Point2D instance with cloned properties.
     */
    clone() {
        const copy = new Point2D(this.id, this._x, this._y, this.neighbourIds);
        copy.hovered = this.hovered;
        copy.deleted = this.deleted;
        copy.selected = this.selected;
        return copy;
    }
    /**
     * Converts the point to a dictionary object.
     * @returns {object} - A dictionary containing point properties.
     */
    toDict() {
        return {
            id: this.id,
            x: this.x,
            y: this.y,
            // hovered: this.hovered,
            deleted: this.deleted,
            // selected: this.selected,
            // neighbourIds: this.neighbourIds
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaC9wb2ludDJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE9BQU87SUFDRCxHQUFHLENBQVM7SUFDWixZQUFZLENBQVc7SUFFeEM7Ozs7OztPQU1HO0lBQ0gsWUFBWSxFQUFVLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxZQUFzQjtRQUNsRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRU8sU0FBUyxHQUFZLEtBQUssQ0FBQztJQUVuQzs7O09BR0c7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVPLFFBQVEsR0FBWSxLQUFLLENBQUM7SUFFbEM7OztPQUdHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxRQUFRLEdBQVksS0FBSyxDQUFDO0lBRWxDOzs7T0FHRztJQUNILElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRU8sRUFBRSxDQUFTO0lBRW5COzs7T0FHRztJQUNILElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxDQUFDLENBQUMsS0FBYTtRQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRU8sRUFBRSxDQUFTO0lBRW5COzs7T0FHRztJQUNILElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxDQUFDLENBQUMsS0FBYTtRQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sY0FBYyxJQUFJLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzVELENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWU7UUFDYixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxLQUFjO1FBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDSCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTTtRQUNKLE9BQU87WUFDTCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCx5QkFBeUI7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLDJCQUEyQjtZQUMzQixrQ0FBa0M7U0FDbkMsQ0FBQztJQUNKLENBQUM7Q0FDRiJ9