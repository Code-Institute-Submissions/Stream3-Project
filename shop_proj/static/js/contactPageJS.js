


/* Creating a module (through the use of function scope) called 'contact' to encapsulate the 
   associated functions and variables, thus eliminating the risk of variable/function pollution 
   in the global scope. In addition it has benefit of grouping all associated code for easier 
   maintainability.
*/

var contact = (function (){

	/* Module level variables to enable status of date
	   components to be tracked by all functions*/
	var isYearValid;
	var isMonthValid;
	var isDayValid;


	//Creating a new JS date object, then variables, that represent today
	function actualDate(){
		var d = new Date();
		var day = d.getDate();
		return {
			"day" : d.getDate(),
			//Month returns a value between 0-11 for month of year
			"month" : d.getMonth() + 1,			
			"year" : d.getFullYear(),			
		};
	}
	


	function receivedDate(){
		var receivedDate = document.getElementById('date').value;
		var receivedDateSplit = receivedDate.split("/");
		return {
			"day" : receivedDateSplit[0],
			"month" : receivedDateSplit[1],
			"year" : receivedDateSplit[2],
		};
	}



	function isYearInFuture(receivedYear, currentYear){
		if (receivedYear > currentYear){
			return true;
		}
	}


	function isYearSame(receivedYear, currentYear){
		if (receivedYear == currentYear){
			return true;
		}
	}


	//Validating year, 'same' value is required for subsequent processing/comparison
	function validateYear(receivedYear, currentYear){
		var yrRtnVal;

		//If in the future all good
		if (isYearInFuture(receivedYear, currentYear)){
			yrRtnVal = "valid";
		}
		//Need to flag same year as month & day validation required
		else if (isYearSame(receivedYear, currentYear)){
			yrRtnVal = "same";
		}
		else{
			yrRtnVal = "invalid";
			document.getElementById('formErrorMsg').innerHTML = "  Date in the past, please re-enter";
			document.getElementById('formSuccess').innerHTML = "";
		}
		return yrRtnVal;
	}


	function isMonthOverTwelve(receivedMonth){
		if (receivedMonth > 12){
			return true;
		}	
	}


	function isMonthInPast(receivedMonth, currentMonth){
		if (isYearValid == "same" && receivedMonth < currentMonth){
			return true;
		}
	}

	function isMonthSame(receivedMonth, currentMonth){
		if (isYearValid == "same" && receivedMonth == currentMonth){
			return true;
		}
	}

	//Validating month, 'same' value is required for subsequent processing/comparison
	//additional validation put in to prevent month value of over 12 being deemed valid
	function validateMonth(receivedMonth, currentMonth){
		var mthRtnVal;

		//HTML5 form validation can't cater for this, so if month over 12, reject 
		if (isMonthOverTwelve(receivedMonth)){
			mthRtnVal = "invalid";
			document.getElementById('formErrorMsg').innerHTML = "  Month value incorrect, please re-enter";
			document.getElementById('formSuccess').innerHTML = "";						
		}
		//If in the future all good
		else if (isMonthInPast(receivedMonth, currentMonth)){
			mthRtnVal = "invalid";
			document.getElementById('formErrorMsg').innerHTML = "  Date in the past, please re-enter";
			document.getElementById('formSuccess').innerHTML = "";			
		} 
		//Need to flag same year as month & day validation required
		else if (isMonthSame(receivedMonth, currentMonth)){
			mthRtnVal = "same";
		} 
		else{
			mthRtnVal = "valid";
		}
		return mthRtnVal;
	}


	function isDayOverThirtyOne(recivedDay){
		if (recivedDay > 31){
			return true;
		}	
	}


	function notEnoughNotice(recivedDay, currentDay){
		/* could just put an offset on the current day to increase required notice period */
		if (isMonthValid == "same"  && recivedDay == currentDay){
			/* returns true if NOT enough notice */
			return true;
		}	
	}


	function isDayInPast(receivedDay, currentDay){
		if (isMonthValid == "same" && receivedDay < currentDay){
			return true;
		}
	}


	//Validating day, checks that day is not from past and also has functionality to check that 
	//enough notice has been given.
	function validateDay(recivedDay, currentDay){
		var dayRtnVal;

		//HTML5 form validation can't cater for this, so if month over 12, reject 
		if (isDayOverThirtyOne(recivedDay)){
			dayRtnVal = "invalid";
			document.getElementById('formErrorMsg').innerHTML = "  Day value incorrect, please re-enter";
			document.getElementById('formSuccess').innerHTML = "";						
		}


		//If its a valid day, have they given enough notice (set to same day at mo)
		else if (notEnoughNotice(recivedDay, currentDay)){
				document.getElementById('formErrorMsg').innerHTML = "  I'll need at least a day, please re-enter";
				document.getElementById('formSuccess').innerHTML = "";
				dayRtnVal = "invalid";
			}

		//If in the future all good, else reject
		else if (isDayInPast(recivedDay, currentDay)){
			dayRtnVal = "invalid";
			document.getElementById('formErrorMsg').innerHTML = "  Date in the past, please re-enter";
			document.getElementById('formSuccess').innerHTML = "";			
		} 

		else{
			dayRtnVal = "valid";
		}
		return dayRtnVal;
	}

	//Grouping of all cosmetic form actions post successful sumbit	
	function successfulSubMsg(){
		//Form is OK
		document.getElementById('formSuccess').innerHTML = "   Successfully Submitted";
		document.getElementById('formErrorMsg').innerHTML = "";		
		//Clear form data
		document.getElementById('fname').value = "";
		document.getElementById('lname').value = "";
		document.getElementById('email').value = "";
		document.getElementById('date').value = "";
		document.getElementById('phone').value = "";
	}



	// Returning a function from this module/function called (well, assigned to the variable 
	// called) 'contact', this enables access to the validate form function outside of the scope of 
	// this module. Without passing it back, it could not be invoked. The same applies to initMap.
	return {
		validateForm: function(){
				//Nested to be more efficient, no point in executing subsequent function(s) if error detected
				isYearValid = validateYear(receivedDate().year, actualDate().year);
				//console.log("isYearValid: " +isYearValid);
				if (isYearValid == "same" || isYearValid == "valid"){
					isMonthValid = validateMonth(receivedDate().month, actualDate().month);
					//console.log("isMonthValid: " +isMonthValid);
					if (isMonthValid  == "same" || isMonthValid  == "valid"){
						isDayValid = validateDay(receivedDate().day, actualDate().day);
						//console.log("isDayValid: " +isDayValid);
						if (isDayValid == "valid"){
							//console.log("Form is fine");
							successfulSubMsg();
						}
					}	
				}
			},


		//For Google Maps
		initMap: function() {
 			var fleet = {lat: 51.2823838, lng: -0.84};
  			var map = new google.maps.Map(document.getElementById('map'), {
    			zoom: 10,
    			center: fleet 
    		});
  			var marker = new google.maps.Marker({
	    		position: fleet,
    			map: map
  			});
		},

		deadline: function (checkboxElem) {
			$("#date").toggleClass('hidden');
			$("#formErrorMsg").toggleClass('hidden');
			$("#deadline1").toggleClass('hidden');
			$("#deadline2").toggleClass('hidden');
    	}

	};

})();
