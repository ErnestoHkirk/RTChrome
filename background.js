//console.log("Background.js is running");

// Receives the correct search terms from the amazon video DOM
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  // Sends the search terms/ formatted google search url and receives the correct google search DOM
  fetch(request)
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");

      // Current correct google search/rotten tomato url
      var rtLink = doc.getElementsByClassName("yuRUbf")[0].children[0].href;
      console.log(rtLink);

      // Finds and searches for a new dom element/rt URL to assign rtLink if google changed its search layout again
      // multiple depricated search terms left here, "dont throw out what you may need later"
      if (typeof rtLink === "undefined" && rtLink === null) {
        console.log(
          "google search -> rotten tomatoes element not found, attempting alternative option 1"
        );
        rtLink = doc.getElementsByClassName("r")[0].lastElementChild.href;
        if (typeof rtLink === "undefined" && rtLink === null) {
          console.log(
            "google search -> rotten tomatoes not found, attempting alternative option 2"
          );
          rtLink = doc.getElementsByClassName("r")[0].children[0].href;
          if (typeof rtLink === "undefined" && rtLink === null) {
            console.log("rt link element on google not found");
          }
        }
      }
      // if the google search returns a url that does not contain the term 'rotten' , this will prevent the following
      // loop from executing and will return a stirng of "page not found" to the caller
      var checkIfCorrectUrl = true;
      if (!rtLink.includes("rottentomatoes.com")) {
        console.log("Rotten tomatoes url not found");
        checkIfCorrectUrl = false;
        sendResponse("* ---- Page not found ---- *");
      }

      // if the google search returns the rottentomatoes url, this loop will execute and program flow will continue
      if (checkIfCorrectUrl == true) {
        var res = rtLink.split("www.");

        //console.log(res[1]);
        url2 = "https://" + res[1];
        //console.log(url2);

        // sends the rotten tomatoes url to the fetch api and recieves the movie/tv-show RT url DOM
        fetch(url2)
          .then(function (response) {
            return response.text();
          })
          .then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");

            var userPercentage = "Page Found";
            var numUserRatings = "N/A";

            //Checks for type of rotten tomato page, movie or tv-show
            if (url2[27] == "m") {
              //console.log("Movie found.");
              if (
                typeof (
                  doc.querySelector("score-board").children[3].innerText !==
                  "undefined"
                )
              ) {
                // Total number of User Ratings
                numUserRatings =
                  doc.querySelector("score-board").children[3].innerText;
              }
              //Formatting
              var x = doc.querySelector("score-board").outerHTML;
              var y = x.split(" ", 3);
              var z = y[2].split('"', 2);
              console.log(z[1]);
              xx = numUserRatings.split("+", 2);
              numUserRatings = xx[0] + "+ User " + xx[1];
              console.log(xx);
              userPercentage = z[1] + "%";

              //console.log(numUserRatings);
              //console.log(userPercentage);
            } else if (url2[27] == "t") {
              //console.log("TV-show found.");
              if (
                doc.getElementsByClassName(
                  "mop-ratings-wrap__half audience-score"
                )[0] !== undefined
              ) {
                var b = doc.getElementsByClassName(
                  "mop-ratings-wrap__half audience-score"
                )[0].firstElementChild.innerText;
                b = b.replace(/\s/g, "");
                console.log(b);
                if (b.search(/[%]/g) != -1) {
                  userPercentage = b;
                  numUserRatings = "Audience Score";
                }
              }
            }
            // Stores a string containing the aggregated value of the user percentages, and the number of user scores
            var userPercentageAndNumberOfUserScores =
              userPercentage + "  " + "━" + "  " + numUserRatings + "     ";

            // Sends the response back to the caller with the embedded url
            sendResponse(userPercentageAndNumberOfUserScores.link(url2));
          });
      }
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err);
    });
  return true;
});
