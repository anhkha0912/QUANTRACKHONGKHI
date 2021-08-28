
function UP() {
    var today = new Date();
    var second = today.getSeconds();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours();
    var minute = today.getMinutes();
    var fulltime = time+':'+minute+':'+second;
    var datetime = date+' '+fulltime;
    firebase.database().ref('DATA').child(''+date+'').child('' + time + '').limitToLast(1).on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var pm25 = childSnapshot.val().BUI25;
            var pm10 = childSnapshot.val().BUI10;
            var co = childSnapshot.val().CO;
            var co2 = childSnapshot.val().CO2;
            document.getElementById("p1").innerHTML = pm25;
            document.getElementById("p2").innerHTML = pm10;
            document.getElementById("p3").innerHTML = Math.round(co*100.0)/100.0;
            document.getElementById("p4").innerHTML = Math.round(co2*100.0)/100.0;
        });
    });
};
window.addEventListener('load', function () {
    UP();
});
const reducer = (acc,curr) => acc+curr;
function tinh(x){
    var b =  x.reduce(reducer)/x.length;
    var t = Math.round(b*100.0)/100.0;
    return t;
}
function ttb(){
var today = new Date();
var second = today.getSeconds();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours();
var minute = today.getMinutes();
    if(minute == 59 && second == 58){
        var gpm25 = [],gpm10 = [],gco = [];
        firebase.database().ref('DATA').child(''+date+'').child('' + time + '').on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                    var pm25 = childSnapshot.val().BUI25;
                    if(pm25 > 0){
                        gpm25.push(pm25);     
                    }
                });
                var tb = tinh(gpm25);
                firebase.database().ref('CSAQI').child('PM25').push({tb:tb});
                });
        firebase.database().ref('DATA').child(''+date+'').child('' + time + '').on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                    var pm10 = childSnapshot.val().BUI10;
                    if(pm10 > 0){
                        gpm10.push(pm10);     
                    }
                });
                var tb = tinh(gpm10);
                firebase.database().ref('CSAQI').child('PM10').push({tb:tb});
                });
        firebase.database().ref('DATA').child(''+date+'').child('' + time + '').on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                    var co = childSnapshot.val().CO;
                    if(co > 0){
                        gco.push(co);     
                    }
                });
                var tb = tinh(gco);
                firebase.database().ref('CSAQI').child('CO').push({tb:tb});
                });
    }
    setTimeout("ttb()",1000);
}


function checkminmax(pm) {
    var cmax = Math.max.apply(Math, pm);
    var cmin = Math.min.apply(Math, pm);
    var obj = {
        cmax: cmax,
        cmin: cmin
    };
    return obj;
}


var p25 = [], p10 = [],mco = [], mco2 = [];
function MINMAX() {
    var today = new Date();
    var second = today.getSeconds();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours();
    var minute = today.getMinutes();
    var fulltime = time+':'+minute+':'+second;
    var datetime = date+' '+fulltime;
    firebase.database().ref('DATA').child(''+date+'').child('' + time + '').on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var pm25 = childSnapshot.val().BUI25;
            if (pm25 > 0) {
                p25.push(pm25);
            }

            var pm10 = childSnapshot.val().BUI10;
            if (pm10 > 0) {
                p10.push(pm10);
            }

            var co = childSnapshot.val().CO;
            if (co > 0) {
                mco.push(co);
            }

            var co2 = childSnapshot.val().CO2;
            if (co2 > 0) {
                mco2.push(co2);
            }
        });
        var cmpm25 = checkminmax(p25);
        var cmpm10 = checkminmax(p10);
        var cmco = checkminmax(mco);
        var cmco2 = checkminmax(mco2);
        document.getElementById("minpm25").innerHTML = cmpm25.cmin;
        document.getElementById("maxpm25").innerHTML = cmpm25.cmax;
        document.getElementById("minpm10").innerHTML = cmpm10.cmin;
        document.getElementById("maxpm10").innerHTML = cmpm10.cmax;
        document.getElementById("minco").innerHTML = Math.round(cmco.cmin*100.0)/100.0;
        document.getElementById("maxco").innerHTML = Math.round(cmco.cmax*100.0)/100.0;
        document.getElementById("minco2").innerHTML = Math.round(cmco2.cmin*100.0)/100.0;
        document.getElementById("maxco2").innerHTML = Math.round(cmco2.cmax*100.0)/100.0;
    });
};

