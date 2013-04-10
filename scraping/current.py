import urllib2
from bs4 import BeautifulSoup
import json

base_url = 'http://www.iheart.com'
with open('scraped_urls.json', 'r') as infile:
	urls = json.load(infile)

key = 'Washington'
print("scraping url: " + base_url + urls[key])
page = urllib2.urlopen(base_url + urls[key])
soup = BeautifulSoup(page)

stations = soup.findAll('p', attrs = {'class':'stnTitle'})

results = {}
for itr in range(0,len(stations)-1):
	title = stations[itr].find('a').text
	link = stations[itr].find('a').get('href')
	print(title)
	print(link)
