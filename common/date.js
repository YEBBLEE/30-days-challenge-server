export function setDate(dateTime) {
    let date = new Date(dateTime).toLocaleDateString();
    return date.substring(0,date.lastIndexOf('.'));
}

