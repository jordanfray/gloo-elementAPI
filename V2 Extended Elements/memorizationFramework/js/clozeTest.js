var verseForm = '<div class="row alert alert-info hide"><form><div class="form-group"><label for="verseRef">Verse Reference</label><input class="form-control" id="verseRef" placeholder="i.e. John 3:16"></div><div class="form-group"><label for="verseText">Verse Text</label><textarea class="form-control" id="verseText" rows="3" placeholder="For God so loved the world..."></textarea></div><div class="radio">  <label>    <input type="radio" name="intervalOption" id="intervalOption1" value="2-3-5">    Remove 2nd-3rd-5th words  </label></div><div class="radio">  <label>    <input type="radio" name="intervalOption" id="intervalOption2" value="3-5-7" checked>    Remove 3rd-5th-7th words  </label></div><button type="submit" class="btn btn-default">Submit</button><form></div>';
var versesNum = 1;

function clozeTest(text, title, standard, author){
    textArray = text.split(' ');
    console.log(standard)
    if(standard === true || standard === "true"){
		for(var i = 0; i<textArray.length; i++){

			if((i+1)%3 === 0){
				// remove every 3rd word for level 3
				htmlString = '<span class="level-3">' + textArray[i] + '</span>'
				textArray[i] = htmlString;
			}else if((i+1)%5 === 0){
				// remove every 5th word for level 2
				htmlString = '<span class="level-2">' + textArray[i] + '</span>'
				textArray[i] = htmlString;
			}else if((i+1)%7 === 0){
				// remove every 7th word for level 3
				htmlString = '<span class="level-1">' + textArray[i] + '</span>'
				textArray[i] = htmlString;
			}
		}	
	} else {
		for(var i = 0; i<textArray.length; i++){

			if((i+1)%2 === 0){
				// remove every 3rd word for level 3
				htmlString = '<span class="level-3">' + textArray[i] + '</span>'
				textArray[i] = htmlString;
			}else if((i+1)%3 === 0){
				// remove every 5th word for level 2
				htmlString = '<span class="level-2">' + textArray[i] + '</span>'
				textArray[i] = htmlString;
			}else if((i+1)%5 === 0){
				// remove every 7th word for level 3
				htmlString = '<span class="level-1">' + textArray[i] + '</span>'
				textArray[i] = htmlString;
			}
		}	
	}
	var htmlInject = '<p>' + textArray.join(' ') + '</p>';
    // if(memSequence){
    //     $('#mem-' + memSequence).append(htmlInject);
    // } else {
        $('#memorization').append(htmlInject);
    // }	
    $('.reference').text(title);
    if(author) $('.author').text(author);
};

function memorizationFramework() {
    $('.nav-item').click(function() {
        var id = $(this).attr('id').split('-')[1];
        
        $(".nav-item").removeClass('active');
        $("#level-" + id).addClass('active');
        
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



$(document).on('ready', function(){
	$('#title').on('change', function(){
		$('#titleSpan').text($(this).val());
	});
	$('#author').on('change', function(){
		$('#authorSpan').text($(this).val());
	});
	$('#text').on('change', function(){
		$('#textSpan').text($(this).val());
	});
	$('[name=intervalOption').on('change', function(){
		var option = $(this).val();
		if(option === '2-3-5'){
			$('#standard').text('false');
			
		} else {
			$('#standard').text('true');
		}

	});
	$('#memForm').on('submit', function(e){
		e.preventDefault();
		$('.reference').text('');
		$('.author').text('');
		$('#memorization').find('p').empty();
		clozeTest($('#text').val(), $('#title').val(), $('#standard').text(), $('#author').val());
		memorizationFramework();

	})
	// for(var i=0; i<3; i++){
	// 	console.log('round ', i);
	// 	var newForm = $(verseForm).clone();
	// 	newForm.
	// 		attr('id', 'verse-' + i);
	// 	$('.formContainer').append(newForm);
	// 	if(i === 0){
	// 		$('#verse-'+i).removeClass('hide');
	// 	}
	// }

	// $('#howManyVerses').on('change', function(e){
	// 	var previousNum = versesNum;
	// 	versesNum = $(this).val();
	// 	console.log('versesNum: ', versesNum);
	// 	console.log('previousNum: ', previousNum);
	// 	// if(previousNum < versesNum){
	// 	// 	for(var i = versesNum-1; i>-1; i--){
	// 	// 		$('#verse-'+ i).removeClass('hide');
	// 	// 	}
	// 	// } else {
	// 	// 	for(var i = 0; i<versesNum; i++){
	// 	// 		$('#verse-'+ i).addClass('hide');
	// 	// 	}
	// 	if(versesNum === 1){
	// 		if(previousNum === 2){
	// 			$('#verse-1').addClass('hide');
	// 		} else {
	// 			$('#verse-1').addClass('hide');
	// 			$('#verse-2').addClass('hide');
	// 		}
	// 	}else if(versesNum === 2){
	// 		if(previousNum === 1){
	// 			$('#verse-1').removeClass('hide');
	// 		} else {
	// 			$('#verse-2').addClass('hide');
	// 		}
	// 	} else{
	// 		if(previousNum === 1){
	// 			$('#verse-1').removeClass('hide');
	// 			$('#verse-2').removeClass('hide');
	// 		} else {
	// 			$('#verse-2').removeClass('hide');
	// 		}
	// 	}
		
	// });
		
});