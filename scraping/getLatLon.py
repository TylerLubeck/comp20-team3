import urllib2
from bs4 import BeautifulSoup
import mechanize
import json

url = 'http://www.geonames.org/'

#Create a browser object and give it some optional settings.
br = mechanize.Browser()
#br.set_all_readonly(False)    # allow everything to be written to
br.set_handle_robots(False)   # ignore robots
br.set_handle_refresh(False)  # can sometimes hang without this
br.addheaders = [('User-agent', 'Firefox')]


with open('radio_stations.json', 'r') as infile:
	stations = json.loads(infile.read())

for loc in stations:
	response = br.open(url)	# open up the page

	br.select_form("searchForm")	# select the relevant form

	searchControl = br.form.find_control('q')	# select input named 'q'
	countryControl = br.form.find_control('country')	# select input named 'country'
	searchControl.value = loc	# set text input for 'q'
	countryControl.value = ['US']	# set select input for 'country'

	print(searchControl.value)
	print(countryControl.value)

	response = br.submit()	# submit the form

	# parse the resulting page using BS
	soup = BeautifulSoup(response.read())
	myTable = soup.find('table', attrs = {'class':'restable'})
	try:
		latlon = myTable.findAll('tr')
		latitude = latlon[2].find('span', attrs = {'class':'latitude'}).text
		longitude = latlon[2].find('span', attrs = {'class':'longitude'}).text

		stations[loc]['latitude'] = latitude
		stations[loc]['longitude'] = longitude
		print(latitude)
		print(longitude)
		print('\n')
	except:
		stations[loc]['latitude'] = None
		stations[loc]['longitude'] = None
		print('not found!!!')

with open('radio_stations_with_latlon.json', 'w') as outfile:
	json.dump(stations, outfile)
