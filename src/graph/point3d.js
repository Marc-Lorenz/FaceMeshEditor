import { Point2D } from './point2d';
/**
 * Represents a 3D point with an ID, coordinates, and neighbor information.
 * Extends the base class Point2D.
 */
export class Point3D extends Point2D {
    /**
     * Creates a new Point3D instance.
     * @param {number} id - The unique identifier for the point.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     * @param {number} z - The z-coordinate of the point (additional dimension).
     * @param {number[]} neighbourIds - An array of neighbor IDs.
     */
    constructor(id, x, y, z, neighbourIds) {
        super(id, x, y, neighbourIds);
        this._z = z;
    }
    _z;
    /**
     * Gets or sets the z-coordinate of the point.
     * @returns {number} - The z-coordinate.
     */
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
    }
    /**
     * Returns a string representation of the 3D point.
     * @returns {string} - A formatted string with point details.
     */
    toString() {
        return `Point3D(id=${this.id}, x=${this.x}, y=${this.y}, z=${this.z})`;
    }
    /**
     * Creates a shallow copy of the 3D point.
     * @returns {Point3D} - A new Point3D instance with cloned properties.
     */
    clone() {
        const copy = new Point3D(this.id, this.x, this.y, this.z, this.getNeighbourIds());
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
            z: this.z,
            // hovered: this.hovered,
            deleted: this.deleted,
            // selected: this.selected,
            // neighbourIds: this.neighbourIds
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQzZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaC9wb2ludDNkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFcEM7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLE9BQVEsU0FBUSxPQUFPO0lBQ2xDOzs7Ozs7O09BT0c7SUFDSCxZQUNFLEVBQVUsRUFDVixDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxZQUFzQjtRQUV0QixLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRU8sRUFBRSxDQUFTO0lBRW5COzs7T0FHRztJQUNILElBQUksQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxDQUFDLENBQUMsS0FBYTtRQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sY0FBYyxJQUFJLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDSCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FDdEIsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLENBQUMsQ0FBQyxFQUNOLElBQUksQ0FBQyxDQUFDLEVBQ04sSUFBSSxDQUFDLENBQUMsRUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQ3ZCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNO1FBQ0osT0FBTztZQUNMLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULHlCQUF5QjtZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsMkJBQTJCO1lBQzNCLGtDQUFrQztTQUNuQyxDQUFDO0lBQ0osQ0FBQztDQUNGIn0=