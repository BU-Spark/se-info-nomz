chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.url){
        //Take current tab URL and parse out base
        var trimmedURL = changeInfo.url.replace(/^https?:\/\//,'');
        trimmedURL = trimmedURL.replace(/^www\./,'');
        trimmedURLPart2 = trimmedURL;
        trimmedURLPart2 = trimmedURLPart2.split('/')[1];
        trimmedURL = trimmedURL.split('/')[0];

        var current_json = JSON.parse(localStorage.getItem("biasRatings"));
        //check to see if current URL matches any in the JSON file
        //also check that current tab is not the home page of website
        if(trimmedURLPart2 !== ""){
            if(current_json[trimmedURL]){
                //get current date
                var today = new Date();
                var day = String(today.getDate()) //gets current day of month
                var month = String(today.getMonth()+1) //gets current month; Note that January is 0
                var year = String(today.getFullYear()) //gets current year
                var currentDate = month + '/' + day + '/' + year
    
                //check to see if there is already a JSON entry for the current date
                var rating = current_json[trimmedURL].rating
                if(localStorage.getItem(currentDate)){
                    //alert('There is already an entry for current Date')
                    //If there already is an entry for current date, update entry
                    var bias_json = JSON.parse(localStorage.getItem(currentDate));
                    if(rating === "Left"){
                        bias_json.Left = bias_json.Left+1;
                    }else if(rating === "Lean Left"){
                        bias_json.LeanLeft = bias_json.LeanLeft+1;
                    }else if(rating === "Center"){
                        bias_json.Center = bias_json.Center+1;
                    }else if(rating === "Lean Right"){
                        bias_json.LeanRight = bias_json.LeanRight+1;
                    }else if(rating === "Right"){
                        bias_json.Right = bias_json.Right+1;
                    }
                    
                    // alert("Left: " + bias_json.Left)
                    // alert("Lean Left: " +bias_json.LeanLeft)
                    // alert("Center: " +bias_json.Center)
                    // alert("Lean Right: " +bias_json.LeanRight)
                    // alert("Right: " +bias_json.Right)
                    localStorage.setItem(currentDate, JSON.stringify(bias_json));
    
                }else{
                    //alert('There is no entry for current date')
                    //If there is no entry for current date, create entry
                    var biasData = '{'
                        +'"Left" : 0,'
                        +'"LeanLeft"  : 0,'
                        +'"Center" : 0,'
                        +'"LeanRight" : 0,'
                        +'"Right" : 0'
                        +'}';
                    var temp = JSON.parse(biasData)
    
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
    
                    //alert(biasData)
    
                    localStorage.setItem(currentDate, biasData);
                }
            }
        }
        
    }
});
