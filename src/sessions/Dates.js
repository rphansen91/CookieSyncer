function inOneWeek () {
    return new Date().getTime() + (604800 * 1000);
}

function toUTCFormat (time) {
    return new Date(time).toUTCString();
}

module.exports = {
    inOneWeek,
    toUTCFormat,
    inOneUTCWeek: () => toUTCFormat(inOneWeek())
}