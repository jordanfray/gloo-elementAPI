/*  
	File Updated: 11/04/2014
	Documentation: https://github.com/jordanfray/gloo-elementAPI/wiki/helperFunctions.js
*/

// This fuction sets up the userObject with easy access to all of it's data
function getUserObject() {
	var user = {
		"id":elementAPI.user().data.id,
		"first_name":elementAPI.user().data.first_name,
		"last_name":elementAPI.user().data.last_name,
		"has_partner":elementAPI.user().data.has_partner,
		"relationship_id":elementAPI.user().data.partner_relationship_id,
		"gender":elementAPI.user().gender(),
		"avatar":elementAPI.user().avatar()
	}

	return user;
}

// Sort the array Highest to Lowest
function sortArrayDescending(array,column) {
    array.sort(function(a,b) {
	    return b[column]-a[column];
	});
}

// Sort the array Lowest to Highest
function sortArrayAscending(array,column) {
	array.sort(function(a,b) {
	    return a[column]-b[column];
	});
}

function postToSpace(postBtnClass) {
    // Check to see if the user has answered any of the questions and load their previous answers into the textareas
    var answers = JSON.parse(elementAPI.userData().getValue("answers"));
    console.log(answers);

    if ( answers === undefined || answers === null ) {
        answers = [];
    } else {
        for ( var i=0; i<answers.length; i++ ) {
            $("#textarea-" + i).text(answers[i]);
        }
    }
        
    // Save the users answer to the "answers" array and post the text to the selected space
    $(postBtnClass).click(function() {
        var id= $(this).attr('id').split('-')[1];
        
        var question = $("#question-" + id).text();
        var answer = $("#textarea-" + id).val();
        var url = "gloo://app/saved_items/new/note?desc=" + question.replace(/ /g, "%20") + "&text=" + answer.replace(/ /g, "%20");
        
        answers[id] = answer;
        elementAPI.userData().setValue("answers", JSON.stringify(answers));
        
        if (navigator.userAgent.match(/Android/i)) {
            document.location = url;     
        } else {
            window.location.replace(url);
        }
    });
}

function sortableList(dataBagKey) {
    var list = document.querySelector('ul#sortable-list');
    new Slip(list);
    
    var order = JSON.parse(elementAPI.userData().getValue('order'));
    
    if (order === undefined || order === null) {
        order = [];
    }
    
    for (var i=0; i<=order.length; i++) {
        $('ul li:nth-child(' + i + ')').text(order[i]);
    }
    
    function saveOrder() {
        for( var i=1; i<=document.getElementsByTagName('li').length; i++ ) {
            order[i] = $('ul li:nth-child(' + i + ')').text();
        }
        elementAPI.userData().setValue(dataBagKey, JSON.stringify(order));
    }
    
    list.addEventListener('slip:reorder', function(e) {
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
    });
    
    list.addEventListener('slip:reorder', saveOrder);
};

// Turn off Internal Review in the mobile apps
function disableInternalReview() {
    var links = document.getElementsByTagName("a");
    for ( var i=0; i<links.length; i++ ) {
        if ( links[i].text === "INTERNAL REVIEW") {
            links[i].style.display = 'none';
        };
    };
};

function navigation(nav) {
    $("#lower-nav").append("<div class='applet-title'>" + nav['appletTitle'] + " </div>");
    
    // Previous Applets
    for ( var i=0; i < nav['previousApplets'].length; i++ ) {
        $("#lower-nav").append("<a href='gloo://app/applets/" + nav['previousApplets'][i][1] + "'><i class='fa fa-circle-o'></i><div class='applet-link'>" + nav['previousApplets'][i][0] + "</div><br></a>");
    }
    
    // This Applet
    $("#lower-nav").append("<i class='fa fa-arrow-circle-right'></i><div class='this-applet'>" + nav['thisApplet'] + "</div><br>");
    
    // Next Applets
    for ( var i=0; i < nav['nextApplets'].length; i++ ) {
        $("#lower-nav").append("<a href='gloo://app/applets/" + nav['nextApplets'][i][1] + "'><i class='fa fa-circle-o'></i><div class='applet-link'>" + nav['nextApplets'][i][0] + "</div><br></a>");
    }
};