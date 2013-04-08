import urllib2
from bs4 import BeautifulSoup

url = "http://www.iheart.com/find/markets/Boston-MA-99/"
page = urllib2.urlopen(url)

soup = BeautifulSoup(page)

print(soup.prettify())

titles = soup.findAll('p', attrs = {'class':'stnTitle'})
for t in titles:
	print t
