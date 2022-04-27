import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

function displayBias(days) {
    //alert("HELLO");
    var pointer = new Date();
    var bias_json;
    var month, day, year;
    var left = 0;
    var left_leaning = 0;
    var center = 0;
    var right_leaning = 0;
    var right = 0;
    for(let i = 0; i < days; i++){
        month = pointer.getMonth()+1;
        day = pointer.getDate();
        year = pointer.getFullYear();
        var currentDate = month + '/' + day + '/' + year
        //alert(currentDate);
        if(localStorage.getItem(currentDate)){
            //alert("Detected");
            bias_json = JSON.parse(localStorage.getItem(currentDate));
            left = left + bias_json.Left;
            left_leaning = left_leaning + bias_json.LeanLeft;
            center = center + bias_json.Center;
            right_leaning = right_leaning + bias_json.LeanRight;
            right = right + bias_json.Right;
        }
        pointer.setDate(pointer.getDate() - 1);
    }
    //alert("Last Week: " + pointer);
    //alert(dates);
    return [left,left_leaning,center,right_leaning,right];
}

var bias = displayBias(7);//TODO: CHANGE ACCORDING TO SLIDER
//alert(bias);

let myChart = document.getElementById('myChart').getContext('2d');
let doughnutChart = new Chart(myChart, {
type:'doughnut',
data: {
    labels:['Left', 'Left-Leaning', 'Center', 'Right-Leaning', 'Right'],
    datasets:[{
    label: 'Media Bias',
    data: [
        bias[0],
        bias[1],
        bias[2],
        bias[3],
        bias[4]
    ],
    backgroundColor: [
        '#8093e2',
        '#9580f0',
        '#e57682',
        '#e35ba3',
        '#e53c51'
    ]
    }]
},
    options:{}
});