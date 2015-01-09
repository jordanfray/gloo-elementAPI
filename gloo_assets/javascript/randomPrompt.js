var randomPrompt = function(){
    var response0 = '<div class=element-container><div id=question-1 class="h6 question">Record your thoughts and feelings about today’s meditation.</div><textarea rows=5 id=textarea-1></textarea><div id=postToSpace-1 class="btn post">Post</div></div>';
    
    var response1 = '<div class=element-container><div id=question-2 class="h6 question">How are these truths impacting you today?</div><textarea rows=5 id=textarea-2></textarea><div id=postToSpace-2 class="btn post">Post</div></div>';
    
    var response2 = '<div class=element-container><div id=question-3 class="h6 question">Write down what God is showing you today.</div><textarea rows=5 id=textarea-3></textarea><div id=postToSpace-3 class="btn post">Post</div></div>';
    
    var responseArray = [response0, response1, response2];
    var randomNumber = Math.floor(Math.random() * (3 - 0)); 
    console.log(responseArray[randomNumber])

   	$('body').append($(responseArray[randomNumber]));
};