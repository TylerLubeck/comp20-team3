function initialize() {
	var update = document.getElementById("msg").value;

}

function add() 
{
	var status = document.getElementById("status");
	
	set_date();
	to_print = date + " - " + update;	
	var newItem = document.createElement("P");
	var text = document.createTextNode(to_print);
	newItem.appendChild(text);		
	status.insertBefore(newItem,status.childNodes[0]);
}