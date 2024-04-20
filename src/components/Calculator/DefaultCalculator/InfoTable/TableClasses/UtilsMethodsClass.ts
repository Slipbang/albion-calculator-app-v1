export class UtilsMethodsClass {
    constructor(public currentDate: Date,) {}

    getTime = (date: string) => {
        if (date === '1970-01-01T00:00:00.000Z') return '';

        const hours = (this.currentDate.getTime() - Date.parse(date)) / (60 * 60 * 1000);

        return `<span style="color: ${hours <= 5 ? "green" : "red"}">(${hours <= 24 ? `${Math.round(hours) || '<1'}h` : `${Math.round(hours / 24)}d`})</span>`;
    }
}