function createUser(fname,lname,uname,email,password,callback){
    var http = new XMLHttpRequest();
    var params = 'fname='+fname+'&lname='+lname+'&uname='+uname+'&email='+email+'&password='+password
    http.open('POST','/createUser',true);
    http.setRequestHeader('content-type','application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            
            var response=JSON.parse(http.responseText);
            callback(response);
        }
    }
    http.send(params);

}

function login(uname,password,callback){

    var http = new XMLHttpRequest();
    var params = 'uname='+uname+'&password='+password
    http.open('POST','/auth',true);
    http.setRequestHeader('content-type','application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            
            var response=JSON.parse(http.responseText);
            callback(response);
        }
    }
    http.send(params);


}


function isLogedin(){
    return localStorage.getItem('login')
}



function getTopCrimes(callback){
    var http = new XMLHttpRequest();
    var params = ''
    http.open('GET','/topcrimes',true);
    http.setRequestHeader('content-type','application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            
            var response=JSON.parse(http.responseText);
            callback(response);
        }
    }
    http.send(params);

}


function getTopSpots(callback){
    var http = new XMLHttpRequest();
    var params = ''
    http.open('GET','/topspots',true);
    http.setRequestHeader('content-type','application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var response=JSON.parse(http.responseText)
            callback(response);
            
        }
    }
    http.send(params);

}


function getCrimesNear(address,postcode,distance,callback){
    var http = new XMLHttpRequest();
    var params = 'address='+address+'&postcode='+postcode+'&distance='+distance
    http.open('POST','/crimenear',true);
    http.setRequestHeader('content-type','application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var response=JSON.parse(http.responseText)
            callback(response);
            
        }
    }
    http.send(params);

}