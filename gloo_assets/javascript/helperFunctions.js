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

function postToSpace(postBtnClass,loadPreviousText) {
    
    if ( loadPreviousText ) {
        // Check to see if the user has answered any of the questions and load their previous answers into the textareas
        var answers = JSON.parse(elementAPI.userData().getValue("answers"));
        //console.log(answers);

        if ( answers === undefined || answers === null ) {
            answers = [];
        } else {
            for ( var i=0; i<answers.length; i++ ) {
                $("#textarea-" + i).text(answers[i]);
            }
        }
    };

    // Save the users answer to the "answers" array and post the text to the selected space
    $(postBtnClass).click(function() {
        var id= $(this).attr('id').split('-')[1];
        
        var question = $("#question-" + id).text();
        var answer = $("#textarea-" + id).val();
        
        answers[id] = answer;
        elementAPI.userData().setValue("answers", JSON.stringify(answers));
        
        //Notice difference in URL for Android and iOS
        if (navigator.userAgent.match(/Android/i)) { //Android
            var url = "gloo://app/journal?desc=" + question.replace(/ /g, "%20") + "&text=" + answer.replace(/ /g, "%20");
            document.location = url;     
        } else { //iOS
            var url = "gloo://app/saved_items/new/note?desc=" + question.replace(/ /g, "%20") + "&text=" + answer.replace(/ /g, "%20");
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

function singleElementNavigation(nav) {
    // Applet Title
    $("#lower-nav").append("<div class='applet-title'>" + nav['appletTitle'] + " </div>");
    
    // Elements
    for ( var i=0; i < nav['elements'].length; i++ ) {
        $("#lower-nav").append("<a href='gloo://app/applets/" + nav['elements'][i][1] + "'><div id='nav-" + i + "' class='nav-position'><i class='fa fa-circle-o'></i></div><div id='" + i + "' class='applet-link'>" + nav['elements'][i][0] + "</div><br></a>");
    }
};

function memorizationFramework() {
    $('.nav-item').click(function() {
        var id = $(this).attr('id').split('-')[1];
        
        $(".nav-item").removeClass('selected');
        $("#level-" + id).addClass('selected');
        
        $(".level-1, .level-2, .level-3").removeClass('word-hide');
        
        if ( id === "1" ) {
            $(".level-1").addClass('word-hide');
        } else if ( id === "2" ) {
            $(".level-1").addClass('word-hide');
            $(".level-2").addClass('word-hide');
        } else if ( id === "3" ) {
            $(".level-1").addClass('word-hide');
            $(".level-2").addClass('word-hide');
            $(".level-3").addClass('word-hide');
        };
    });
};

function multipleMemorization(){
	$('.mem-anchor').on('click', function(e){
	    e.preventDefault();
	    var memNum = $(this).attr('mem-id-match');
	    var activeNum = $('.mem-anchor-active').find('a').attr('mem-id-match');
	    var currentMem = $(this);
	
	    if(activeNum !== memNum){
	        $('[mem-id = ' + activeNum +']').slideUp();
	       $('[mem-id-match = ' + activeNum + ']')
	            .closest('div')
	           .removeClass('mem-anchor-active')
	           .find('i')
	           .removeClass('fa-caret-down')
	           .addClass('fa-caret-up');
	       
	        currentMem
	            .closest('div')
	            .addClass('mem-anchor-active')
	            .find('i')
	            .removeClass('fa-caret-up')
	            .addClass('fa-caret-down');
	            
	        $('[mem-id = ' + memNum +']').slideDown();
	    } 
	});
};

function audioPlayer(audioId, audioURL) {
    $("#" + audioId).append("<span class='fa-stack fa-2x'><i class='fa fa-circle fa-stack-2x'></i><span id='play-pause' class='play'><i class='fa fa-play fa-stack-1x'></i></span></span><input type='range' id='seek' value='0' max=''/><div class='duration'>0:00</div>");
    var song = new Audio(audioURL);

    function duration() {
      var checkTime =  setInterval(function() {
                var currentTime = Math.round(song.duration) - song.currentTime;
                
                if(song.duration === song.currentTime) elementAPI.createAnalyticEvent("soundBiteStatus", "completed");
    
                if ( currentTime === -(song.duration -  Math.round(song.duration)) ) {
                    
                    clearInterval(checkTime);
                } else {
                    var seconds = Math.round(currentTime%60);
                    var minutes = Math.floor(currentTime/60);
                    if ( typeof song.duration != 'number' ) {
                        $(".duration").text("0:00");
                    } else if ( seconds < 10 ) {
                        $(".duration").text(minutes + ":" + "0" + seconds);
                    } else {
                        $(".duration").text(minutes + ":" + seconds);
                    }
                    $("#seek").val(song.currentTime);
                }
            },1000);
    };

    $("#play-pause").click(function() {
        duration();
        if ( $("#play-pause").hasClass('play') ) {
            song.play();
            elementAPI.createAnalyticEvent("soundBiteStatus", "started");
            $("#play-pause").empty().append('<i class="fa fa-pause fa-stack-1x"></i>');
            $("#play-pause").removeClass('play').addClass('pause');
        } else {
            song.pause();
            $("#play-pause").empty().append('<i class="fa fa-play fa-stack-1x"></i>');
            $("#play-pause").removeClass('pause').addClass('play');
        }
    });

    $("#seek").bind("change", function() {
        song.currentTime = $(this).val();
        $("#seek").attr("max", song.duration);
        $("#seek").val(song.currentTime);
    });
}

// Please be carefull this this one. 
function joinGroup(group_id) { 
    elementAPI.group(group_id).subscribe(function(data) {
        groupData = JSON.parse(data.response); 
    });
};
