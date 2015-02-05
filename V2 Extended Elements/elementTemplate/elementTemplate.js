//////////////////////////
// set global variables //
//////////////////////////
var title, author, other;


////////////////////////////////
// enter module functionality //
////////////////////////////////
$(document).on('ready', function(){
    $('#title').on('change', function(){
        $('#titleSpan').text($(this).val());
        title = $(this).val();
    });
    $('#author').on('change', function(){
        $('#authorSpan').text($(this).val());
         author = $(this).val() || '';

    });
    $('#other').on('change', function(){
        $('#otherSpan').text($(this).val());
         other = $(this).val() || '';
    });
    
    $('#moduleForm').on('submit', function(e){
        e.preventDefault();
        $('.title').text(title);
        $('.author').text(author);
        $('.other').text(other);


    })



});