function trangthaianh(temp) {
    if (temp > 0 && temp <= 50) {
        document.images['image'].src = 'image/1.PNG';
        document.getElementById('mau').style.background = 'rgb(0,228,0)';
    } else if (temp >= 51 && temp <= 100) {
        document.images['image'].src = 'image/2.PNG';
        document.getElementById('mau').style.background = 'rgb(255,255,0)';
    } else if (temp >= 101 && temp <= 150) {
        document.images['image'].src = 'image/3.PNG';
        document.getElementById('mau').style.background = 'rgb(255,126,0)';
    } else if (temp >= 151 && temp <= 200) {
        document.images['image'].src = 'image/4.PNG';
        document.getElementById('mau').style.background = 'rgb(255,0,0)';
    } else if (temp >= 201 && temp <= 300) {
        document.images['image'].src = 'image/5.PNG';
        document.getElementById('mau').style.background = 'rgb(143,63,151)';
    } else if (temp >= 301 && temp <= 500) {
        document.images['image'].src = 'image/6.PNG';
        document.getElementById('mau').style.background = 'rgb(126,0,35)';
    }
}
function KHUYENNGHI(temp) {
    if (temp > 0 && temp <= 50) {
        document.images['image1'].src = 'image/tot1.png';
        document.images['image2'].src = 'image/tot2.png';
        document.images['image0'].src = '';
        document.images['image3'].src = '';
        document.getElementById('textKN').style.background = 'rgb(0,228,0)';
    } else if (temp >= 51 && temp <= 100) {
        document.images['image1'].src = 'image/trungbinh1.png';
        document.images['image2'].src = 'image/trungbinh2.png';
        document.images['image0'].src = '';
        document.images['image3'].src = '';
        document.getElementById('textKN').style.background = 'rgb(255,255,0)';
    } else if (temp >= 101 && temp <= 150) {
        document.images['image1'].src = 'image/xau1.png';
        document.images['image2'].src = 'image/xau2.png';
        document.images['image0'].src = 'image/xau0.png';
        document.images['image3'].src = 'image/xau3.png';
        document.getElementById('textKN').style.background = 'rgb(255,126,0)';
    } else if (temp >= 151 && temp <= 200) {
        document.images['image1'].src = 'image/kem1.png';
        document.images['image2'].src = 'image/kem2.png';
        document.images['image0'].src = 'image/kem0.png';
        document.images['image3'].src = 'image/kem3.png';
        document.getElementById('textKN').style.background = 'rgb(255,0,0)';
    } else if (temp >= 201 && temp <= 300) {
        document.images['image1'].src = 'image/ratkem1.png';
        document.images['image2'].src = 'image/ratkem2.png';
        document.images['image0'].src = 'image/ratkem0.png';
        document.images['image3'].src = 'image/ratkem3.png';
        document.getElementById('textKN').style.background = 'rgb(143,63,151)';
    } else if (temp >= 301 && temp <= 500) {
        document.images['image1'].src = 'image/nguyhai1.png';
        document.images['image2'].src = 'image/nguyhai2.png';
        document.images['image0'].src = 'image/nguyhai0.png';
        document.images['image3'].src = 'image/nguyhai3.png';
        document.getElementById('textKN').style.background = 'rgb(126,0,35)';
    }
}


function aqigio(){
    firebase.database().ref('AQI/PM25').limitToLast(1).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            var pm25 = childSnapshot.val().aqi; 
            document.getElementById("aqipm25").innerHTML = pm25;
            document.getElementById("d1").innerHTML = checkDG(pm25);       
        });
        });
    firebase.database().ref('AQI/PM10').limitToLast(1).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            var pm10 = childSnapshot.val().aqi; 
            document.getElementById("aqipm10").innerHTML = pm10;
            document.getElementById("d2").innerHTML = checkDG(pm10);       
        });
        });
    firebase.database().ref('AQI/CO').limitToLast(1).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            var co = childSnapshot.val().aqi; 
            document.getElementById("aqico").innerHTML = co;
            document.getElementById("d3").innerHTML = checkDG(co);       
        });
        });
}

