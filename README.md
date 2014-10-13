Gloo Element API
===============

###Table of Contents

1. **What is Element API?**
  1. EAPI Defined
  2. Scope of Data
  3. User Object
  4. User Data Object
  5. Analytic Events
2. **Asset Bundles**
  1. Creating an Asset Bundle
  2. Uploading an Asset Bundle
  3. Using an Asset Bundle
  4. Gloo Hosted Assets
3. **Gloo Sandbox**
  1. Creating and EAPI element
  2. Prerequisites 
  3. Basic Setup

===============

## What is Element API?

#### EAPI Defined
Element API (EAPI) is an *Element Type* and and *API* that allows for rich and engaging interactive content to be developed and deployed within the gloo system. 

**EAPI The API**: The API allows the content creator to access data in the `UserData()` and `User()` objects. 

**EAPI The Element Type**: The EAPI Element is an open sandbox for creating content using HTML, CSS, Javascript, and jQuery.

#### Scope of Data
Data in the `userData()` object is scoped to the user and the applet. In other words, you can read and write data to the Data Bag between elements that are in the same applet but you can't access data in another applet. 

The `user()` object is read only. 

#### User Object
The `user()` object holds information about the user:
  - user id
  - first name
  - last name
  - has partner?
  - gender
  - partner relationship id
  - avatar URL

```javascript
  $(document).ready(function() {
    var user = elementAPI.user();
    var userId = user.data.id;
    var firstName = user.data.first_name;
    var lastName = user.data.last_name;
    var hasPartner = user.data.has_partner;
    var gender = user.gender();
    var partnerRelationship = user.data.partner_relationship_id;
    var avatarURL = user.avatar();
  };

```
*There is also a `partner()` object that holds the same data for user's partner.*

#### User Data Object
The `userData()` object holds data that is passed to it from an element. This data is unique to the user and scoped to the applet.

```javascript
$(document).ready(function() {
	var db = elementAPI.userData();

	var string = "String Value";
	var array = [3, "string", ["item1", "item2"], 200];
	
	// Save to the data bag
	db.setValue('stringKey', string);
	db.setValue('arrayKey', JSON.stringify(array));

	// Get "value" from the data bag
	var string = db.getValue('stringKey');
	var array = JSON.parse(db.getValue('arrayKey'));
});
```
*There is also a `partnerData()` object that holds the same data for user's partner.*

Reminder: `elementAPI.userData().getValue();` returns a string. It is highly recommended that your `JSON.stringify`or `toString()` on everything that you send to the Data Bag.

#### Analytic Events

