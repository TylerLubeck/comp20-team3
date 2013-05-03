[mockup]: readme_images/mock_ups.png

##Road Trip Rockin'##

###Problem Statement###

When you're on a road trip, you want to know what music is popular in the 
area.

###Solution###

An application that finds the best music in the area you're in and plays it
 for you.

###Use Scenario###

When a user first visits the website, they are encouraged to create an 
account. Once they create an account and give permission for us to use
their location, music automatically starts to play. The music that plays
is based upon what the top hits near their current location are. They are
presented with some options, namely: "I like this" and "Save this for
later." User's will also be given the ability to like the song and share
it on facebook. 

From here, two things happen:
* If they choose "I like this", more music will be played that is similar
to that song although not necessarily related to their location.

* If they coose "Save this for later", the song information will be saved
to their account. When they log in later, they will be able to retrieve 
these songs and will be presented with links to buy it on amazon music

###Features (Pick 5)

* Geolocation
* Front-end Framework (Bootstrap)
* Report with times/graphs (Google graphs api)
* Data/screen scraping
* Emails/SMS

###Data Collected & Used###

Popular music data by location (Echonest)

###Algorithms or Special Techniques###

* Selection algorithm to select songs based on current location and user
preferences. (e.g. genre, local bands only, etc.)

###APIs###

* Google Maps API
* Google Graphs API

###A Note on Music Providers###

Two options:

* I believe echonest provides 30 second song clips. We can safely use these.
* We can use youtube videos. Put the video in a div and hide the div, and I
  believe it will still play. This is very bad for mobile services as it
  means more data usage and more bandwidth, but we will be able to get whole
  songs.
* Either way, should this product go live, we should find a way to rent music.

###Mock-Ups###
![Computer Generated Mock-Ups][mockup]

### Comments by Ming
* Neat!  You can do that with EchoNest?