function aqitong() {
    a = [];
    firebase.database().ref('AQI/PM25').limitToLast(1).on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var pm25 = childSnapshot.val().aqi;
            a.push(pm25);
        });
        firebase.database().ref('AQI/PM10').limitToLast(1).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var pm10 = childSnapshot.val().aqi; 
                a.push(pm10);
            });
            firebase.database().ref('AQI/CO').limitToLast(1).on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var co = childSnapshot.val().aqi;
                    a.push(co);
                });
                var max = a[0];
                var maxIndex = 0;
                for (var i = 0; i < a.length; i++) {
                    if (a[i] > max) {
                        maxIndex = i;
                        max = a[i];
    
                    }
                }
                document.getElementById("aqit").innerHTML = max;
                chatgayhai(maxIndex);
                trangthaianh(max)
                KHUYENNGHI(max)
                anh(max)
                themsheet(max)
                document.getElementById("dg").innerHTML = checkDG(max);
                if(max > 50){
                    sendMail(max);
                }
                a = [];
            });
        });
    });
}



ngay = [];
function aqingay() {
    firebase.database().ref('AQINGAY/PM25').limitToLast(1).on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var pm25 = childSnapshot.val().aqingay;
            ngay.push(pm25);
        });
        firebase.database().ref('AQINGAY/PM10').limitToLast(1).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var pm10 = childSnapshot.val().aqingay;
                ngay.push(pm10);
            });
            firebase.database().ref('AQINGAY/CO').limitToLast(1).on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var co = childSnapshot.val().aqingay;
                    ngay.push(co);
                });
                var max =ngay[0];
                var maxIndex = 0;
                for (var i = 0; i < ngay.length; i++) {
                    if (ngay[i] > max) {
                        maxIndex = i;
                        max = ngay[i];
    
                    }
                }
                console.log(ngay);
                document.getElementById("aqit").innerHTML = max;
                chatgayhai(maxIndex);
                trangthaianh(max);
                KHUYENNGHI(max);
                anh(max)
                document.getElementById("dg").innerHTML = checkDG(max);
                ngay = [];
            });
        });
    });
}



