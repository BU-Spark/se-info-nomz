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

let myChart = document.getElementById('myChart').getContext('2d');
let doughnutChart = new Chart(myChart, {
type:'doughnut',
data: {
    labels:['Left', 'Left-Leaning', 'Center', 'Right-Leaning', 'Right'],
    datasets:[{
    label: 'Media Bias',
    data: [
        1,
        2,
        3,
        4,
        5
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