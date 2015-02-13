
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

var userCookieName = 'userInfo_for_knowlarity';
function extractAgentPhoneNumber(callback) {
    var userInfo = readCookie(userCookieName);
    console.log("Top level read cookie: " + userInfo);
    if (userInfo) {
       var user = JSON.parse(userInfo);
       if (user.phone) return callback(user.phone);
       if (user.mobile) return callback(user.mobile);
       return callback(undefined);
    }
    //
    // Obtain agent user_id
    url = jQuery('div.#LoggedOptions > a')[0].href;
    var re = /(\d+)/;
    user_id = re.exec(url)[0];
    user_id = parseInt(user_id);
    console.log("User ID: " + user_id);
    
    //Search for this user_id in the agents database.
    //If found, extract the phone number
    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: "/agents.json",
        success: function(response) {
          response.forEach(function(rec) {
            console.log(rec);
            if (rec.agent.user_id == user_id) {
              var data = {id: rec.agent.id, phone: rec.agent.user.phone, mobile: rec.agent.user.mobile};
              createCookie(userCookieName, JSON.stringify(data));
              if (user.phone) return callback(user.phone);
              if (user.mobile) return callback(user.mobile);
              return callback(undefined);
            }
          });
        } //success
    });
} //extractAgentPhoneNumber()

jQuery(document).ready(function() {
    //Extract the logged-in agent's phone number and save to a cookie.
    //This number will be used for making calls to customers later.
    if (jQuery('#LoggedOptions').length) {
       jQuery('.knowlarity_call_btn').each(function(i) {
          jQuery(this).addClass('btn');
       });
       jQuery(document).on('click','.knowlarity_call_btn',function(){
       	  var self = this;
       	  var numberToCall = null;
       	  if (jQuery('#knowlarity_call_details').length) {
       	     //CALL button is within the ticket detail view.
       	     numberToCall = jQuery(self).text().strip();
       	  } else if (jQuery('#contactHeaderSticky')) {
       	     //CALL button is within customer/contact detail view.
       	     numberToCall = jQuery('#userid').val();
       	  }
         
          extractAgentPhoneNumber(function(agentNumber) {
              if ((typeof agentNumber === 'undefined') || (agentNumber == null)) {
                  console.log("Agent's phone number is not defined.");
                  return;
              }
              alert(numberToCall + " will be called with agent number: " + agentNumber);
          });
       }); //onclick()
       
       if (jQuery('#contactHeaderSticky').length) {
       	  var btnGroup = jQuery('#contactHeaderSticky  .btn-group');
       	  var phoneFields = jQuery('.can-make-calls');
          phoneFields.each(function(i, f) {
              var label = jQuery(f).prev('.field-label')[0].textContent;
              var btnHTML = '<a href="#" class="btn knowlarity_call_btn"><i class="ficon-phone"></i>' + 
                            label + '</a>';
              jQuery(btnGroup).prepend(jQuery(btnHTML));
          });
       }
    }//LoggedOptions?
});