function chatgayhai(temp) {
    if (temp == 0) {
        document.getElementById("cgon").innerHTML = 'PM<sub>2.5</sub> (Chất dạng hạt dưới 2.5 micron)';
    }
    else if (temp == 1) {
        document.getElementById("cgon").innerHTML = 'PM<sub>10</sub> (Chất dạng hạt dưới 10 micron)';
    }
    else if (temp == 2) {
        document.getElementById("cgon").innerHTML = 'CO (Carbon Monoxide)';
    }
}
function checkDG(temp) {
    var dg;
    if (temp > 0 && temp <= 50) {
        dg = "Tốt";
    } else if (temp >= 51 && temp <= 100) {
        dg = "Trung bình";
    } else if (temp >= 101 && temp <= 150) {
        dg = "Xấu";
    } else if (temp >= 151 && temp <= 200) {
        dg = "Kém";
    } else if (temp >= 201 && temp <= 300) {
        dg = "Rấu kém";
    } else if (temp >= 301 && temp <= 500) {
        dg = "Nguy hại";
    }
    return dg;
}
function tt0(){
    var value = document.getElementById('bt0').src;
    var name = value.substring(value.lastIndexOf('/')+1);
    if(name  == "xau0.png")
    {
        document.getElementById("textKN").innerHTML = 'Đóng cửa sổ để tránh không khí bẩn bên ngoài';
    }
    else if(name  == "kem0.png")
    {
        document.getElementById("textKN").innerHTML = 'Đóng cửa sổ để tránh không khí bẩn bên ngoài';
    }
    if(name  == "ratkem0.png")
    {
        document.getElementById("textKN").innerHTML = 'Đóng cửa sổ để tránh không khí bẩn bên ngoài';
    }
    else if(name  == "nguyhai0.png")
    {
        document.getElementById("textKN").innerHTML = 'Đóng cửa sổ để tránh không khí bẩn bên ngoài';
    }
}
function tt1(){
    var value = document.getElementById('bt1').src;
    var name = value.substring(value.lastIndexOf('/')+1);
    if(name  == "tot1.png")
    {
        document.getElementById("textKN").innerHTML = 'Mở cửa sổ để đưa không khí sạch và trong lành vào phòng';
    }
    else if(name  == "trungbinh1.png")
    {
        document.getElementById("textKN").innerHTML = 'Đóng cửa sổ để tránh không khí bẩn bên ngoài';
    }
    else if(name  == "xau1.png")
    {
        document.getElementById("textKN").innerHTML = 'Tránh tập thể dục ngoài trời';
    }
    else if(name  == "kem1.png")
    {
        document.getElementById("textKN").innerHTML = 'Tất cả mọi người nên giảm tập thể dục ngoài trời';
    }
    else if(name  == "ratkem1.png")
    {
        document.getElementById("textKN").innerHTML = 'Tránh tập thể dục ngoài trời';
    }
    else if(name  == "nguyhai1.png")
    {
        document.getElementById("textKN").innerHTML = 'Tránh tập thể dục ngoài trời';
    }
}
function tt2(){
    var value = document.getElementById('bt2').src;
    var name = value.substring(value.lastIndexOf('/')+1);
    if(name  == "tot2.png")
    {
        document.getElementById("textKN").innerHTML = 'Tận hưởng các hoạt động ngoài trời';
    }
    else if(name  == "trungbinh2.png")
    {
        document.getElementById("textKN").innerHTML = 'Các nhóm nhạy cảm nên giảm tập thể dục ngoài trời';
    }
    else if(name  == "xau2.png")
    {
        document.getElementById("textKN").innerHTML = 'Chạy máy lọc không khí';
    }
    else if(name  == "kem2.png")
    {
        document.getElementById("textKN").innerHTML = 'Chạy máy lọc không khí';
    }
    else if(name  == "ratkem2.png")
    {
        document.getElementById("textKN").innerHTML = 'Chạy máy lọc không khí';
    }
    else if(name  == "nguyhai2.png")
    {
        document.getElementById("textKN").innerHTML = 'Chạy máy lọc không khí';
    }
}
function tt3(){
    var value = document.getElementById('bt3').src;
    var name = value.substring(value.lastIndexOf('/')+1);
    if(name  == "xau3.png")
    {
        document.getElementById("textKN").innerHTML = 'Đeo khẩu trang khi ra ngoài';
    }
    else if(name  == "kem3.png")
    {
        document.getElementById("textKN").innerHTML = 'Các nhóm nhạy cảm nên đeo khẩu trang khi ra ngoài';
    }
    if(name  == "ratkem3.png")
    {
        document.getElementById("textKN").innerHTML = 'Đeo khẩu trang khi ra ngoài';
    }
    else if(name  == "nguyhai3.png")
    {
        document.getElementById("textKN").innerHTML = 'Đeo khẩu trang khi ra ngoài';
    }
}
function anh(temp){
    if (temp <= 100){
        tt1();
    }
    else{
        tt0();
    }
}
function saveData(){
    firebase.database().ref('/').once('value', function (paciente) {
        download('data' + ".json", JSON.stringify(paciente.val()));
      });
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }


  ab = [],  mail = [];
  function sendMail(max) {
    mail = [];
              firebase.database().ref('MAIL').on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var gmail = childSnapshot.val().mail;
                    mail.push(gmail);
                    console.log(mail)
                });
                for(i=0;i< mail.length;i++){
                Email.send({
                    Host : "smtp.gmail.com",
                    Username : "quantrackhongkhi@gmail.com",
                    Password : "deinosuchus12",
                    To : mail[i],
                    From : "quantrackhongkhi@gmail.com",
                    Subject : "Chất lượng không khí hiện tại",
                    Body : "<b>"+"Chỉ số AQI: "+"</b>"+max+"<br/>"
                    +"<b>"+"Đánh giá: "+"</b>"+checkDG(max)+"<br/>"
                    +"<b>"+"Khuyến cáo: "+"</b>"+"<br/>"+khuyencao(max)
                })
                }
            });
    //       });
    //   });
  }
  function khuyencao(temp){
      var dg;
      if (temp > 0 && temp <= 50) {
          dg = "Mở cửa sổ để đưa không khí sạch và trong lành vào phòng.<br/>Tận hưởng các hoạt động ngoài trời";
      } else if (temp >= 51 && temp <= 100) {
          dg = "Đóng cửa sổ để tránh không khí bẩn bên ngoài.<br/>Giảm tập thể dục ngoài trời";
      } else if (temp >= 101 && temp <= 150) {
          dg = "Ảnh hưởng xấu đến sức khoẻ Nhóm nhạy cảm.<br/>Nhóm nhạy cảm nên nạn chế thời gian ra ngoài.";
      } else if (temp >= 151 && temp <= 200) {
          dg = "Nhóm nhạy cảm tránh ra ngoài.<br/>Những người khác hạn chế ra ngoài. Nhớ đeo khẩu trang khi ra ngoài";
      } else if (temp >= 201 && temp <= 300) {
          dg = "Cảnh báo sức khoẻ khẩn cấp.<br/>Ảnh hưởng đến tất cả dân cư. Hạn chế ra đường. Khi ra đường phải đeo khẩu trang";
      } else if (temp >= 301 && temp <= 500) {
          dg = "Có thể ảnh hưởng nghiêm trọng tới sức khoẻ.<br/>Không nên ra ngoài.";
      }
      return dg;
  }


  function checkmail(){
    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var vb = document.getElementById("textemail").value;
    if(regex.test(vb)){
        firebase.database().ref('MAIL').push({mail:vb});
    }
    else{
        alert("Nhập lại mail")
    }
}



