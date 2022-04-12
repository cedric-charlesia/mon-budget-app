export default {
    showDate(date: string) {
        const newDate = new Date(date);

        let month;
        let day;
        let year;

        (month = "" + (newDate.getMonth() + 1)),
            (day = "" + newDate.getDate()),
            (year = newDate.getFullYear());

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        const dateTransaction = `${year}-${month}-${day}`;
        return dateTransaction;
    },
}