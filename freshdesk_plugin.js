
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
//
// Use jNotify if available, else use simple JS msgbox
//
function notify(ctx) {
   if (typeof jNotify == 'undefined' || !jQuery.isFunction(jNotify)) {
   	alert(ctx.msg);
   	return;
   }
   jNotify(
	ctx.msg,
	{
		  autoHide : true, // added in v2.0
		  clickOverlay : false, // added in v2.0
		  MinWidth : 250,
		  TimeShown : 5000,
		  ShowTimeEffect : 200,
		  HideTimeEffect : 200,
		  LongTrip :20,
		  HorizontalPosition : 'right',
		  VerticalPosition : 'top',
		  ShowOverlay : true,
   		  ColorOverlay : '#000',
		  OpacityOverlay : 0.3,
		  onClosed : function(){ // added in v2.0
		   
		  },
		  onCompleted : function(){ // added in v2.0
		   
		  }
	}); // close jNotify   
}//notify()

var userCookieName = 'knowlarity_fd_user_info';
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

  if (agent) {
  	agent = "+91" + agent.substr(agent.length - 10);
  }
  if (customer) {
  	customer = "+91" + customer.substr(customer.length - 10);
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
      	  notify({msg: JSON.stringify(response)});
      },
      error: function(response) {
      	  console.log(JSON.stringify(response));
      	  notify({msg: JSON.stringify(response)});
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
   
       {
	       var url = "ws://54.251.123.50:11111/mybroker";
	       var client = Stomp.client(url);
	       var already_connected = "FALSE";

            // automatically called when there is an error connecting to STOMP
            var error_callback = function(error) {
                // log the error's message header:
                console.log("stomp: " + error.headers.message);

                // the client is disconnected,
                // set the already_connected boolean variable to FALSE
                already_connected = "FALSE";
            };

            // automatically called when the STOMP connection is successful
            var connect_callback = function() {
                // the client is connected,
                // set the already_connected boolean variable to TRUE
                already_connected = "TRUE";

                // subscribe to the "bridge" topic only after connection
                // and authentication is successful
                var subscription = client.subscribe("/topic/bridge", onmessage);
                console.log("stomp: subscribed to /topic/bridge");
            };

            // called every time there is a new published message
            // (i.e. "bridge" incoming phone call)
            onmessage = function(message) {
                data = JSON.parse(message.body);
                console.log("stomp: " + data);
                extractAgentPhoneNumber(function(agentNumber) {
                  if ((typeof agentNumber === 'undefined') || (agentNumber == null)) {
                     console.log("stomp: Agent's phone number is not defined.");
                     return;
                  }
                  
                  console.log("stomp: " + "Called: " + data.called + "\nAgent: " + agentNumber);
                  
                  if (data.called && (agentNumber.indexOf(data.called) >= 0)) {
                    var contactInfo = null;
                    if (data.contact) {
                      console.log(data.contact);
                      data.contact = JSON.parse(data.contact);
                      //if (data.contact.id && data.contact.name) {
                        console.log("contact ID: " + data.contact.id);
                      contactInfo = "\t<a href=/contacts/" + data.contact.id + "><b>" + data.contact.name + "</b></a><br/>";
                      //}
                    }
                    if (contactInfo === null) {
                      contactInfo = "\t" + data.called + "\n";
                    }
                  	var msg = "Incoming call from: " + contactInfo +
                  	          "Display number: " + data.disp_number;
                  	notify({msg: msg});
                  }
                });
            };//onmessage()

            // only issue a connect command if
            // the Web Socket is not already connected
            if (already_connected == "FALSE") {
                //alert("trying to connect");
                console.log("stomp: trying to connect to STOMP server");
                // connect to the Apollo ActiveMQ STOMP message broker
                client.connect("vtigercrm", "vtiger6", connect_callback, error_callback);
            }
       }
        /// *** END OF STOMP POPUP MESSAGE HANDLING *** ///
    }//LoggedOptions?
   
});
