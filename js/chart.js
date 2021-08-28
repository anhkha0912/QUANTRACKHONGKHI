function chartpm25() {
    function onRefresh(chart) {
    var datapm25;
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours();
    firebase.database().ref('DATA').child(''+date+'').child('' + time + '').limitToLast(1).on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
               var pm25 = childSnapshot.val().BUI25;
               if(pm25 >0 ){
                   datapm25 = pm25;
               }
                
            });
            var now = Date.now();
            chart.data.datasets.forEach(function(dataset) {
            dataset.data.push({
                x: now,
                y: datapm25,
            });
        });
        });
       
    }
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, 
            {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'PM25',
                        borderColor: 'rgb(230, 0, 0)',
                        backgroundColor: 'rgb(230, 0, 0)',
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        data: [],
                    }
                ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Biểu đổ chỉ số chất lượng không khí'
                    },
                    responsive: true,
                    hoverMode: 'nearest',
                    scales: {
                        xAxes: [{
                            type: 'realtime',
                            realtime: {
                                duration: 15000,
                                refresh: 2000,
                                delay: 2000,
                                onRefresh: onRefresh
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'value',
                                        }
                        }]
                    },
                    plugins: {
                    streaming: {            
                        frameRate: 30     
                    }
        }
                }
            }
            );
};
function chartpm10() {

function onRefresh1(chart) {
var datapm10;
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours();
firebase.database().ref('DATA').child(''+date+'').child('' + time + '').limitToLast(1).on('value', function(snapshot) {
snapshot.forEach(function(childSnapshot) {
            var pm10 = childSnapshot.val().BUI10;
            if(pm10 > 0){
                datapm10 = pm10;
            }
            
        });
        chart.data.datasets.forEach(function(dataset) {
        dataset.data.push({
            x: Date.now(),
            y: datapm10,
        });
    });
 });
    
}
var ctx1 = document.getElementById('myChart1').getContext('2d');
var chart = new Chart(ctx1, {
        type: 'line',
        data: {
            datasets: [{
                label: 'PM10',
                borderColor: 'rgb(26, 102, 255)',
                backgroundColor: 'rgb(26, 102, 255)',
                cubicInterpolationMode: 'monotone',
                fill: false,
                data: []
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Biểu đổ chỉ số chất lượng không khí'
            },
            responsive: true,
            hoverMode: 'nearest',
            scales: {
                xAxes: [{
                    type: 'realtime',
                    realtime: {
                        duration: 15000,
                        refresh: 2000,
                        delay: 2000,
                        onRefresh: onRefresh1
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'value',
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
                    }
                }]
            }
        }
    });

};
function chartco() {
function onRefresh2(chart) {
var dataco;
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours();
firebase.database().ref('DATA').child(''+date+'').child('' + time + '').limitToLast(1).on('value', function(snapshot) {
snapshot.forEach(function(childSnapshot) {
            var co = childSnapshot.val().CO;
            if(co > 0){
                dataco = co;
            }
            
        });
            chart.data.datasets.forEach(function(dataset) {
                dataset.data.push({
                    x: Date.now(),
                    y: dataco,
                });
            });
        });
            
        }
            var ctx = document.getElementById('myChart2').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'CO',
                        borderColor: 'rgb(51, 204, 51)',
                        backgroundColor: 'rgb(51, 204, 51)',
                        cubicInterpolationMode: 'monotone',
                        fill: false,
                        data: []
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Biểu đổ chỉ số chất lượng không khí'
                    },
                    responsive: true,
                    hoverMode: 'nearest',
                    scales: {
                        xAxes: [{
                            type: 'realtime',
                            realtime: {
                                duration: 15000,
                                refresh: 2000,
                                delay: 2000,
                                onRefresh: onRefresh2
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'value',
                      ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                            }
                        }]
                    }
                }
            });
}
function chartco2() {
    function onRefresh3(chart) {
    var dataco2;
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours();
    firebase.database().ref('DATA').child(''+date+'').child('' + time + '').limitToLast(1).on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
                var co2 = childSnapshot.val().CO2;
                if(co2 > 0){
                    dataco2 = co2;
                }
                
            });
                chart.data.datasets.forEach(function(dataset) {
                    dataset.data.push({
                        x: Date.now(),
                        y: dataco2,
                    });
                });
            });
                
            }
                var ctx = document.getElementById('myChart3').getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: 'CO2',
                            borderColor: 'rgb(230, 184, 0)',
                            backgroundColor: 'rgb(230, 184, 0)',
                            cubicInterpolationMode: 'monotone',
                            fill: false,
                            data: []
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Biểu đổ chỉ số chất lượng không khí'
                        },
                        responsive: true,
                        hoverMode: 'nearest',
                        scales: {
                            xAxes: [{
                                type: 'realtime',
                                realtime: {
                                    duration: 15000,
                                    refresh: 2000,
                                    delay: 2000,
                                    onRefresh: onRefresh3
                                }
                            }],
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'value',
                          ticks: {
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                                }
                            }]
                        }
                    }
                });
    }
window.addEventListener('DOMContentLoaded', function () {
chartpm25();
})
window.addEventListener('DOMContentLoaded', function () {
chartpm10();
})
window.addEventListener('DOMContentLoaded', function () {
chartco();
})
window.addEventListener('DOMContentLoaded', function () {
    chartco2();
})

function bieudo() {
document.getElementById('myChart').style.display = "block";
document.getElementById('myChart1').style.display = "none";
document.getElementById('myChart2').style.display = "none";
document.getElementById('myChart3').style.display = "none";
}
function bieudo1() {
document.getElementById('myChart').style.display = "none";
document.getElementById('myChart1').style.display = "block";
document.getElementById('myChart2').style.display = "none";
document.getElementById('myChart3').style.display = "none";
}
function bieudo2() {
document.getElementById('myChart').style.display = "none";
document.getElementById('myChart1').style.display = "none";
document.getElementById('myChart2').style.display = "block";
document.getElementById('myChart3').style.display = "none";
}
function bieudo3() {
    document.getElementById('myChart').style.display = "none";
    document.getElementById('myChart1').style.display = "none";
    document.getElementById('myChart2').style.display = "none";
    document.getElementById('myChart3').style.display = "block";
    }
window.addEventListener('DOMContentLoaded', function () {
document.getElementById('myChart1').style.display = "none";
document.getElementById('myChart2').style.display = "none";
document.getElementById('myChart3').style.display = "none";
})