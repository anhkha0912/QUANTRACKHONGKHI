var mapm25 = [], mapm10 = [];
var today = new Date();
var second = today.getSeconds();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
var time = today.getHours();
var minute = today.getMinutes();
var fulltime = time+':'+minute+':'+second;
var datetime = date+' '+fulltime;
function tinhaqi(){
    var today = new Date();
    var second = today.getSeconds();
    var minute = today.getMinutes();
    if(second == 59 && minute == 59 ){
        AQIPM25();
        AQIPM10();
        AQICO();
        
    }
    setTimeout("tinhaqi()",1000);
}
window.addEventListener('load', function () {
    tinhaqi();
});
    function AQIPM25(){
        mapm25 = [];
        firebase.database().ref('CSAQI/PM25').limitToLast(12).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            var pm25 = childSnapshot.val().tb;
            mapm25.push(pm25);        
        });
        mapm25.reverse();
        var ts = nowcast(mapm25);
        var gt  = gtnowcast(mapm25);
        var all = checkPM25(gt.tong);
        var gtpm25 = Math.round(all.aqipm25);
        firebase.database().ref('AQI').child('PM25').push({aqi:gtpm25});
        });
    }
    function AQIPM10(){
        mapm10 = [];
        firebase.database().ref('CSAQI/PM10').limitToLast(12).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            var pm10 = childSnapshot.val().tb;
            mapm10.push(pm10);        
        });
        mapm10.reverse();
        var ts = nowcast(mapm10);
        var gt  = gtnowcast(mapm10);
        var all = checkPM10(gt.tong);
        var gtpm10 = Math.round(all.aqipm10);
        firebase.database().ref('AQI').child('PM10').push({aqi:gtpm10});
        });
    };
    function AQICO(){
        var co;
        var gtt;
        firebase.database().ref('CSAQI/CO').limitToLast(1).on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot){
            co = childSnapshot.val().tb;
            gtt = 0.0409*co*28.01*1000; 
        });
        var all = checkCO(gtt);
        var gtco = Math.round(all.aqico);
        firebase.database().ref('AQI').child('CO').push({aqi:gtco});
        });
    };

    function tinhaqingay(){
        var today = new Date();
        var time = today.getHours();
        var second = today.getSeconds();
        var minute = today.getMinutes();
        if(second == 59 && minute == 59 && time == 0 ){
            AQIPM25NGAY();
            AQIPM10NGAY();
            AQICONGAY();
        }
        setTimeout("tinhaqingay()",1000);
    }
    window.addEventListener('load', function () {
        tinhaqingay();
    });
    function AQIPM25NGAY(){
        mang25 = [];
            firebase.database().ref('CSAQI/PM25').limitToLast(24).on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                    var pm25 = childSnapshot.val().tb;
                    mang25.push(pm25);        
                });
                mang25.reverse();
                var gt = tinh(mang25);
                var all = checkPM25(gt);
                var gtpm25 = Math.round(all.aqipm25);
            firebase.database().ref('AQINGAY').child('PM25').push({aqingay:gtpm25});
        });
    }
    function AQIPM10NGAY(){
        mang10 = [];
            firebase.database().ref('CSAQI/PM10').limitToLast(24).on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                    var pm10 = childSnapshot.val().tb;
                    mang10.push(pm10);        
                });
                mang10.reverse();
                var gt = tinh(mang10);
                var all = checkPM10(gt);
                var gtpm10 = Math.round(all.aqipm10);
                console.log(gtpm10);
            firebase.database().ref('AQINGAY').child('PM10').push({aqingay:gtpm10});
        });
    }
    function AQICONGAY(){
        mangco = [];
            firebase.database().ref('CSAQI/CO').limitToLast(24).on('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot){
                    var co = childSnapshot.val().tb;
                    var gtt = 0.0409*co*28.01*1000; 
                    mangco.push(gtt);        
                });
                mangco.reverse();
                var gt = Math.max.apply(Math, mangco);
                var all = checkCO(gt);
                var gtco = Math.round(all.aqico);
            firebase.database().ref('AQINGAY').child('CO').push({aqingay:gtco});
        });
    }
    
    //console.log(mang.ma.length);
    // var x=mang.length;
    // console.log(mang);
    // console.log(x);
    // TRỌNG SỐ
    function nowcast(pm){
        var cmax = Math.max.apply(Math, pm); 
        var cmin = Math.min.apply(Math, pm);
        var x;
        var w = Math.round((cmin/cmax)*100.0)/100.0;
        if(w <= 1/2){
            x = 1/2;
        }
        else{
            x = w;
        }
        var obj = {
            x:x
        };
        return obj;
    }
   function gtnowcast(a){
       var all = nowcast(a)
        var sum = 0;
        var sum1 = 0;
        var tong = 0;
        if(all.x > 1/2){
            for(i=0;i<a.length;i++){
            sum += (all.x**(i))*(a[i])
            sum1 += all.x**i;
            }
            tong  = Math.round((sum/sum1)*10.0)/10.0;
        }
        else{
            for(i=0;i<a.length;i++){
                tong += (1/2)**(i+1)*a[i];
            }
            tong  = Math.round(tong*10.0)/10.0;
        }
       
        var obj = {
           tong:tong
        };
        return obj;
   }
   
   function checkPM25(temp){
    var bp,bp1,i,i1;
    if(temp > 0 && temp <25){
    	bp=0;
        bp1=25;
        i=0;
        i1=50;
    }else if(temp >=25 && temp <50){
    	bp=25;
        bp1=50;
        i=50;
        i1=100;
    }else if(temp >=50 && temp <80){
    	bp=50;
        bp1=80;
        i=100;
        i1=150;
    }else if(temp >=80 && temp <150){
    	bp=80;
        bp1=150;
        i=150;
        i1=200;
    }else if(temp >=150 && temp <250){
    	bp=150;
        bp1=250;
        i=200;
        i1=300;
    }else if(temp >=250 && temp <350){
    	bp=250;
        bp1=350;
        i=300;
        i1=400;
    }else if(temp >=350 && temp >=500){
    	bp=350;
        bp1=500;
        i=400;
        i1=500;
    }
    var aqipm25=(i1-i)/(bp1-bp)*(temp-bp)+i;
    var obj = {
        aqipm25:aqipm25
    };
    return obj;
}
function checkPM10(temp){
    var bp,bp1,i,i1;
    if(temp > 0 && temp <50){
    	bp=0;
        bp1=50;
        i=0;
        i1=50;
    }else if(temp >=50 && temp <150){
    	bp=50;
        bp1=150;
        i=50;
        i1=100;
    }else if(temp >=150 && temp <250){
    	bp=150;
        bp1=250;
        i=100;
        i1=150;
    }else if(temp >=250 && temp <350){
    	bp=250;
        bp1=350;
        i=150;
        i1=200;
    }else if(temp >=350 && temp <420){
    	bp=350;
        bp1=420;
        i=200;
        i1=300;
    }else if(temp >=420 && temp <500){
    	bp=420;
        bp1=500;
        i=300;
        i1=400;
    }else if(temp >=500 && temp >=600){
    	bp=500;
        bp1=600;
        i=400;
        i1=500;
    }
    var aqipm10=(i1-i)/(bp1-bp)*(temp-bp)+i;
    var obj = {
        aqipm10:aqipm10
    };
    return obj;
}
function checkCO(tmp){
	var temp=0.0409*tmp*28.01;
    var bp,bp1,i,i1;
    if(temp > 0 && temp <10000){
    	bp=0;
        bp1=10000;
        i=0;
        i1=50;
    }else if(temp >=10000 && temp <30000){
    	bp=10000;
        bp1=30000;
        i=50;
        i1=100;
    }else if(temp >=30000 && temp <45000){
    	bp=30000;
        bp1=45000;
        i=100;
        i1=150;
    }else if(temp >=45000 && temp <60000){
    	bp=45000;
        bp1=60000;
        i=150;
        i1=200;
    }else if(temp >=60000 && temp <90000){
    	bp=60000;
        bp1=90000;
        i=200;
        i1=300;
    }else if(temp >=90000 && temp <120000){
    	bp=90000;
        bp1=120000;
        i=300;
        i1=400;
    }else if(temp >=120000 && temp >=150000){
    	bp=120000;
        bp1=150000;
        i=400;
        i1=500;
    }
    var aqico=(i1-i)/(bp1-bp)*(temp-bp)+i;
    var obj = {
        aqico:aqico
    };
    return obj;
}
