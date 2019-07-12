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
                
                sendResponse(docArticle.link(url2));
			    })
			})
			.catch(function(err) {  
            console.log('Failed to fetch page: ', err);  
        });
    return true;
    }
);

