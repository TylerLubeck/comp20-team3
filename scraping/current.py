import urllib2
from bs4 import BeautifulSoup
import json

base_url = 'http://www.iheart.com'
with open('scraped_urls.json', 'r') as infile:
	urls = json.load(infile)
results = {}

for key in urls:
	print("scraping url: " + base_url + urls[key] + " as " + key)
	page = urllib2.urlopen(base_url + urls[key])
	soup = BeautifulSoup(page)

	stations = soup.findAll('p', attrs = {'class':'stnTitle'})

	locStations = {}
	for itr in range(0,len(stations)-1):
		if itr >= 5:
			break
		thisStation = {}
		title = stations[itr].find('a').text
		link = stations[itr].find('a').get('href')

		print("  scraping url: " + base_url + link + " as " + title)
		page = urllib2.urlopen(base_url + link)
		soup = BeautifulSoup(page)
		facts = soup.find('section', attrs = {'class':'subColRight stnInfo clearfix'})
		website = soup.find('a', attrs = {'class':'seeAll'}).get('href')
		items = facts.findAll('li')
		for i in items:
			if 'Genre' in str(i):
				genre = i.find('a').text
				genre = genre[:-2]

		thisStation['website'] = website
		thisStation['genre'] = genre
		thisStation['title'] = title
		thisStation['link'] = link
		print(thisStation)
		locStations[itr] = thisStation
	results[key] = locStations
with open('radio_stations.json', 'w') as outfile:
	json.dump(results, outfile)
