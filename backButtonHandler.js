/*
    AUTHOR:
    Destan Sarpkaya - 2012
    destan@dorukdestan.com
  
    LICENSE:
    'Back Button Handler' is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    'Back Button Handler' is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with 'Back Button Handler'.  If not, see <http://www.gnu.org/licenses/>.
*/

function handleBackAction (arguments) {

  var COOKIE_BASE = "ck_";
  var isBackPressed = false;
  
  if(arguments){
    var handler = arguments.handler;
  }

  function setCookie(cookieName,value,exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie = cookieName + "=" + c_value;
    return;
  }

  function getCookie(cookieName) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x = x.replace(/^\s+|\s+$/g,"");
      
      if (x == cookieName){
        return unescape(y);
      }
    }
  }

  if(window.name == ""){// never visited our site from this window before
    window.name = "backHandler_" + (new Date().getTime());
  }

  var COOKIE_LENGTH = COOKIE_BASE + window.name;
  var COOKIE_HREF = COOKIE_BASE + window.name + "_href";
  var cookieValue = getCookie(COOKIE_LENGTH);

  if(cookieValue){
    try{
      var storedLength = parseInt(cookieValue);
      var currentLength = window.history.length;

      var previousHref = getCookie(COOKIE_HREF);
      if( currentLength <= storedLength &&        // actual back action
          previousHref != window.location.href ){ // avoiding refresh
        //back navigation detected
        setCookie(COOKIE_LENGTH, "");
        setCookie(COOKIE_HREF, "");

        isBackPressed = true;

        if(typeof handler == "function"){
          handler(previousHref);
        }
        return {
          isBackPressed: function() {
            return isBackPressed;
          }
        };
      }

      //update values
      setCookie(COOKIE_LENGTH, window.history.length);
      setCookie(COOKIE_HREF, window.location.href);

    }catch(err){
      if(typeof console == "object"){//IE protection, laaame!
        console.error(err);
      }
    }
  }else{//no cookie value for this window yet, so set one
    setCookie(COOKIE_LENGTH, window.history.length);
    setCookie(COOKIE_HREF, window.location.href);
  }

  return {
    isBackPressed: function() {
      return isBackPressed;
    }
  };
}

/* Uncomment here to register a handler for back button pressed */
// var handler = handleBackAction({
//   handler: function(previousHref) {
//     //TODO do your handling here
//   }
// });


/* If only know if back button is pressed then uncomment following line: */
// var handler = handleBackAction();

// handler.isBackPressed();//returns boolean, you can call it anywhere in your other javascripts