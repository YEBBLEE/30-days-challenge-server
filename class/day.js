export class Day {
    constructor(number, isChecked) {
        this.number = number.toString();
        this.isChecked = isChecked;
    }
}

export function initDays() {
    let days = [];

    for (let i = 0; i < 30; i++) {
        const day = new Day(i+1, false);
        days.push(day);
    }
    return days;
}