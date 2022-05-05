//Returns the political bias score of the past 7 days
function displayWeeklyBias() {
    const week = 7; 
    var today = new Date();
    var pointer = new Date();
    var dates = [];
    var bias_json;
    var month, day, year;
    var left = 0;
    var left_leaning = 0;
    var center = 0;
    var right_leaning = 0;
    var right = 0;
    for(let i = 0; i < week; i++){
        month = pointer.getMonth()+1;
        day = pointer.getDate();
        year = pointer.getFullYear();
        var currentDate = month + '/' + day + '/' + year
        if(localStorage.getItem(currentDate)){
            bias_json = JSON.parse(localStorage.getItem(currentDate));
            left = left + bias_json.Left;
            left_leaning = left_leaning + bias_json.LeanLeft;
            center = center + bias_json.Center;
            right_leaning = right_leaning + bias_json.LeanRight;
            right = right + bias_json.Right;
        }
        pointer.setDate(pointer.getDate() - 1);
    }

    return [left,left_leaning,center,right_leaning,right];
}

window.onload = function(){
    var bias = displayWeeklyBias();
    //alert(bias);
    var article_sum = 0;
    for (let i = 0; i < bias.length; i++) {
        article_sum = article_sum + bias[i];
    }
    var aggr = 0;
    for (let i = 0; i < bias.length; i++) {
        aggr = aggr + bias[i]*(i+1);
        //alert(aggr);
    }
    aggr = aggr/article_sum;
    //alert(aggr);
    document.getElementById('callout_info').innerHTML = "You've read " + article_sum + " political articles.";

    if (article_sum == 0){
        document.getElementById('callout_political').innerHTML = "You've read no articles."
    }
    else if(1 < aggr && aggr < 1.8){
        document.getElementById('callout_political').innerHTML = "You tend to read politically left articles."
    }
    else if(aggr < 2.6){
        document.getElementById('callout_political').innerHTML = "You tend to read left-leaning political articles."
    }
    else if(aggr < 3.4){
        document.getElementById('callout_political').innerHTML = "You tend to read politically neutral articles."
    }
    else if(aggr < 4.2){
        document.getElementById('callout_political').innerHTML = "You tend to read right-leaning political articles."
    }
    else{
        document.getElementById('callout_political').innerHTML = "You tend to read politically right articles."
    }
    document.getElementById('callout_topical').innerHTML = "Your most frequent topic is ____.";
}