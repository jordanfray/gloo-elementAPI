/*  
	File Updated: 10/17/2014
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