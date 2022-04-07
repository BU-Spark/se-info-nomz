
//Convert the variable into a JSON string and stores it into local storage
var testObject = {urls: ["www.google.com", "www.bing.com", "www.yahoo.com"], names: ["Google", "Bing", "Yahoo"]};
//console.log(testObject.urls);
testObject.urls.push("www.url.com");
//console.log(testObject.urls);
testObject.names.push("URL"); //appending function
localStorage.setItem("testObject", JSON.stringify("testObject"));

//Get the JSON string
var jsonString = localStorage.getItem("testObject");

//parses the JSON string back into javascript object
var javaObject = JSON.parse(jsonString);
console.log(javaObject);