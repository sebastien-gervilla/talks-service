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

export const isSameDay = (a: Date, b: Date): boolean => {
    const dateA = new Date(a);
    const dateB = new Date(b);

    return dateA.getDate() === dateB.getDate()
        && dateA.getMonth() === dateB.getMonth()
        && dateA.getFullYear() === dateB.getFullYear()
}