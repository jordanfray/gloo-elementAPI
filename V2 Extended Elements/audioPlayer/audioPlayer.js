var title, author, url;

function audioPlayer(audioURL, audioTitle, audioAuthor) {
    $("#audioPlayer").append("<div class='row'><div class='col-md-2'><span class='fa-stack fa-2x'><i class='fa fa-circle fa-stack-2x'></i><span id='play-pause' class='play'><i class='fa fa-play fa-stack-1x'></i></span></span></div><div class='col-md-8'><input type='range' id='seek' value='0' max=''/></div><div class='duration col-md-2'>0:00</div></div>");
    var song = new Audio(audioURL);
    if(audioAuthor){
        $('#audioPlayer').prepend('<h5>' + audioAuthor + '</h5>');
    } 
    if(audioTitle){
        $('#audioPlayer').prepend('<h3>' + audioTitle + '</h3>');
    }
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

$(document).on('ready', function(){
    $('#title').on('change', function(){
        $('#titleSpan').text($(this).val());
        title = $(this).val();
    });
    $('#author').on('change', function(){
        $('#authorSpan').text($(this).val());
         author = $(this).val();
    });
    $('#url').on('change', function(){
        // $('#urlSpan').text($(this).val());
        $('#urlSpan').text('Final Masquerade Remix.mp3');
        url = 'Final Masquerade Remix.mp3';
    });
    
    $('#memForm').on('submit', function(e){
        e.preventDefault();
        $('.reference').text('');
        $('.author').text('');
        $('#audioPlayer').empty();
        audioPlayer(url, title, author);

    })



});