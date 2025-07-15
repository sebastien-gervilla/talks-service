export const getDateDayRange = (date: Date) => {
    const copy = new Date(date);
    const start = new Date(copy.setHours(0, 0, 0, 0));
    const end = new Date(copy.setHours(23, 59, 59, 999));
    return [start, end];
}

export const stripTime = (date: Date): Date => {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
}