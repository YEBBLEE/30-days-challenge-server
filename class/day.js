export class Day {
    constructor(number, isChecked) {
        this.number = number.toString();
        this.isChecked = isChecked==1 ? true : false;
    }
}

export class DaysInfo {
    constructor(daysId, days) {
        this.id = daysId;
        this.days = days;
    }
}