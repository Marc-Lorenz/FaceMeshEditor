/**
 * Represents a history of annotations for a specific file.
 * Keeps track of changes made to a graph of points (e.g., annotations on an image).
 * @template T - Type of the points (must extend Point2D).
 */
export class FileAnnotationHistory {
    cacheSize;
    history = [];
    currentHistoryIndex = 0;
    _file;
    /**
     * Creates a new FileAnnotationHistory instance.
     * @param {File} file - The file associated with the annotations.
     * @param {number} cacheSize - The maximum number of history entries to retain.
     */
    constructor(file, cacheSize) {
        this._file = file;
        this.cacheSize = cacheSize;
    }
    /**
     * Gets the associated file.
     * @returns {File} - The file associated with the annotations.
     */
    get file() {
        return this._file;
    }
    /**
     * Adds a new annotation item to the history.
     * @param {Graph<T>} item - The graph of points representing the annotation.
     */
    add(item) {
        if (this.currentHistoryIndex + 1 < this.history.length) {
            // Delete history stack when moved back and changed something
            this.history.length = this.currentHistoryIndex + 1;
        }
        if (this.cacheSize === this.history.length) {
            // Remove the first item as it is too old and cache limit is reached
            this.history.shift();
        }
        this.history.push(item.clone());
        this.currentHistoryIndex = this.history.length - 1;
    }
    /**
     * Sets the current history index to the specified value.
     * @param {number} index - The desired history index.
     */
    setIndex(index) {
        if (index < 0) {
            index = 0;
        }
        else if (index >= this.history.length) {
            index = this.history.length - 1;
        }
        this.currentHistoryIndex = index;
    }
    /**
     * Moves to the next history entry.
     */
    next() {
        this.setIndex(this.currentHistoryIndex + 1);
    }
    /**
     * Moves to the previous history entry.
     */
    previous() {
        this.setIndex(this.currentHistoryIndex - 1);
    }
    /**
     * Retrieves the current annotation graph.
     * @returns {null | Graph<T>} - The current annotation graph or null if empty.
     */
    get() {
        if (!this.isEmpty()) {
            return this.history[this.currentHistoryIndex];
        }
        return null;
    }
    /**
     * Checks if the history is empty.
     * @returns {boolean} - True if empty, false otherwise.
     */
    isEmpty() {
        return this.history.length === 0;
    }
    /**
     * Clears the entire history.
     */
    clear() {
        this.history.length = 0;
        this.currentHistoryIndex = 0;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUFubm90YXRpb25IaXN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NhY2hlL2ZpbGVBbm5vdGF0aW9uSGlzdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLHFCQUFxQjtJQUNmLFNBQVMsQ0FBUztJQUMzQixPQUFPLEdBQWUsRUFBRSxDQUFDO0lBQ3pCLG1CQUFtQixHQUFXLENBQUMsQ0FBQztJQUN2QixLQUFLLENBQU87SUFFN0I7Ozs7T0FJRztJQUNILFlBQVksSUFBVSxFQUFFLFNBQWlCO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUcsQ0FBQyxJQUFjO1FBQ2hCLElBQUksSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3ZELDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQyxvRUFBb0U7WUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDZCxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1osQ0FBQzthQUFNLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxHQUFHO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0YifQ==