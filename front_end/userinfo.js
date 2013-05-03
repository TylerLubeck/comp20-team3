function initialize() {
	content = "";
	username = localStorage.userName;
	if (username != undefined) {
		getUserInfo(username);
		yourmusic();
	} else {
		content += "You are not logged in or do not have an account"
		var status = document.getElementById("info");

		var newItem = document.createElement("P");
		var text = document.createTextNode(content);
		newItem.appendChild(text);		
		status.insertBefore(newItem, status.childNodes[0]);
	}
}

function getUserInfo(username) {
    try {
            request = new XMLHttpRequest();
    }
    catch (ms1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (ms2) {
			try {
  				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
	        catch (ex) {
		        request = null;
        	}
		}
	}

	user_request = "http://afternoon-anchorage-3983.herokuapp.com/usersearch.json?username=" + username;
    //Set up, execute, and handle the request
    request.open("GET", user_request, true);
    request.send();
    request.onreadystatechange = function() {
    	var status = document.getElementById("info");

    	if(request.readyState == 4 && request.status == 200) {
    		string = request.responseText;
    		parsed = JSON.parse(string);
    		if (parsed.length > 0) {
    			$('#info').append("<table id='box-table-a'><tr><th>Radio Station</th><th>Your Rating</th></tr>")
    			for (var i = 0; i < parsed.length; i ++) {
    				content += "<tr>";
    				content += "<td>" + parsed[i].station + "</td>";
    				content += "<td>" + parsed[i].rating + "</td>";
    				content += "</tr>";

    				$('#info').append(content);
    			}
    			$('#info').append("</table>")
    		} else if (request.readyState == 4 && reqest.status == 0) {
    			content = "You haven't listened to anything yet!";
				var newItem = document.createElement("P");
				var text = document.createTextNode(content);
				newItem.appendChild(text);		
				status.insertBefore(newItem, status.childNodes[0]);
    		}
    	}
    }
}

function yourmusic() 
{

}