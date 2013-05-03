if(typeof(Storage)!=="undefined")
{
    if (localStorage.userName)
    {
        document.write('<li><a href="your_music.html">'+localStorage.userName+'</a></li>');
    }
    else
    {
        document.write('<li><a href="sign_in.html">Sign In/Register</a></li>');	 	
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
