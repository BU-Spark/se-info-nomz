chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.url){
        //Take current tab URL and parse out base
        var trimmedURL = changeInfo.url.replace(/^https?:\/\//,'');
        trimmedURL = trimmedURL.replace(/^www\./,'');
        trimmedURL = trimmedURL.split('/')[0];
        alert(trimmedURL)

        var current_json = JSON.parse(localStorage.getItem("biasRatings"));
        //check to see if current URL matches any in the JSON file
        if(current_json[trimmedURL]){
            //get current date
            var today = new Date();
            var day = String(today.getDate()) //gets current day of month
            var month = String(today.getMonth()+1) //gets current month; Note that January is 0
            var year = String(today.getFullYear()) //gets current year
            var currentDate = month + '/' + day + '/' + year

            //check to see if there is already a JSON entry for the current date
            if(localStorage.getItem(currentDate)){
                alert('There is already an entry for current Date')
                //If there already is an entry for current date, update entry
                var bias_json = JSON.parse(localStorage.getItem(currentDate));

                // alert(bias_json.Left)
                // alert(bias_json.LeanLeft)
                // alert(bias_json.Center)
                // alert(bias_json.LeanRight)
                // alert(bias_json.Right)

            }else{
                alert('There is no entry for current date')
                //If there is no entry for current date, create entry
                var biasData = '{'
                    +'"Left" : 0,'
                    +'"LeanLeft"  : 0,'
                    +'"Center" : 0,'
                    +'"LeanRight" : 0,'
                    +'"Right" : 0'
                    +'}';
                var temp = JSON.parse(biasData)

                var rating = current_json[trimmedURL].rating
                if(rating === "Left"){
                    temp.Left = 1;
                }else if(rating === "Lean Left"){
                    temp.LeanLeft = 1;
                }else if(rating === "Center"){
                    temp.Center = 1;
                }else if(rating === "Lean Right"){
                    temp.LeanRight = 1;
                }else if(rating === "Right"){
                    temp.Right = 1;
                }
                biasData = JSON.stringify(temp);

                alert(biasData)

                localStorage.setItem(currentDate, biasData);
            }
        }
    }
});

chrome.runtime.onStartup.addListener(function() {
    alert('open')
    var check = localStorage.getItem("InfoNomz");//REMOVE THIS AFTER 
    if(check){
        localStorage.removeItem("InfoNomz");
    }
    var starting_json = {urls: [], political_bias:{left:0, left_leaning:0, center:0, right_leaning:0, right:0}};
    starting_json.urls.push("www.url.com");
    localStorage.setItem("InfoNomz", JSON.stringify(starting_json));
});

