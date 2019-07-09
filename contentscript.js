console.log("Hello, world!");

//Checks for the existence of the pop-up
function checkExists()
{
	// Searches the DOM for the correct element
	var popUpExists = document.getElementById('av-hover');

	// If the RT element has already been created and added, this check will fail/ result in false
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

		// Creates a new image, and appends it to the RTspan
		var popcornImage = new Image();
		popcornImage.src = "https://i.ibb.co/KyBKKB5/r-t-audiencev2.jpg";
		document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(popcornImage); 


		// Creates a new span, ...
		var ratingSpan = document.createElement("span");
		var textnode = document.createTextNode(" 9.5");
		ratingSpan.appendChild(textnode);

		// 
		RTspan.style.display = "flex";

		// 
		ratingSpan.setAttribute("style","padding-top:8px; padding-left:4px;");

		//... and appends it to the RTspan
		document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(ratingSpan); 
	
	}
}
//Refreshes the page every quarter second to check for the existence of the popup
setInterval(checkExists, 250);

