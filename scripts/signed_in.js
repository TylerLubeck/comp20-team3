if(typeof(Storage)!=="undefined")
  {
  if (localStorage.username)
    {
	    document.write('<li><a href="your_music.html">'+localStorage.username+'</a></li>');
    }
  else
    {
    	localStorage.username="Joe";
	 	document.write('<li><a href="sign_in.html">Sign In</a></li>');	 	
    }
  }
else
  {
		document.write("LOL");	  
  }
  
function logout(){
	localStorage.clear();
	window.location.href="sign_in.html";
}
