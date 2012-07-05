Back Button Handler
===================

Detects if browser's back button pressed by the user and sets a handler for this action.

Usage
-----
* Ensure that **backButtonHandler.js** is loaded along with every single HTML page of your site.
* Ensure that **backButtonHandler.js** is is the first executed javascript code on all pages, even before jQuery.
* Quick start: Uncomment appropriate lines at the bottom of **backButtonHandler.js**

Example
-------
You can set a handler to be executed when the user presses back button:

    var handler = handleBackAction({
      handler: function(previousHref) {
        window.location.href = "http://www.google.com";
      }
    });

If you don't want to do something but only know if back button is pressed you can use it like this:

    var handler = handleBackAction();
    handler.isBackPressed();//returns boolean

Online Example
--------------
See <http://dorukdestan.com/backhandler>

Compability
-----------
Works with all browsers where JavaScript and cookies are enabled. Yes even with IE6!

Caveats
-------
* If your web application gives seperate windows the same names (not using unique names) then this function will fail.
  - If your web application uses unique names for window names or doesn't give a name to windows at all, it is okay.
* If the user travels to your site via back button at first, the second navigation on your site is considered as 'back button pressed'
  - User on Google now, presses back button and lands on your site, clicks a link and travels to another page on your site. Now it is considered as 'back button pressed'
* This function sets 2 cookie values per page which shows your site. If you have strict limits on cookie size, use this with care. Otherwise just ignore this warning.

API
---
* When **backButtonHandler.js** is included in the page _**handleBackAction**_ function is available.
  - It takes Object as an argument in the form of `{handler: function}`
  - It returns an returns an Object has only one function: _.isBackPressed()_ which returns boolean.

License
-------
'Back Button Handler' is licensed under GPLv3.

'Back Button Handler' is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

'Back Button Handler' is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
