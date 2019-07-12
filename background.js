console.log("Background is running");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("background.js got a message")
        console.log(request);
        console.log(sender);

        fetch(request)
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

			// url2 = proxyurl + 'https://' + res[1];
			
			url2 = 'https://' + res[1];

			console.log(url2);

			fetch(url2)
				.then(function(response) {
				return response.text()
				})
			.then(function(html) {
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, "text/html");
				var docArticle;

                var onlyOneElementExists = false;

                if(doc.getElementsByClassName("mop-ratings-wrap__percentage")[1] === undefined) { 
                    console.log("Only one element exists"); 
                    onlyOneElementExists = true;
                }

                if(onlyOneElementExists)
                {
                    docArticle = doc.getElementsByClassName("mop-ratings-wrap__percentage")[0].innerHTML
                }
                else
                {
                    docArticle = doc.getElementsByClassName("mop-ratings-wrap__percentage")[1].innerHTML
                }
                
                //
                var numUserRatings;
                var numUserRatings2;

                numUserRatings = doc.getElementsByClassName("mop-ratings-wrap__text--small")[2].innerHTML
                numUserRatings2 = doc.getElementsByClassName("mop-ratings-wrap__text--small")[3].innerHTML

                if(numUserRatings.includes("User"))
                {
                    numUserRatings = doc.getElementsByClassName("mop-ratings-wrap__text--small")[2].innerHTML
                }

                if(numUserRatings2.includes("User"))
                {
                    numUserRatings = doc.getElementsByClassName("mop-ratings-wrap__text--small")[3].innerHTML
                }

                // numUserRatings = numUserRatings.replace(/\s+/g, '');

                docArticle = docArticle + '  ' + '━' + '  ' + numUserRatings;

                sendResponse(docArticle.link(url2));
			    })
			})
			.catch(function(err) {  
            console.log('Failed to fetch page: ', err);  
        });
    return true;
    }
);

