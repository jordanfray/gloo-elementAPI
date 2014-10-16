function getAnswersArray() {
	var answers = JSON.parse(elementAPI.userData().getValue('answers'));

	if (answers === undefined || answers === null ) {
		answers = [];
	};

    return answers;
};

function saveAnswer(questionNumber) {
	getAnswersArray();

	var selected = answers[questionNumber-1];
	
	if ( selected === "stronglyAgree" ) {
        $("#stronglyAgree").removeClass('deselected');
    } else if ( selected === "agree" ) {
        $("#agree").removeClass('deselected');
    } else if ( selected === "notSure" ) {
        $("#notSure").removeClass('deselected');
    } else if ( selected === "disagree" ) {
        $("#disagree").removeClass('deselected');
    } else if ( selected === "stronglyDisagree" ) {
        $("#stronglyDisagree").removeClass('deselected');
    };
    
	$('.options').click(function() {
        var id = event.target.id;
        $(".btn").addClass('deselected');
        $("#" + id).removeClass('deselected');
        
        answers[questionNumber-1] = id;
        elementAPI.userData().setValue('answers', JSON.stringify(answers));
        console.log(answers);
    });
}