
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
    //console.log("Top level read cookie: " + userInfo);
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

function makePhoneCall(agent, customer) {

  if (agent.length == 10) {
  	agent = "+91" + agent;
  }
  if (customer.length == 10) {
  	customer = "+91" + customer;
  }

  jQuery.ajax({
      method: "GET",
      //url: 'https://54.251.123.50/gsearch/fakecall/',
      url: 'http://www.knowlarity.com/vr/api/click2call/',
      dataType: 'json',
      //data: {customer: customer, agent: agent},
      data: {api_key: KNOWLARITY_API_KEY, 
             sr_number: KNOWLARITY_NUMBER, 
             response_format: 'json',
      	     agent_number: agent,
      	     phone_number: customer
      },
      success: function(response) {
      	  console.log(JSON.stringify(response));
      	  var msg = "Call placed successfully via your number: " + agent;
      	  alert(msg);
      },
      error: function(response) {
      	  console.log(JSON.stringify(response));
      	  //alert(JSON.stringify(response));
      	  var errMsg = "Could not place the call. Please ensure that you have unblocked mixed content in your browser " +
      	               "and your knowlarity account is fine. Error message from API: \n" + response.statusText;
      }
  });
}

jQuery(document).ready(function() {
    //Extract the logged-in agent's phone number and save to a cookie.
    //This number will be used for making calls to customers later.
    if (jQuery('#LoggedOptions').length) {
       //Adding a button to all phone fields to enable Click2Call functionality
       var phoneFields = jQuery('.can-make-calls');
       phoneFields.each(function(i, f) {
       	  jQuery(f).addClass('btn');
       	  if (f.innerHTML.indexOf('ficon-phone') < 0) {
       	     f.innerHTML = '<i class="ficon-phone"></i> '+f.innerHTML;
       	  }
       });
       
       jQuery(document).on('click','.can-make-calls',function(){
       	  var self = this;
       	  var numberToCall = null;
       	  if (jQuery('#knowlarity_call_details').length) {
       	     //CALL button is within the ticket detail view.
       	     numberToCall = jQuery(self).text().strip();
       	  } else if (jQuery('#contactHeaderSticky')) {
       	     //CALL button is within customer/contact detail view.
       	     numberToCall = jQuery(self).attr('data-phone-number')
       	  }
         
          extractAgentPhoneNumber(function(agentNumber) {
              if ((typeof agentNumber === 'undefined') || (agentNumber == null)) {
                  console.log("Agent's phone number is not defined.");
                  return;
              }
              makePhoneCall(agentNumber, numberToCall);
              //alert(numberToCall + " will be called with agent number: " + agentNumber);
          });
       }); //onclick()
       
    }//LoggedOptions?
});
