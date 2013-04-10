import requests
from bs4 import BeautifulSoup
import csv

url = 'http://www.iheart.com/find/'
payload = {'zip':'98102'}
r = requests.post(url, payload)

if(r.status_code == requests.codes.ok):
	soup = BeautifulSoup(r.content)
	print(soup.prettify())

	addresses = soup.findAll('option', attrs = {})
	results = []
	with open('extractedUrls.csv', 'wb') as f:
		writer = csv.writer(f)
		for a in addresses:
			writer.writerow([a.text, a.get('value')])
