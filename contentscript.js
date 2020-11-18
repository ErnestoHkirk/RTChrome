var rtClassName = 'Rotten-Tomatoes';
var rtClassNameSP = 'Rotten-Tomatoes-SP';

// On page load listener, when page fully loaded, execute mouse listener
window.addEventListener('load', (event) => {

	// Mouse listener for any move event on the current document.
	document.addEventListener('mousemove', function (e) {
	let srcElement = e.srcElement;

// ================================ Function Definitions ===============================


// ------------------------------SLIDER CHECK----------------------------------------
function slider(cursorElement) {
	var sliderNoVideoOrJunk = '_1jZuBp';
	//var sliderNoVideoOrJunk = '_1ZbScs';

	var sliderWithVideo = 'tst-video-overlay-player-html5';
	
	var sliderFound = '_1yEE4p';
	//var sliderFound = '_2BTtIo';

	//console.log (cursorElement.className);
	//console.log (cursorElement.parentElement.parentElement.parentElement.parentElement.nextSibling)

	if (typeof(cursorElement) !== 'undefined'){
		if((cursorElement.className == sliderWithVideo) && 
		(cursorElement.parentElement.nextSibling.className)){
			if((cursorElement.parentElement.nextSibling.className == sliderFound) 
			&& cursorElement.parentElement.nextSibling.lastChild.className != rtClassName){
				return cursorElement.parentElement.nextSibling;
			}
		}
		else if((cursorElement.className == sliderNoVideoOrJunk) && 
		(cursorElement.parentElement.parentElement.parentElement.parentElement.nextSibling)){
			if((cursorElement.parentElement.parentElement.parentElement.parentElement.nextSibling.className == sliderFound)
			&& cursorElement.parentElement.parentElement.parentElement.parentElement.nextSibling.lastChild.className != rtClassName){
				return cursorElement.parentElement.parentElement.parentElement.parentElement.nextSibling;
			}
		}
		else{
			return false;
		}	
	}
	else{
		return false;
	}
}

// ------------------------------SLIDER ON SINGLE PAGE CHECK----------------------------------------
function sliderOnSinglePage(cursorElement){
	//console.log(cursorElement);
	var sliderOnPage = 'v7NF8z _19fgeo _1V7UYW';
	var sliderFound = '_1yEE4p';

	if (typeof(cursorElement) !== 'undefined'){
		if((cursorElement.className == sliderOnPage) && 
		(cursorElement.parentElement.parentElement.parentElement.parentElement.nextSibling)){
			if((cursorElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling.className == sliderFound)
			&& cursorElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling.lastChild.className != rtClassName){
				return cursorElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling;
			}
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

// ------------------------------SINGLE PAGE CHECK----------------------------------------
function singlePage(){
	if(document.getElementsByClassName("Rotten-Tomatoes-SP")[0] == null){
		if(document.getElementsByClassName('av-detail-section')[0]){
			return document.getElementsByClassName('_3QwtCH _16AW_S _2LF_6p dv-node-dp-badges uAeEjV')[0];
		}
		else
			return false;
	}
}

// --------------------APPEND ROTTEN TOMATOES SPAN/DIV - (LOADING) --------------------------
function appendRottenTomatoes(AZparentClass,nameOfSpan){

	//console.log(AZparentClass)
	//console.log(nameOfSpan)

	// -- Creates the RT span
	var RTspan = document.createElement('span');
	RTspan.className = nameOfSpan;
	AZLastChild = AZparentClass.lastChild;

	// -- Inserts the new rotten tomatoes class before the last child element in the amazon parent class
	AZparentClass.insertBefore(RTspan,AZLastChild.nextSibling);
						
	// -- Creates a loading image
	var loading = document.createElement("img");
	loading.src = chrome.extension.getURL("images/loading.gif");
	loading.className = "loading";

	// -- Appends loading.gif to the RTspan
	if(nameOfSpan == 'Rotten-Tomatoes'){
		AZparentClass.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(loading); 
	}
	else if(nameOfSpan == 'Rotten-Tomatoes-SP'){
		AZparentClass.getElementsByClassName("Rotten-Tomatoes-SP")[0].appendChild(loading); 
	}
	return RTspan;
}

// --------------- SEARCHES FOR CORRECT SEARCH TERMS FOR SLIDER ELEMENT ---------------------
function sliderGoogleUrl(sliderParentElement){
	// Grabs the year the media was made
	//console.log(sliderParentElement)
	//console.log(sliderParentElement.getElementsByClassName('_2yYtnp U7tX5g')[0])
	//console.log(sliderParentElement.getElementsByClassName('_28Acs_ tst-hover-title')[0].innerText);

	if(sliderParentElement.getElementsByClassName('_1qxpZ5 _2wV5Zf')[0]){
		var titleYear = sliderParentElement.getElementsByClassName('_1qxpZ5 _2wV5Zf')[0].innerText;
		if(titleYear.includes("min")){
			titleYear = sliderParentElement.getElementsByClassName('_1qxpZ5 _2wV5Zf')[1].innerText;
		}
	}
	//console.log(titleYear);
	// Grabs the title of the movie / tvshow from the amazon video DOM
	//var titleOfMedia = sliderParentElement.getElementsByClassName('_1l3nhs tst-hover-title')[0].innerText;
	var titleOfMedia = sliderParentElement.getElementsByClassName('_28Acs_ tst-hover-title')[0].innerText;
	//console.log(titleOfMedia)
	// Formats and appends data to create google search
	var formattedTitle = titleOfMedia.split(' ').join('%20');
	url = 'https://google.com/search?q=Rotten%20Tomatoes%20' + formattedTitle + '%20' + '(' + titleYear + ')' + '%20';
	//console.log(url)
	return url;
}

// --------------- SEARCHES FOR CORRECT SEARCH TERMS FOR SINGLE PAGE ---------------------
function singlePageGoogleUrl(){
	// Grabs the year the media was made
	var titleYear = document.querySelector('[data-automation-id="release-year-badge"]').innerText;

	// Grabs the title of the movie / tvshow from the amazon video DOM
	var titleOfMedia = document.getElementsByClassName('_1GTSsh _2Q73m9')[0].innerText;
	
	// Formats and appends data to create google search
	var formattedTitle = titleOfMedia.split(' ').join('%20');
	url = 'https://google.com/search?q=Rotten%20Tomatoes%20' + formattedTitle + '%20' + '(' + titleYear + ')' + '%20';
	return url;
}

// ----------- SENDS CORRECT GOOGLE SEARCH URL TO BACKGROUND.JS FOR FETCH ----------------
function search(url, RTspan, RTParentElem){
	chrome.runtime.sendMessage(
		url,
			function (response) {
				//console.log('correct info + hyperlinked returned');
				append(response, RTspan, RTParentElem);
			}
		);
}

// ------- APPENDS CORRECT ROTTEN TOMATO INFO TO RTSPAN AND REMOVES LOADING.GIF ----------
function append(RTinfo, RTspan, RTParentElem){
	// Creates a new span, ...
	var ratingSpan = document.createElement("span");
	var textnode = document.createElement("p");
	textnode.innerHTML = RTinfo + ' ';
	ratingSpan.appendChild(textnode);
	
	// Creates a new image element, grabs url, and appends it to the RTspan
	var popcornImage = document.createElement("img");
	popcornImage.src = chrome.extension.getURL("images/popimage.png");

	// Appends Popcorn image depending on if element is on single page / slider
	if(RTParentElem.getElementsByClassName("Rotten-Tomatoes")[0]){
		RTParentElem.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(popcornImage); 
	}
	else{
		RTParentElem.getElementsByClassName("Rotten-Tomatoes-SP")[0].appendChild(popcornImage); 
	}
	
	// Styling for the entire RTspan class
	RTspan.style.display = "flex";
	
	// Styling for the ratingSpan class
	ratingSpan.setAttribute("style","padding-top:8px; padding-left:4px;");

	// Finds loading image in RTspan
	loading = RTspan.getElementsByClassName("loading")[0];
	// .. and removes the loading image from the new RTspan
	RTspan.removeChild(loading);
	
	// Appends data to the RTspan
	if(RTParentElem.getElementsByClassName("Rotten-Tomatoes")[0]){
		RTParentElem.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(ratingSpan);
	}
	else{
		RTParentElem.getElementsByClassName("Rotten-Tomatoes-SP")[0].appendChild(ratingSpan);
	}
	
}
// ====================== End of Function Definitions / Program Start =========================

		//console.log (srcElement)

		var x = slider(srcElement);             			     // Searches for slider element
		var y = sliderOnSinglePage(srcElement);   				 // Searches for slider on single page
		var z = singlePage();                     				 // Searches for single page 

		if(x){        
			//console.log("true1!");                         
			var RTspan = appendRottenTomatoes(x,rtClassName);    // Appends to slider element
			url = sliderGoogleUrl(x);
			search(url, RTspan, x);
		}
		else if(y){      
			//console.log("true2!");                          
			var RTspan = appendRottenTomatoes(y,rtClassName);    // Appends to slider on single page
			url = sliderGoogleUrl(y);
			search(url, RTspan, y);
		}
		else if(z){      
			//console.log("true3!");                       
			var RTspan = appendRottenTomatoes(z,rtClassNameSP);  // Appends to single page 
			url = singlePageGoogleUrl();
			search(url, RTspan, z);
		}

	}, false);
});