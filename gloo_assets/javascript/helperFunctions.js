/*  
	File Updated: 10/15/2014
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

