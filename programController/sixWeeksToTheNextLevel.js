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

/*
Applet Title    Applet ID        PC ID        Key
Welcome         9143            174327      "sixWeeksUnlock"
Start Here	    8628	        95889	    “weekZeroComplete"
Week One	    8424	        76703	    “weekOneComplete"
Week Two	    8921	        76704	    “weekTwoComplete"
Week Three	    8426	        76705	    “weekThreeComplete"
Week Four	    8427	        76706	    “weekFourComplete"
Week Five	    8428	        76707	    “weekFiveComplete"
Week Six	    8429	        76708	    “weekSixComplete"
*/

function checkUnlockApplet(applet, key) {
    if (!!applet.data_bags) {
        var data_bag = applet.data_bags[((typeof key === "string") ? key : key.toString())];
        return data_bag;
    }
    return null
}


var AppletGroups = {
    "174327" : {
        applets : [95889], // On completeion of "Start Here "
        databagKey : 'sixWeeksUnlock'
    },
    "95889" : {
        applets : [76703,133544], // On completeion of "Start Here "
        databagKey : 'week0Complete'
    },
    "76703" : {
        applets : [76704], // On completeion of "Week 1"
        databagKey : 'week1Complete'
    },
    "76704" : {
        applets : [76705], // On completeion of "Week 2"
        databagKey : 'week2Complete'
    },
    "76705" : {
        applets : [76706], // On completeion of "Week 3"
        databagKey : 'week3Complete'
    },
    "76706" : {
        applets : [76707], // On completeion of "Week 4"
        databagKey : 'week4Complete'
    },
    "76707" : {
        applets : [76708], // On completeion of "Week 5"
        databagKey : 'week5Complete'
    }
};

(
    function (applets, programData) {
        var ids = [174327,180786];

        for(var key in AppletGroups) {
            for(var i = 0; i < applets.length; i++){
                var sID = applets[i].id.toString()
                if (sID == key) {
                    if ( !!AppletGroups[sID] && checkUnlockApplet(applets[i], AppletGroups[sID].databagKey) == 'true' ) {
                        ids = ids.concat(AppletGroups[sID].applets);
                        break;
                    } else if ( !!AppletGroups[sID] && checkUnlockApplet(applets[i], AppletGroups[sID].databagKey) == 'false') {
                        break;
                    }
                }
            }
        }

       debuglog(
           "---------Applets----------", applets,
           "---------Returned IDs----------", ids,
           "---------Program Data----------", programData
       );
        return ids;
    }
)
