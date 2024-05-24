/**
 * Represents a checkbox element.
 */
export class CheckBox {
    elem;
    /**
     * Creates a new CheckBox instance.
     * @param {string} id - The ID of the checkbox element.
     * @param {() => void} onChangeCallback - A callback function to execute when the checkbox value changes.
     */
    constructor(id, onChangeCallback) {
        this.elem = document.getElementById(id);
        this.elem.onchange = onChangeCallback;
    }
    /**
     * Checks whether the checkbox is currently checked.
     * @returns {boolean} - True if checked, false otherwise.
     */
    isChecked() {
        return this.elem.checked;
    }
    /**
     * Sets the checkbox to the specified checked state.
     * @param {boolean} checked - The desired checked state (true or false).
     */
    setChecked(checked) {
        this.elem.checked = checked;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmlldy9jaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sT0FBTyxRQUFRO0lBQ1gsSUFBSSxDQUFtQjtJQUUvQjs7OztPQUlHO0lBQ0gsWUFBWSxFQUFVLEVBQUUsZ0JBQTRCO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQXFCLENBQUM7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxVQUFVLENBQUMsT0FBZ0I7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzlCLENBQUM7Q0FDRiJ9