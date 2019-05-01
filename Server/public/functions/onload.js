 window.onload = function(event) {
    event.stopPropagation(true);
    var loged=isLogedin()
    if(loged=='false'){
      window.location.href="http://localhost:8080"
    }
    else{
      document.getElementsByTagName("html")[0].style.visibility = "visible";
      
      
    }
}
