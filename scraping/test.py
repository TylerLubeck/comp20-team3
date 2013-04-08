import urllib2
from bs4 import BeautifulSoup

url = "http://www.iheart.com/find/markets/Boston-MA-99/"
page = urllib2.urlopen(url)

soup = BeautifulSoup(page)

print(soup.prettify())
