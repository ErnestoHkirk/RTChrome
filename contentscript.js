console.log("Hello, world!");

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

		// Creates a new image, and appends it to the RTspan
		var popcornImage = new Image();
		popcornImage.src = "https://i.ibb.co/KyBKKB5/r-t-audiencev2.jpg";
		document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(popcornImage); 

		//First i need to get the name of the item
		// var x = document.getElementsByClassName("av-hover-content av-narrow")[0].firstChild.innerHTML;
		// var z = x.indexOf('>');
		// var titleOfMedia = "";
		// z += 1;

		// while (x.charAt(z) != '<')
		// {
		// 	if(x.charAt(z) == ' ')
		// 	{
		// 	titleOfMedia = titleOfMedia + '_';
		// 	}
		// 	else if((x.charAt(z) == ',') || (x.charAt(z) == '!') || (x.charAt(z) == ':') || (x.charAt(z) == "'" ))
		// 	{}
		// 	else
		// 	{
		// 	titleOfMedia = titleOfMedia + x.charAt(z);
		// 	}
		// 	++z;
		// }

		// console.log(titleOfMedia);
		// console.log(z);
		// console.log(x);

		// const url = 'https://rottentomatoes.com/m/' + titleOfMedia;

		const proxyurl = "https://cors-anywhere.herokuapp.com/";

		// console.log(proxyurl + url);

		var titleOfMedia = document.getElementsByClassName("av-hover-content av-narrow")[0].firstChild.firstChild.innerText;
		
		var formattedTitle = titleOfMedia.split(' ').join('%20');

		console.log(formattedTitle);

		url = proxyurl + 'https://google.com/search?q=rotten%20tomatoes%20' + formattedTitle + '%20rating';

		console.log(url);

		fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
    		.then(function(response) {
    		return response.text()
    		})
    	.then(function(html) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(html, "text/html");
			var rtLink = doc.getElementsByClassName("iUh30")[0].innerText;

			console.log(rtLink);

			var res = rtLink.split("www.");
			console.log(res[1]);

			url2 = proxyurl + 'https://' + res[1];
		
			console.log(url2);

			fetch(url2)
				.then(function(response) {
				return response.text()
				})
			.then(function(html) {
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, "text/html");
				var docArticle;

				if(doc.getElementsByClassName("mop-ratings-wrap__prerelease-text")[0])
				{
					if(doc.getElementsByClassName("mop-ratings-wrap__percentage")[0].innerHTML)
					{
					docArticle = doc.getElementsByClassName("mop-ratings-wrap__percentage")[0].innerHTML;
					}
					else
					{
					docArticle = "DNE";
					}
				}
				else
				{
					docArticle = doc.getElementsByClassName("mop-ratings-wrap__percentage")[1].innerHTML;
				}
				console.log(docArticle);	
				
				// Creates a new span, ...
				var ratingSpan = document.createElement("span");
				var textnode = document.createElement("p");
				textnode.innerHTML = docArticle;
				ratingSpan.appendChild(textnode);

				// 
				RTspan.style.display = "flex";

				// 
				ratingSpan.setAttribute("style","padding-top:8px; padding-left:4px;");

				//... and appends it to the RTspan
				document.getElementsByClassName("Rotten-Tomatoes")[0].appendChild(ratingSpan); 
			})
			

			})
			.catch(function(err) {  
			console.log('Failed to fetch page: ', err);  
		});
	}
}
//Refreshes the page every quarter second to check for the existence of the popup
setInterval(checkExists, 250);

