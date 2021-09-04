export const convertTimestamp = (timestamp) => {
    let time = new Date(timestamp);
    let today = new Date();
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    let timeString;

    if (
        today.getDate() === time.getDate() &&
        Date.now() - timestamp < 86400000
    ) {
        timeString = "Today";
    } else if (
        yesterday.getDate() === time.getDate() &&
        Date.now() - timestamp < 172800000
    ) {
        timeString = "Yesterday";
    } else {
        timeString =
            time.getDate() +
            " " +
            time.toLocaleString("default", { month: "short" }) +
            " " +
            time.getFullYear();
    }

    return (
        timeString +
        " " +
        time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })
    );
};