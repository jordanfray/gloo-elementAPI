//////////////////////////
// set global variables //
//////////////////////////
var title, author, questions, qNum, qHtml, qOrder, tagBtn, outputQuestion;
// hold questions for JSON object output
questions = [];
// start the question number count at 1 for ordering purposes
qNum = 1;
// array to keep track of questions
qOrder = [];
// html for individual question segment on form
qHtml = $('<div class="question alert alert-success form-group"><button type="button" class="close" aria-label="Close"><span class="closeSpan" aria-hidden="true">&times;</span></button><div class="form-group"><label class="questionLabel">Question</label><textarea class=\'form-control questionTextarea\'></textarea></div><div class="form-group tagHide"><label class="tagLabel">Tags <small><em>(separated with commas)</em></small></label><textarea class=\'form-control\'></textarea></div></div>');
// html for tags in output
tagBtn = $('<button class="btn btn-xs btn-success"><span></span></button>');
// html for question segment in output
outputQuestion = $('<div class="questionContainer alert alert-success"><h4 class="questionHeader">Question</h4><h5 class=\'tagHide\'>Tags</h5><div class="tagContainer tagHide"></div></div>');



////////////////////////////////
// enter module functionality //
////////////////////////////////
$(document).on('ready', function(){
    // update JSON after title and author text input is changed
    $('#title').on('change', function(){
        $('#titleSpan').text($(this).val());
        title = $(this).val();
    });
    $('#author').on('change', function(){
        $('#authorSpan').text($(this).val());
         author = $(this).val() || '';

    });
    // when the new question button is clicked on the form...
    $('#newQuestion').on('click', function(e){
        e.preventDefault();
        // create a new form element for a question
        var newEl = $(qHtml).clone();
        // add the new questions identifier to the ordering array
        qOrder.push(qNum);
        // set the new elements attributes to reflect the question number
        $(newEl).attr('id','questionSet-'+ qNum)
            .find('.questionLabel')
            // .text('Question '+ qNum)
            .attr('for', 'question' + qNum)
            .siblings('textarea')
            .attr('id','question' + qNum);

        $(newEl).find('.tagLabel')
            .attr('for', 'tag' + qNum)
            .siblings('textarea')
            .attr('id', 'tag' +qNum);
        // add option to remove a question after it's been added and adjust ordering array to reflect
        $(newEl).on('click','.closeSpan', function(e){
            e.preventDefault();
            console.log('click!');
            $(newEl).remove();
            var whichQ = $(newEl).attr('id').split('-')[1];
            console.log(whichQ);
            qOrder = _.without(qOrder, parseInt(whichQ));
        });
        // append new element to form
        $('.question-forms').append(newEl);
        // update question number to reflect current number of items
        qNum++;

    });
    // on submit of input
    $('#moduleForm').on('submit', function(e){
        e.preventDefault();
        // empty the question div in case there have been multiple submits
        $('.questionBox').empty();
        $('#questionSpan').empty();

        // change title and author text on output to form inputs
        $('.title').text(title);
        $('.author').text(author);
        // add an output for each of the questions on the input form
        for(var i=0; i<qOrder.length;i++){
            // retrieve question number
            var number = qOrder[i];
            // identify question set and corresponding values and store as variables
            var questionSet = $('#questionSet-'+number);
            var questionText = questionSet.find('.questionLabel').siblings('textarea').val();

            var tagText = questionSet.find('.tagLabel').siblings('textarea').val().split(',');
            // create output element for question
            var element = $(outputQuestion).clone();
            // 
            var jsonEl = $('<div id="jsonFor-'+ number +'"></div>');
            // add question text to element
            element.find('.questionHeader')
                .text(questionText);
            // for each tag in input, create a tag on the module output
            for(var o=0; o<tagText.length;o++){
                var tag = tagText[o];
                console.log(tag);
                var tagElement = $(tagBtn).clone();
                console.log(tagElement);
                $(tagElement).find('span').html(tag);
                $(element).find('.tagContainer').append(tagElement);

            }
            // append question segment to module output
            jsonEl.text(',{question: ' + questionText + ', tags: [' + tagText + ']}');
            $('#questionSpan').append(jsonEl);
            $('.questionBox').append(element);
        }



    });
    // to toggle between teacher and admin modes, hide and display tags using the class "tagHide"
    $('[name="options"]').on('change', function(e){
        var value = $(this).val();
        if(value === 'teacher'){
            $( "<style>.tagHide { display: none; }</style>" ).appendTo( "head" );
        } else {
            $( "<style>.tagHide { display: block; }</style>" ).appendTo( "head" );
        }

    });

});