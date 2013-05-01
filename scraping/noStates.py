import json

def removeKey(d, key):
    r = dict(d)
    del r[key]
    return r

with open('radio_stations_with_latlon.json', 'r') as infile:
	stations = json.loads(infile.read())

for loc in stations:
	if ',' not in loc:
		print(loc)
		stations = removeKey(stations, loc)

with open('radio_stations_no_states_with_latlon.json', 'w') as outfile:
	json.dump(stations, outfile)
