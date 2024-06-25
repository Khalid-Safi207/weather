const apiKey = 'f99504700885d9ef322944d514fb5536';
let lat;
let lon;
// Get Element Than Html File
let day = document.querySelector(".day");
let dateEl = document.querySelector(".date");
let img = document.querySelector('.img');
let rDeg = document.querySelector(".r-deg");
let statue = document.querySelector('.statue');
let inp = document.getElementById('input');
let btn = document.getElementById('btn');
let name = document.querySelector('.name');
let temp = document.querySelector('.temp');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
// Get Coordinats
window.addEventListener('load',function(){
    if(this.navigator.geolocation){
        this.navigator.geolocation.getCurrentPosition(pos => {
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
           
        })
    }
})
btn.addEventListener('click',function(){

    let p = new Promise(function(resolve,reject){
        document.body.className = 'dot-spin'
        setTimeout(function(){
            if(inp.value.trim()){
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inp.value}&appid=${apiKey}`).then(res=>res.json()).then(function(data){
                    getData(data);
                    inp.value='';

                    resolve();
                }).catch(()=>{
                    reject()
                })
            }
            else{

                reject()
            }
        },2000)
    })
   p.then(()=>{
    document.body.className = ""
    inp.classList.remove('error')
   }).catch(()=>{
    inp.classList.add('error')
    inp.value='';
   })
})

// pro
    let p = new Promise(function(resolve,reject){
        document.body.className = 'dot-spin'
        setTimeout(function(){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(res=>res.json()).then(function(data){
                getData(data);
            });
            resolve();
        },2000)
    })
// Get Data
function getData(data){
    console.log(data);
    setDate()
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    let tempValue =  Math.floor(data.main.temp - 273) + "<sup>o</sup> C";
    rDeg.innerHTML = tempValue;
    statue.innerHTML = data.weather[0].description;
    name.innerHTML = data.name;
    temp.innerHTML = tempValue;
    wind.innerHTML = data.wind.speed +"km / h";
    humidity.innerHTML = String(data.main.humidity) + "%";
}
// Promise End
p.then(()=>{
    document.body.className = '';
})

// Set Date
function setDate(){
    var days = [
        "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
      ];
        let date = new Date();
        let dayOfWeek = date.getDay();
        let englishDayName = days[dayOfWeek];
        day.innerHTML = englishDayName;
    
        let months = [
            "January", 
            "February", 
            "March", 
            "April", 
            "May", 
            "June", 
            "July", 
            "August", 
            "September", 
            "October", 
            "November", 
            "December"
          ];
        dateEl.innerHTML = date.getDate()+" "+months[date.getMonth()]+" "+ date.getFullYear()
          
}