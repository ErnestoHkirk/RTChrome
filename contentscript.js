//Checks for the existence of the pop-up
function checkExists()
{
	// Searches the DOM for the correct element
	var popUpExists = document.getElementById('av-hover');

	// If the RT element has already been created and added, this check will fail / result in false
	if(document.getElementsByClassName("Rotten-Tomatoes")[0] == null)
	{
		var RTClassDoesNotExist = true;
	}

	if(popUpExists && RTClassDoesNotExist) 
	{
		// locates the correct element from the amazon pop-up
		var amazonParentClass = document.getElementsByClassName('av-ratings-badges');

		// Returns the amazon parent class from the pop-up
		var AZparentClass = amazonParentClass[0];

		// Checks if the pop-up has completely loaded in, if not, returns out of loop
		if(!AZparentClass)
		{
			return;
		}

		// Returns the value of the last child element in the Amazon parent span
		var AZfinalChild = AZparentClass.lastChild;
		
		// Creates the RT span
		var RTspan = document.createElement('span');
		RTspan.className = "Rotten-Tomatoes";

		// inserts the new rotten tomatoes class before the last child element in the amazon parent class
		AZparentClass.insertBefore(RTspan,AZfinalChild);

		// Creates a loading image
		var loading = document.createElement("img");
		loading.src = chrome.extension.getURL("images/loading.gif");
		document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(loading); 
		
		// Grabs the year the media was made
		var titleYear = document.getElementsByClassName('av-badges')[0].firstChild.innerText;

		// Checks for correct element
		if (titleYear.length > 4)
		{
			titleYear = document.getElementsByClassName('av-badges')[0].children[1].innerText;
		}

		// Grabs the title of the movie / tvshow from the amazon video DOM
		var titleOfMedia = document.getElementsByClassName("av-hover-content av-narrow")[0].firstChild.firstChild.innerText;
		
		var formattedTitle = titleOfMedia.split(' ').join('%20');

		url = 'https://google.com/search?q=rotten%20tomatoes%20' + formattedTitle + '%20(' + titleYear + ')';

		chrome.runtime.sendMessage(
			url,
			function (response) {

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
//Refreshes the page every quarter second to check for the existence of the popup
setInterval(checkExists, 250);