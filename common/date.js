export function setStartDate() {
    let startStr = new Date().toLocaleDateString();
    return startStr.substring(0, startStr.lastIndexOf('.'));
}

export function setEndDate() {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    let endStr = date.toLocaleDateString();
    return endStr.substring(0, endStr.lastIndexOf('.'));
}
// 필요없어서삭제될 예정

