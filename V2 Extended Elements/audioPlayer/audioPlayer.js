function audioPlayer(audioId, audioURL) {
    $("#" + audioId).append("<span class='fa-stack fa-2x'><i class='fa fa-circle fa-stack-2x'></i><span id='play-pause' class='play'><i class='fa fa-play fa-stack-1x'></i></span></span><input type='range' id='seek' value='0' max=''/><div class='duration'>0:00</div>");
    var song = new Audio(audioURL);

    function duration() {
      var checkTime =  setInterval(function() {
                var currentTime = Math.round(song.duration) - song.currentTime;
    
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
};