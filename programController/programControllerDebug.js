var DEBUG = true;

function debuglog() {
    var stuff = Array.prototype.slice.call(arguments);
    if (DEBUG) {
        logger(JSON.stringify(stuff, null, 4));
    }
    if (typeof console !== 'undefined' && !!console.log) {
        console.log.call(null, stuff);
    }
}

(
    function (applets, programData) {
        var ids = []; // Default Applets

        debuglog(applets);

        // add logic to push applet ids into applets

        return ids;
    }
)
