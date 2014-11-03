function topicSlides(slides) {
    var selectedSlides = JSON.parse(elementAPI.userData().getValue('selectedSlides'));
    
    if ( selectedSlides === undefined || selectedSlides === null) {
        selectedSlides = [];
    };

    $("body").append("<div id='fullpage'></div>");
    
	for (var i=0; i < slides.length; i++ ) {
		$("#fullpage").append("<div class='section'><div class='tile'><img src='" + slides[i]['image'] + "'><div class='title-block'><a id='add-" + i + "' class='button'>" + slides[i]['buttonText'] + "</a><div class='title'>" + slides[i]['title'] + "</div><div class='rule'></div><div class='type'>" + slides[i]['type'] + "</div><div class='description'>" + slides[i]['description'] + "</div></div></div></div>")
	}
    
    for ( var i=0; i < selectedSlides.length; i++ ) {
        $("#" + selectedSlides[i]).addClass('selected');
        $("#" + selectedSlides[i]).text("Remove");
    };
    
    $('#fullpage').fullpage({
        scrollingSpeed: 0,
        css3: true
    });
    
    for ( var i=0; i<slides.length; i++ ) {
        if ( slides[i]['buttonMode'] === "view" ) {
            $("#" + "add-" + i).attr('href', "gloo://app/applets/" + slides[i]['applet']);
        }
    };
    
    $('.button').click(function() {
        var id= $(this).attr('id');
    
        if ( slides[id.split('-')[1]]['buttonMode'] === "add" ) {
            if ($("#" + id).hasClass('selected') === true ) {
                $("#" + id).removeClass('selected');
                $("#" + id).text("Add");
                selectedSlides.splice(selectedSlides.indexOf(id),1);
                var thisApplet = "applet" + id.split("-")[1];
                
                elementAPI.userData().setValue("applet-" + slides[id.split('-')[1]]['applet'] + "-added", "false");
                elementAPI.userData().setValue("selectedSlides",JSON.stringify(selectedSlides));
            } else {
                $("#" + id).addClass('selected');
                $("#" + id).text("Remove");
                selectedSlides.push(id);
                var thisApplet = "applet" + id.split("-")[1];
                elementAPI.userData().setValue("applet-" + slides[id.split('-')[1]]['applet'] + "-added", "true");
                elementAPI.userData().setValue("selectedSlides",JSON.stringify(selectedSlides));
            }
        }
    });
};


