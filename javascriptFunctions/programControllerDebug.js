// I don't think this is working... Stay Tuned for a bug fix.
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

function getAppletData(applet, key, parse) {
    if (!!applet.data_bags) {
        var data_bag = applet.data_bags[((typeof key === "string") ? key : key.toString())];
        if (!!data_bag && parse === true) {
            try {
                return JSON.parse(data_bag)
            } catch(ex) {
                return data_bag
            }
        }
        return data_bag;
    }
    return null
}
