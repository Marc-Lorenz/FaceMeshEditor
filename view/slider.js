/**
 * Represents a slider input element.
 */
export class Slider {
    slider;
    onChangeCallback;
    /**
     * Creates a new Slider instance.
     * @param {string} id - The ID of the slider element.
     * @param {() => void} onChangeCallback - A callback function to execute when the slider value changes.
     */
    constructor(id, onChangeCallback) {
        this.slider = document.getElementById(id);
        this.slider.oninput = onChangeCallback;
        this.onChangeCallback = onChangeCallback;
    }
    /**
     * Gets the minimum value of the slider.
     * @returns {number} - The minimum value.
     */
    getMin() {
        return parseInt(this.slider.min);
    }
    /**
     * Gets the maximum value of the slider.
     * @returns {number} - The maximum value.
     */
    getMax() {
        return parseInt(this.slider.max);
    }
    /**
     * Gets the current value of the slider.
     * @returns {number} - The current value.
     */
    getValue() {
        return parseInt(this.slider.value);
    }
    /**
     * Sets the value of the slider.
     * @param {number} value - The desired value.
     */
    setValue(value) {
        this.slider.value = String(value);
        this.onChangeCallback();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZpZXcvc2xpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLE1BQU07SUFDRSxNQUFNLENBQW1CO0lBQ3pCLGdCQUFnQixDQUFhO0lBRTlDOzs7O09BSUc7SUFDSCxZQUFZLEVBQVUsRUFBRSxnQkFBNEI7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBcUIsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU07UUFDRixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNO1FBQ0YsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUTtRQUNKLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBQ0oifQ==