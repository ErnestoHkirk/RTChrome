var rtClassName = 'Rotten-Tomatoes';
var slider = '_21C_Q5';

// Mouse listener for any move event on the current document.
document.addEventListener('mousemove', function (e) {
let srcElement = e.srcElement;

	// ------------------------------SLIDER CHECK----------------------------------------
	// checking for slider element first by checking if grandparent element exists
	// ------------------------------SLIDER CHECK----------------------------------------
	if (typeof srcElement.parentElement.parentElement !== 'undefined' && srcElement.parentElement.parentElement) {
		// -- If grandparent exists, deal with value
		// -- (needs new NULL check, this one leads to annoying and harmless console errors)

		var grandparentNameOfClass = srcElement.parentElement.parentElement.className;
		var grandparent = srcElement.parentElement.parentElement;
		
		if(grandparentNameOfClass == slider ){
			//console.log('Slider element found.');

			if(document.getElementById('av-hover')){
				//console.log('Break, slider but just image, (non-signed in slider)');
			}

			else{
				//console.log('Continue, slider found without av-hover event');
				srcElement = srcElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
				// console.log(srcElement);

				if(srcElement.children[0].lastElementChild.lastElementChild.lastElementChild.className == rtClassName)
				{
					//console.log("Break, slider found, but RT elem already exists");
				}
				else{
					//console.log('continue, slider found without existing RT elem attached')

					var amazonParentClass = srcElement.children[0].lastElementChild.lastElementChild;
					// console.log('Amazon Parent Class located ');

					var AZparentClass = amazonParentClass;

					// Checks if the pop-up has completely loaded in, if not, returns out of loop
					if(!AZparentClass)
					{
						//console.log("q?");
						return;
					}
		
					// -- Returns the value of the last child element in the Amazon parent span
					var AZCurrentLastChild = AZparentClass.lastChild;
		
					// -- Creates the RT span
					var RTspan = document.createElement('span');
					RTspan.className = "Rotten-Tomatoes";
		
					// -- Inserts the new rotten tomatoes class before the last child element in the amazon parent class
					AZparentClass.insertBefore(RTspan,AZCurrentLastChild.nextSibling);
						
					// -- Creates a loading image
					var loading = document.createElement("img");
					loading.src = chrome.extension.getURL("images/loading.gif");
					AZparentClass.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(loading); 
		

					// Grabs the year the media was made
					var titleYear = AZparentClass.children[1].innerText;

					// Grabs the title of the movie / tv-show from the amazon video DOM
					var titleOfMedia = srcElement.firstElementChild.children[2].innerText;
					var array = titleOfMedia.split(/\r?\n/);
					var titleOfMedia = array[0];
					var formattedTitle = titleOfMedia.split(' ').join('%20');

					url = 'https://google.com/search?q=rotten%20tomatoes%20' + formattedTitle + '%20(' + titleYear + ')';

					// -- url used for testing
					// url = 'https://google.com/search?q=rotten%20tomatoes%20the%20incredible%20hulk%202008'
		
					chrome.runtime.sendMessage(
						url,
							function (response) {
								//console.log('correct info + hyperlinked returned');

								// Creates a new span, ...
								var ratingSpan = document.createElement("span");
								var textnode = document.createElement("p");
								textnode.innerHTML = response + ' ';
								ratingSpan.appendChild(textnode);
					
								// Creates a new image element, grabs url, and appends it to the RTspan
								var popcornImage = document.createElement("img");
								popcornImage.src = chrome.extension.getURL("images/popimage.png");
					
								AZparentClass.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(popcornImage); 
					
								// Styling for the entire RTspan class
								RTspan.style.display = "flex";
					
								// Styling for the ratingSpan class
								ratingSpan.setAttribute("style","padding-top:8px; padding-left:4px;");
					
								// removes the loading image from the new RT class span
								RTspan.removeChild(loading);
					
								//... and appends it to the RTspan
								AZparentClass.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(ratingSpan);
							}
						);
					} 
			}
		}
	}
	// ------------------------------AV-HOVER CHECK----------------------------------------
	// Checking for hover event - ('av-hover')
	// (used in slider main page when not signed in, and on 'customers who watched this, 
	// also watched' / 'recommended' both for signed in and when not signed in)
	// ------------------------------AV-HOVER CHECK----------------------------------------
	if(document.getElementById('av-hover')){
		//console.log('av-hover found');

		// -- Searches the DOM for the correct element
		var popUpExists = document.getElementById('av-hover');

		// -- If the RT element has already been created and added, this check will fail / result in false
		if(document.getElementsByClassName("Rotten-Tomatoes")[0] == null)
		{
			//console.log('av-hover found, and RT elem does not exist');
			var RTClassDoesNotExist = true;
		}

		// -- If the RT elem does not exist, and the av-hover is completely loaded in, continue
		if(popUpExists && RTClassDoesNotExist) 
		{
			//console.log('rt elem does not exist, and av-hover exists, continue');

			// locates the correct parent element from the av-hover
			var amazonParentClass = document.getElementsByClassName('av-ratings-badges');

			// Returns the amazon parent class from the pop-up
			var AZparentClass = amazonParentClass[0];

			// Checks if the pop-up has completely loaded in, if not, returns out of loop
			if(!AZparentClass)
			{
				//console.log('amazon parent class not yet loaded in');
				return;
			}

			// Returns the value of the last child element in the Amazon parent span
			var AZfinalChild = AZparentClass.lastChild;
			
			// Creates the RT span
			var RTspan = document.createElement('span');
			RTspan.className = "Rotten-Tomatoes";

			// inserts the new rotten tomatoes class before the last child element in the amazon parent class
			AZparentClass.insertBefore(RTspan,AZfinalChild.nextSibling);

			// Creates a loading image
			var loading = document.createElement("img");
			loading.src = chrome.extension.getURL("images/loading.gif");
			document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(loading); 
			
			// Grabs the year the media was made
			var titleYear = document.getElementsByClassName('av-badges')[0].firstChild.innerText;

			// Checks for correct element
			if (titleYear.length > 4)
			{
				// -- legacy code, perhaps redundant? 
				titleYear = document.getElementsByClassName('av-badges')[0].children[1].innerText;
			}

			// Grabs the title of the movie / tvshow from the amazon video DOM
			var titleOfMedia = document.getElementsByClassName("av-hover-content av-narrow")[0].firstChild.firstChild.innerText;
			
			var formattedTitle = titleOfMedia.split(' ').join('%20');

			url = 'https://google.com/search?q=rotten%20tomatoes%20' + formattedTitle + '%20(' + titleYear + ')';

			chrome.runtime.sendMessage(
				url,
				function (response) {
					//console.log(response);

					// Creates a new span, ...
					var ratingSpan = document.createElement("span");
					var textnode = document.createElement("p");
					textnode.innerHTML = response + ' ';
					ratingSpan.appendChild(textnode);

					// Creates a new image element, grabs url, and appends it to the RTspan
					var popcornImage = document.createElement("img");
					popcornImage.src = chrome.extension.getURL("images/popimage.png");

					document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(popcornImage); 

					// Styling for the entire RTspan class
					RTspan.style.display = "flex";

					// Styling for the ratingSpan class
					ratingSpan.setAttribute("style","padding-top:8px; padding-left:4px;");

					// removes the loading image from the new RT class span
					RTspan.removeChild(loading);

					//... and appends it to the RTspan
					document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(ratingSpan); 
				}
			);
		}
	}
	// ------------------------------SINGLE PAGE OF MEDIA CHECK----------------------------------------
	// checks for the existence of a single page of media, indepedent from the other two checks,
	// 'rotten tomatoess' extra [s] in div, because recommended live on the same page (bottom)
	// ------------------------------SINGLE PAGE OF MEDIA CHECK----------------------------------------
	if(document.getElementsByClassName('av-detail-section')[0]){
		//console.log('Single page found.');
		if(document.getElementById('av-hover')){
			//console.log('Break, single page found, but av-hover.');
		}
		else{
			var popUpExists = document.getElementsByClassName('av-detail-section')[0];

			if(document.getElementsByClassName("Rotten-Tomatoess")[0] == null)
			{
				var RTClassDoesNotExist = true;
			}

			if(popUpExists && RTClassDoesNotExist) 
			{
				// locates the correct element from the amazon pop-up
				var amazonParentClass = document.getElementsByClassName('_3QwtCH _16AW_S _2LF_6p dv-node-dp-badges uAeEjV');
				//console.log(document.getElementsByClassName('av-ratings-badges')[0]);

				// Returns the amazon parent class from the pop-up
				var AZparentClass = amazonParentClass[0];

				// Checks if the pop-up has completely loaded in, if not, returns out of loop
				if(!AZparentClass)
				{
					return;
				}

				// Returns the value of the last child element in the Amazon parent span
				var AZfinalChild = AZparentClass.lastChild;
				//console.log(AZfinalChild);

				// Creates the RT span
				var RTspan = document.createElement('span');
				RTspan.className = "Rotten-Tomatoess";

				// inserts the new rotten tomatoes class before the last child element in the amazon parent class
				AZparentClass.insertBefore(RTspan,AZfinalChild.nextSibling);

				// Creates a loading image
				var loading = document.createElement("img");
				loading.src = chrome.extension.getURL("images/loading.gif");
				document.getElementsByClassName("Rotten-Tomatoess")[0].appendChild(loading); 
				
				// Grabs the year the media was made
				var titleYear = document.querySelector('[data-automation-id="release-year-badge"]').innerText;

				// Grabs the title of the movie / tvshow from the amazon video DOM
				var titleOfMedia = document.getElementsByClassName('_1GTSsh _2Q73m9')[0].innerText;
				var formattedTitle = titleOfMedia.split(' ').join('%20');

				url = 'https://google.com/search?q=rotten%20tomatoes%20' + formattedTitle + '%20(' + titleYear + ')';

				chrome.runtime.sendMessage(
					url,
					function (response) {

						//console.log(response);

						// Creates a new span, ...
						var ratingSpan = document.createElement("span");
						var textnode = document.createElement("p");
						textnode.innerHTML = response + ' ';
						ratingSpan.appendChild(textnode);

						// Creates a new image element, grabs url, and appends it to the RTspan
						var popcornImage = document.createElement("img");
						popcornImage.src = chrome.extension.getURL("images/popimage.png");

						document.getElementsByClassName("Rotten-Tomatoess")[0].appendChild(popcornImage); 

						// Styling for the entire RTspan class
						RTspan.style.display = "flex";

						// Styling for the ratingSpan class
						ratingSpan.setAttribute("style","padding-top:8px; padding-left:4px;");

						// removes the loading image from the new RT class span
						RTspan.removeChild(loading);

						//... and appends it to the RTspan
						document.getElementsByClassName("Rotten-Tomatoess")[0].appendChild(ratingSpan); 
						}
					);
				}
			}
		}
}, false);

