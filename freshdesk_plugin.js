
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

function loadfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
//
// Use jNotify if available, else use simple JS msgbox
//
function notify(ctx) {
   console.log("In notify: " + ctx.msg);
   loadfile("https://rawgit.com/alpixel/jNotify/master/jquery/jNotify.jquery.css", "css");
   loadfile("https://rawgit.com/alpixel/jNotify/master/jquery/jNotify.jquery.min.js", "js");
            console.log("jNotify script loaded. Status = " + textStatus);
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
   /*      }) //jNotify script loaded successfully...
         .fail(function(jqxhr, settings, exception) {
   	    console.log("Cant use jNotify.Msg = " + ctx.msg);
   	    alert(ctx.msg);
         });*/
}//notify()

var userCookieName = 'knowlarity_fd_user_info';
function extractAgentPhoneNumber(callback) {
    var userInfo = readCookie(userCookieName);
    if (userInfo) {
       var user = JSON.parse(userInfo);
       if (user) {
			if (user.phone) return callback(user.phone);
			if (user.mobile) return callback(user.mobile);
       		return callback(undefined);
       }
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
      url: 'http://www.knowlarity.com/vr/api/click2call/',
      dataType: 'json',
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
		var source = new EventSource('http://54.251.123.50:11111/update-stream/' + KNOWLARITY_NUMBER);
		source.addEventListener('message', function(e) {
			console.log(e);
			var data = JSON.parse(e.data);
        	console.log("stomp: " + data);
        	extractAgentPhoneNumber(function(agentNumber) {
                if ((typeof agentNumber === 'undefined') || (agentNumber == null)) {
                    console.log("stomp: Agent's phone number is not defined.");
                    return;
                }
                  
                  console.log("stomp: " + "Called: " + data.called + "\nAgent: " + agentNumber);
                  
                  if (data.called && (agentNumber.indexOf(data.called) >= 0)) {
                    var contactInfo = null;
                    console.log(data.contact);
                    if (typeof data.contact !== 'undefined') {
                    	data.contact = JSON.parse(data.contact);
                        console.log("contact ID: " + data.contact.id);
                      	contactInfo = "\t<a href=/contacts/" + data.contact.id + "><b>" + data.contact.name + "</b></a><br/>";
 
                    } else {
                      contactInfo = "\t" + data.called + "\n";
                    }
                  	var msg = "Incoming call from: " + contactInfo +
                  	          "Display number: " + data.disp_number;
                  	console.log(msg);
                  	notify({msg: msg});
                  }
                });
            });//onmessage()
       }
        /// *** END OF STOMP POPUP MESSAGE HANDLING *** ///
    }//LoggedOptions?
   
});
