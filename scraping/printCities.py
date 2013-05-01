import json

with open('radio_stations.json', 'r') as infile:
	stations = json.loads(infile.read())

for key in stations:
	print(key)
