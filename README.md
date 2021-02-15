![done](https://user-images.githubusercontent.com/37064367/67810093-2a487080-fa57-11e9-87ec-7ce0832c501a.png)

# Amazon Prime Video - Rotten Tomatoes Overlay
Overlays Amazon Prime Video™ with Rotten Tomatoes™ movie and TV ratings.

This extension's chrome store webpage can be found [here](https://chrome.google.com/webstore/detail/amazon-prime-video-rotten/hfemgdpfoemphmhakjpcbepaggjmhjci).

This chrome extension provides scores from Rotten Tomatoes™ to the media included within the Amazon Prime Video™ service.

Simply hover your mouse over a movie or TV show on the Amazon Prime Video™ website to use this extension. 
If you find any issues using this extension, feel free to leave a message in the 'support' section.

![imgFound](https://user-images.githubusercontent.com/37064367/67810619-2406c400-fa58-11e9-93d0-720b3f13600f.jpg)

## How It Works
At a high level, this extension uses the title of the movie/tv-show viewed by the user on prime video as input, sends that data to google s.e and takes the url of the first rotten-tomato web result found, and then searches rotten tomatoes for the correct audience rating/total scores, and then displays that back to the user. This all takes place client side; this extension does not collect user data. It is also completely free. Due to all the moving parts/dependence on external websites, this extension breaks frequently. If google, amazon prime, or rotten tomatoes has a page update, this extension will mostly likely need to, and be updated within 1-3 weeks.

__Link to Chrome Store__
* https://chrome.google.com/webstore/detail/amazon-prime-video-rotten/hfemgdpfoemphmhakjpcbepaggjmhjci

## Change Log
###### v1.58 ######
- Fix multiple fatal errors caused by rotten tomato and amazom prime video site updates
###### v1.53 ######
- Fix fatal error caused by google search engine update
###### v1.52 ######
- Added domain support for known smile.amazon URL extensions
###### v1.51 ######
- Fix fatal error where extension attempts to access incorrect element of Prime Video element on sliders causing sliders not displaying ratings.
###### v1.5 ######
- Added support for checking sliders below single page of media. Refactored majority of extension for readability,
efficiency, and ease of use.
###### v1.43 ######
- Fix fatal error where extension attempts to access incorrect element of alphabet inc search resulting in 'page not found' error
###### v1.42 ######
- Domain support added for users in the United Kingdom (www.amazon.co.uk/gp/video/)
###### v1.41 ######
- Update element names with new names
###### v1.4 ######
- Complete overhaul of extension was necessary after Prime Video UI experienced a complete change
- Added support for signed in users of Prime Video, and those who are not signed in
- In addition to displaying ratings on the Prime Video homepage, extension now displays ratings when a user clicks on film/video, and when hovers over 'Customers who watched this item also watched' 
###### v1.37 ######
- Domain support added for Australian users, and fixed for Brazilian users*, and all countries that use the URL (primevideo.com/*) Loading image resized to be less obtrusive 
###### v1.33 ######
- Domain support added for Brazilian users *post-release-fix of this update should have fixed any more issues for Brazilian users*
###### v1.31 ######
- Fix fatal error where extension attempts to access incorrect element of search resulting in 'page not found' error, and support for 'www.Amazon.de" added
###### v1.29 ######
- Fix fatal error where extension is unable to run due to recent update to google search where all visible URLS were replaced with breadcrumb styling
###### v1.23 ######
- Fix issue where extension does not run if prime video URL includes '/gp/' when the user accesses the different options on the 'Amazon Prime Video' page, ex: 'all videos' , 'your videos' , 'included with prime' , etc
###### v1.22 ######
- Fix issue where extension does not run if prime video URL includes '/Prime-Video/' instead of '/Amazon-Video/'
###### v1.21 ######
- Change extension name and description 
###### v1.2 ######
- Fix issue where extension does not run if prime video is accessed through the 'Your 
  Prime Video' option under 'My account' 
###### v1.1 ######
- Change manifest with short name addition

## Disclaimer
Amazon™ , Amazon Prime Instant Video™ and Rotten Tomatoes™ are registered trademarks and have no affiliation to this extension or the author of said extension.
