#!/usr/bin/env python

import urllib
import httplib

localURL = 'localhost:5000'
#localURL = 'afternoon-anchorage-3983.herokuapp.com'
server = httplib.HTTPConnection(localURL)

makeUser = '/makeUser'
doesExist = '/doesExist'
login = '/login.json'

#makeUserValues = {'UN' : 'joey',
#                  'PW' : 'johnnyboy',
#                  'EM' : 'someEmail'}

makeUserValues=[('UN', 'joey'), ('PW', 'johnnyboy'), ('EM', 'someEmail')]

doesExistValues = {'UN' : 'joey'}

loginValues = {'UN' : 'joey', 'PW' : 'johnnyboy'}

data = urllib.urlencode(makeUserValues)

server.request('POST', makeUser, data)

response = server.getresponse()
makeUserSuccess = response.read()

print "Made user successful: " + makeUserSuccess

data = urllib.urlencode(doesExistValues)
server.request('GET', doesExist, data)

response = server.getresponse()
doesExistSuccess = response.read()

print "Is user there: " + doesExistSuccess

data = urllib.urlencode(loginValues)
server.request('GET', login, data)
response = server.getresponse()
loginSuccess = response.read()

print "Login worked: " + loginSuccess