var db;
    function dubao() {
    var today = new Date();
    var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    var tomorrow2 = new Date(tomorrow.getTime() + (24 * 60 * 60 * 1000));
    var tomorrow3 = new Date(tomorrow2.getTime() + (24 * 60 * 60 * 1000));
    var tomorrow4 = new Date(tomorrow3.getTime() + (24 * 60 * 60 * 1000));
    firebase.database().ref('forecasting').on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var pm = childSnapshot.val().params;
            db = pm
        });
        var b = db.splice(0,24);
        var c = db.splice(0,24);
        var d = db.splice(0,24);
        var e = db.splice(0,24);
        var gt0 = Math.max.apply(Math, b);
        var gt1 = Math.max.apply(Math, c);
        var gt2 = Math.max.apply(Math, d);
        var gt3 = Math.max.apply(Math, e);
        document.getElementById("db0").innerHTML = Math.round(gt0)
        document.getElementById("db1").innerHTML = Math.round(gt1)
        document.getElementById("db2").innerHTML = Math.round(gt2)
        document.getElementById("db3").innerHTML = Math.round(gt3)
        document.getElementById("check0").innerHTML = checkDG(Math.max.apply(Math, b));
        document.getElementById("check1").innerHTML = checkDG(Math.max.apply(Math, c));
        document.getElementById("check2").innerHTML = checkDG(Math.max.apply(Math, d));
        document.getElementById("check3").innerHTML = checkDG(Math.max.apply(Math, e));
        document.getElementById("ngay0").innerHTML =thu(tomorrow.getDay())+', '+tomorrow.getDate()+'-'+(tomorrow.getMonth()+1)+'-'+tomorrow.getFullYear();
        document.getElementById("ngay1").innerHTML = thu(tomorrow2.getDay())+', '+tomorrow2.getDate()+'-'+(tomorrow2.getMonth()+1)+'-'+tomorrow2.getFullYear();
        document.getElementById("ngay2").innerHTML = thu(tomorrow3.getDay())+', '+tomorrow3.getDate()+'-'+(tomorrow3.getMonth()+1)+'-'+tomorrow3.getFullYear();
        document.getElementById("ngay3").innerHTML = thu(tomorrow4.getDay())+', '+tomorrow4.getDate()+'-'+(tomorrow4.getMonth()+1)+'-'+tomorrow4.getFullYear();
    });
};


function thu(temp){
    var dg;
    if(temp == 0){
        dg = "CN"
    }
    else if(temp == 1){
        dg = "T2"
    }
    else if(temp == 2){
        dg = "T3"
    }
    else if(temp == 3){
        dg = "T4"
    }
    else if(temp == 4){
        dg = "T5"
    }
    else if(temp == 5){
        dg = "T6"
    }
    else if(temp == 6){
        dg = "T7"
    }
    return dg;
}

function themsheet(temp)
 { 
        var url = "https://script.google.com/macros/s/AKfycbzy7rrIZv8ZQc5kkabC6zKLonxdXuSJ_tjPsgsZR2uPQJxHIFvNE05rZQ_uER14UfmVgQ/exec";

        var data = {
            AQI: temp
        };
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: data
        });
        
 };
 window.addEventListener('load', function () {
    ttb();
});
window.addEventListener('load', function () {
    aqitong();
});
 window.addEventListener('load', function () {
    aqigio();
 });
window.addEventListener('load', function () {
    dubao();
});
window.addEventListener('load', function () {
    MINMAX();
});
