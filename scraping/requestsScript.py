import requests
from bs4 import BeautifulSoup
import json

url = 'http://www.iheart.com/find/'
payload = {'zip':'98102'}
r = requests.post(url, payload)

if(r.status_code == requests.codes.ok):
	soup = BeautifulSoup(r.content)

	addresses = soup.findAll('option', attrs = {})
	results = {}
	for a in addresses:
		if a.get('value') and a.text!='By Popularity' and a.text!='Alphabetically':
			#print(a.text + "," + a.get('value'))
			results[a.text] = a.get('value')
	with open('scraped_urls.json', 'w') as outfile:
		json.dump(results, outfile)
