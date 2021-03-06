Gloo Element API
===============

**[Check out the wiki for more information](https://github.com/jordanfray/gloo-elementAPI/wiki)**
###Table of Contents

1. [**What is Element API?**](https://github.com/jordanfray/gloo-elementAPI#what-is-element-api)
  1. [Scope of Data](https://github.com/jordanfray/gloo-elementAPI#scope-of-data)
  2. [User() Object](https://github.com/jordanfray/gloo-elementAPI#user-object)
  3. [UserData() Object](https://github.com/jordanfray/gloo-elementAPI#userdata-object)
  4. [Analytic Events](https://github.com/jordanfray/gloo-elementAPI#analytic-events)
2. [**Asset Bundles**](https://github.com/jordanfray/gloo-elementAPI#asset-bundles)
  1. [Creating an Asset Bundle](https://github.com/jordanfray/gloo-elementAPI#creating-an-asset-bundle)
  2. [Uploading an Asset Bundle](https://github.com/jordanfray/gloo-elementAPI#uploading-an-asset-bundle)
  3. [Using an Asset Bundle](https://github.com/jordanfray/gloo-elementAPI#using-an-asset-bundle)
  4. [Gloo Hosted Assets](https://github.com/jordanfray/gloo-elementAPI#gloo-hosted-assets)
3. [**Gloo Sandbox**] (https://github.com/jordanfray/gloo-elementAPI#gloo-sandbox)
  1. [Creating an EAPI element](https://github.com/jordanfray/gloo-elementAPI#creating-an-eapi-element)
  2. [Prerequisites](https://github.com/jordanfray/gloo-elementAPI#prerequisites)
  3. [Basic Setup](https://github.com/jordanfray/gloo-elementAPI#basic-setup)

===============

## What is Element API?

Element API (EAPI) is an *Element Type* and an *API* that allows for rich and engaging interactive content to be developed and deployed within the gloo system. 

**EAPI The API**: The API allows the content creator to access data in the `UserData()` and `User()` objects. 

**EAPI The Element Type**: The EAPI Element is an open sandbox for creating content using HTML, CSS, Javascript, and jQuery.

#### Scope of Data
Data in the `userData()` object is scoped to the user and the applet. In other words, you can read and write data to the Data Bag between elements that are in the same applet but you can't access data in another applet. 

The `user()` object is read only. 

#### User() Object
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
Learn how you can use the `getUserObject()` helper function [HERE.](https://github.com/jordanfray/gloo-elementAPI/wiki/helperFunctions.js#getuserobject)

*There is also a `partner()` object that holds the same data for the user's partner.*

#### UserData() Object
The `userData()` object holds data that is passed to it from an element. This data is unique to the user and scoped to the applet.

```javascript
$(document).ready(function() {
	var db = elementAPI.userData();

	var string = "String Value";
	var array = [3, "string", ["item1", "item2"], 200];
	
	// Save to the data bag
	db.setValue('stringKey', string);
	db.setValue('arrayKey', JSON.stringify(array));

	// Get from the data bag
	var string = db.getValue('stringKey');
	var array = JSON.parse(db.getValue('arrayKey'));
});
```
*There is also a `partnerData()` object that holds the same data for the user's partner.*

Reminder: `elementAPI.userData().getValue();` returns a string. It is highly recommended that you `JSON.stringify` or `toString()` everything that you send to the Data Bag.

#### Analytic Events

Analytic events can be triggered using the API. This is helpful for tracking specific interactions or collecting the response to a specfic question. 

To create and analytic event, use this: `elementAPI.createAnalyticEvent(key, value)`

The analytics team has requested that we send one key with one value instead of sending a key along with a stringified object. 

```javascript
//Don't do this
elementAPI.createAnalyticEvent("myKey", "/ 'value1','value2', 4, 27 /");

// Do this
elementAPI.createAnalyticEvent("myKey1", "value1");
elementAPI.createAnalyticEvent("myKey2", "value2");
elementAPI.createAnalyticEvent("myKey3", 4);
elementAPI.createAnalyticEvent("myKey4", 27);
```

===============

## Asset Bundles

**Asset Bundles** are the mechanism in gloo for storing files externally for use in EAPI elements. These "bundles" are zipped folders with a series of organized sub folders containing things like CSS, Javascript, jQuery libraries, images, videos, fonts, etc.


#### Creating an Asset Bundle
Asset Bundles can be created by simply organizing your files into a *root* folder.  Here is a sample folder structure:

- myAssets
  - css
    - style.css
  - images
    - image1.jpg
    - image2.png
    - background.jpg
  - javascript
    - jQuery_2.0.3.js
    - highcharts.js

**File Requirements**

File names cannot include spaces. Use underscores or camelCase instead of spaces. Files names must include file extensions (.jpg, .png, .css, .js, etc).

#### Uploading an Asset Bundle
To upload an asset bundle, zip or compress your root folder containing your assets. *Make sure the folder name has no spaces in it and it has a extension of .zip*. Once your zipped folder is ready, go to the [Gloo portal](http://gloo.us/media) and click on the **Content Tab**. From this page, click **Media Manager** in the left navigation pane. Click **Choose Files** in the section titled *Upload Asset Bundle*.

![alt text](https://d1yyrsno1mfwjj.cloudfront.net/uploads/media/image/37366/open-uri20141015-26494-1iebcpj "Click Choose Files")

**Important** Uploading an asset bundle with the same name as an existing bundle will **overwrite** the original bundle. 

#### Using an Asset Bundle
Uploading an asset bundle adds the folder and files to the Gloo Amazon S3 account. You can access your uploaded files with a unique URL. First, you'll need to find your Organization ID. In the Gloo Portal, click on your name in the top right corner to make sure you are operating as the org you uploaded the assets for. Next, click [**My Organization**](http://gloo.us/organizations) in your name's sub menu.  Then click **Edit Organization**. Your organization's ID can be found in the URL on this page. 

`"gloo_assets_orgId/rootFolderName/subFolderName/fileName.extension"`

Example: `"gloo_assets_321/myAssets/css/style.css"`

#### Gloo Hosted Assets
Asset Bundles can be used in other organizations other than the one they were uploaded to. Gloo has hosted some frequently used assets for the Gloo community to use as desired. 

```javascript
jQuery
<script type="text/javascript" src="gloo_assets_321/gloo_assets/javascript/jQuery_1.11.1.js"></script>

Gloo helperFunctions.js
<script type="text/javascript" src="gloo_assets_321/gloo_assets/javascript/helperFunctions.js"></script>

HighCharts.js
<script type="text/javascript" src="gloo_assets_321/gloo_assets/javascript/highcharts.js"></script>

gloo bootstrap.css 
<link rel="stylesheet" type="text/css" href="gloo_assets_321/gloo_assets/stylesheets/style.css">

normalize.css
<link rel="stylesheet" type="text/css" href="gloo_assets_321/gloo_assets/stylesheets/normalize.css">
```

## Gloo Sandbox

#### Creating an EAPI element

**Once you have created an applet, click "Create Element".**

![alt text](https://d1yyrsno1mfwjj.cloudfront.net/uploads/media/image/37367/open-uri20141015-26494-1yyny0k "Click "Create Element")

**Next, follow steps 1 through 4 to title and save the element.**

  1. Give the element a title
  2. Change the element "kind" to *"Element API"*
  3. Turn OFF default CSS
  4. Click *"Save Element to go to Sandbox Mode"*

![alt text](https://d1yyrsno1mfwjj.cloudfront.net/uploads/media/image/37368/open-uri20141015-26494-1jw30b1 "Click "Create Element")

#### Prerequisites
There are a few things that must be included in your element:
  1. jQuery
  2. style.css (if you want to use the gloo bootstrap)
  3. helperFunctions.js (if you want to use these functions)
  4. Any other jQuery libraries you want to use


#### Basic Setup

Here is a sample basic setup for a new element.

```html
<head>
    <script type="text/javascript" src="gloo_assets_321/gloo_assets/javascript/jQuery_1.11.1.js"></script>
    <link href="gloo_assets_321/gloo_assets/stylesheets/style.css" media="screen" rel="stylesheet" type="text/css">
</head>

<body>
    
    <div class="content-container">
	<!-- Content with margin goes here -->
    </div>
    
    <script type="text/javascript" src="gloo_assets_321/gloo_assets/javascript/helperFunctions.js"></script>
    
    <script>
        $(document).ready(function() {
            var user = getUserObject();
            var userData = elementAPI.userData();
            
            // Your javascript/jQuery goes here
        }); 
        
        // For documentation on the helperFunctions, visit https://github.com/jordanfray/gloo-elementAPI/wiki/helperFunctions.js
    </script>
</body>
```
