console.log("Background is running");

// receives the correct search terms from the amazon video dDOM
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // Sends the search terms/ formatted google search url and receives the correct google search DOM
        fetch(request)
    		.then(function(response) {
    		return response.text()
    		})
    	    .then(function(html) {
			    var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
            
                // Finds and sets the first search term URL to rtLink
			    var rtLink = doc.getElementsByClassName("iUh30")[0].innerText;

                // if the google search returns a url that does not contain the term 'rotten' , this will prevent the following
                // loop from executing and will return a stirng of "page not found" to the caller
                var checkIfCorrectUrl = true;
                if(!rtLink.includes("rotten")) {
                    console.log("Rotten tomatoes url not found");
                    checkIfCorrectUrl = false;
                    sendResponse("* ---- Page not found ---- *");
                }

            // if the google search returns the rottentomatoes url, this loop will execute and program flow will continue
            if(checkIfCorrectUrl == true)
            {
                var res = rtLink.split("www.");
                url2 = 'https://' + res[1];

                // sends the rotten tomatoes url to the fetch api and recieves the movie/tv-show RT url DOM
                fetch(url2)
                    .then(function(response) {
                    return response.text()
                    })
                    
                    // 
                    .then(function(html) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(html, "text/html");
                    
                    // 
                    var userPercentage;

                    // -----------------------------------------------------------------------------------------
                    // Searches for the correct user ratings percentage, multiple elements with the same name 
                    // exist and must therefore be all checked for validity
                    // -----------------------------------------------------------------------------------------
                    var onlyOneElementExists = false;
                    var noElementsExist = false;

                    if(doc.getElementsByClassName("mop-ratings-wrap__percentage")[1] === undefined) { 
                        console.log("Only one element may or may not exist"); 
                        onlyOneElementExists = true;
                    }

                    if(doc.getElementsByClassName("mop-ratings-wrap__percentage")[0] === undefined) { 
                        console.log("No elements exist! Wrong URL"); 
                        noElementsExist = true;
                    }

                    if(noElementsExist)
                    {
                        userPercentage = "No score found";
                    }
                    else if (onlyOneElementExists)
                    {
                        userPercentage = doc.getElementsByClassName("mop-ratings-wrap__percentage")[0].innerHTML;
                    }
                    else // More than one element exists
                    {
                        userPercentage = doc.getElementsByClassName("mop-ratings-wrap__percentage")[1].innerHTML;
                    }
                    // -----------------------------------------------------------------------------------------



                    // -----------------------------------------------------------------------------------------
                    // Searches for the correct 'total number of user ratings' element, multiple elements with 
                    // the same name exist and must therefore all be checked for validity
                    // -----------------------------------------------------------------------------------------
                    var numUserRatings = "N/A ";
                    var numUserRatings2 = "";

                    var noScoreAtIndex2 = false;
                    var noScoreAtIndex3 = false;

                    var noUserScore1 = true;
                    var noUserScore2 = true;

                    if (doc.getElementsByClassName("mop-ratings-wrap__text--small")[2] === undefined)  {
                        console.log("No user scores exist at element 3");
                        noScoreAtIndex2 = true;
                        }

                    if (doc.getElementsByClassName("mop-ratings-wrap__text--small")[3] === undefined)  {
                        console.log("No user scores exist at element 4");
                        noScoreAtIndex3 = true;
                    }
                    
                    if(!noScoreAtIndex2)
                    {
                        numUserRatings = doc.getElementsByClassName("mop-ratings-wrap__text--small")[2].innerHTML;
                    }
                
                    if(!noScoreAtIndex3)
                    {
                        numUserRatings2 = doc.getElementsByClassName("mop-ratings-wrap__text--small")[3].innerHTML;
                    }

                    if(numUserRatings.includes("User"))
                    {
                        numUserRatings = doc.getElementsByClassName("mop-ratings-wrap__text--small")[2].innerHTML;
                        noUserScore1 = false;
                    }

                    if(numUserRatings2.includes("User"))
                    {
                        numUserRatings = doc.getElementsByClassName("mop-ratings-wrap__text--small")[3].innerHTML;
                        noUserScore2 = false;
                    }
                    
                    // If there is not enough user scores, or for whatever reason the scores are not shown, this will execute
                    if (noUserScore1 && noUserScore2)
                    {
                        numUserRatings = "User Ratings: N/A"
                    }
                    // -----------------------------------------------------------------------------------------

                    var userPercentageAndNumberOfUserScores;

                    // Stores a string containing the aggregated value of the user percentages, and the number of user scores
                    userPercentageAndNumberOfUserScores = userPercentage + '  ' + '━' + '  ' + numUserRatings + '     ';

                    // Sends the response back to the caller with the embedded url 
                    sendResponse(userPercentageAndNumberOfUserScores.link(url2));
                    })
                }
            })
            .catch(function(err) {  
            console.log('Failed to fetch page: ', err);  
                });
    return true;
    }
    
);

