import "./App.css"
import logo from "./assets/lion-head-png-logo-4.png"
import { useState } from 'react'
import { useEffect } from 'react'
import  Document  from "./components/dom.jsx"
import { GetWeatherIcon  } from "./components/weatherIcons.jsx"


function App() {
  
  const [weather , setWeather] = useState({
    searchİnput : "",
    sehir : "",
    ülke  : "",
    sicak : "",
    rüzgaR : "",
    neM :  "" 
  }) 
  const [alert , setAlert] = useState({type : false, name : null })
  const [showAlert, setShowAlert] = useState({type : false , message : ''});
  const [List , setList] = useState([]);
  const [weatherValue , setWeatherValue] = useState({
    maxTemp : "",
    minTemp : "",
    SevenDates : "",
    weatherCode : "",
    icon : "",
    apparentTemp : "",
    sunrise  : "",
    sunset : "",
    weatherState : "",
    day : "",
  })

  // Alert Showing
  useEffect(() => {
  if(showAlert.type){
    const timer = setTimeout(() => {
      setShowAlert({type : false , message : ''});
      setAlert({type : false , name : null});
    }, 2000);
    return () => clearTimeout(timer);
  }
     
  }, [showAlert]);

  
const Normal = (string) => {
  return string.toLocaleLowerCase('tr-TR')
    .replace(/İ/g , 'i')
    .replace(/I/g , 'i')
    .replace(/ı/g , 'i')
    .replace(/ö/g , 'o' )
    .replace(/ü/g , 'u')
    .replace(/ş/g , 's')
    .replace(/ç/g , 'c')
    .replace(/ğ/g , 'g')
  }

const capitalizeCity = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR'))
    .join(' ');
  };

  const getDay = (date) =>{
    const dating = new Date(date);
    return dating.toLocaleDateString('tr-TR' , {weekday : 'long'});
  }

  const formatTime = (format) => {
    if(!format) return "";
    return format.split("T")[1];
  }
  const weatherStatus = (code) => {

    if(code === 0){
      return "Güneşli";
    }
    else if(code === 1 || code === 2){
      return "Az/Parçalı Bulutlu";
      
    }
    else if(code === 3){
      return "Kapalı/Bulutlu";
      
    }
    else if(code === 45 || code === 48){
      return "Sisli";
      
    }
    else if(code === 51 || code === 53 || code === 55){
      return "Hafif Yağmurlu";
      
    }
    else if(code === 61 || code === 63 || code === 65){
      return "Yağmurlu Sağanak";
      
    }
    else if(code === 71 || code === 73 || code === 75){
      return "Karlı";
      
    }
    else if(code === 80 || code === 81 || code === 82 ){
      return "Şiddetli Yağmurlu";
      
    }
    else if(code === 95 || code === 96 || code === 99){
      return "Fırtınalı/Gökgürültülü";
      
    }
    return {text , iconUrl}
  }

// Weather 
  const fetchWeather = async ()=>{
  
  // Validation Check
    if (!weather.searchİnput.trim()) {
      setShowAlert({type : true, message : "⚠️ Lütfen geçerli bir şehir adı giriniz!"});
      setAlert({type : true, name : 'input'});
      return;
    }
    else if (weather.searchİnput.trim().length < 4) {
      setShowAlert({type : true , message : "Girilen Karakter Sayısı 3 ten az Olamaz !"});
      setAlert({type: true , name : 'error'});
      setAlert({type : true , name : 'input'});
      return;
    }

    try{
      setAlert({type : true , name : 'loading'});  
      const res = await fetch(`https://wttr.in/${encodeURIComponent(weather.searchİnput.trim())}?format=j1`);
      const data = await res.json();
      console.log(data);

      // GeoCoding Api
      const resNew = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(weather.searchİnput.trim())}&count=1&language=tr&format=json`)
      const dataNew = await resNew.json();

      const {latitude , longitude , name , country } = dataNew.results[0];
      

      const realResApi = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&current=precipitation,rain,is_day,weather_code,wind_speed_10m,temperature_2m,apparent_temperature,is_day,wind_direction_10m&timezone=auto`)
      const realData = await  realResApi.json();
      console.log(realData);

    
  // Fetch Valid Check
  if(!data.nearest_area || !data.current_condition || !isNaN(weather.searchİnput) || !data){
    setShowAlert({type : true , message : "⚠️ Geçersiz Şehir"});
    setAlert({type : true, name : 'error'});
    setAlert({type : true, name : 'input'});
    return;
  }
  setAlert({type : false , name  :null}); 

  // Weather Values
  const {temp_C, windspeedKmph, humidity} = data.current_condition[0];
  
  const countrys = data.nearest_area[0].country[0].value
  const region = data.nearest_area[0].region[0].value
  const area  = data.nearest_area[0].areaName[0].value;

  setWeatherValue({
    maxTemp : realData.daily.temperature_2m_max,
    minTemp : realData.daily.temperature_2m_min,
    SevenDates : realData.daily.time.map((date) => getDay(date)),
    weatherCode : realData.daily.weather_code.map((code) => weatherStatus(code)),
    icon : realData.daily.weather_code.map((code) => GetWeatherIcon(code)),
    apparentTemp : realData.current.apparent_temperature,
    sunrise : formatTime(realData.daily.sunrise[0]),
    sunset : formatTime(realData.daily.sunset[0]),
    weatherState : realData.daily.weather_code[0],
    day : realData.current.is_day
  })
  
  const cityName = (countrys.toLowerCase() === "turkey") ||  (countrys.toLowerCase() === "united states of america") ? region : area;

    if(Normal(cityName) === Normal(weather.searchİnput)){
    
        setWeather({
          sehir : capitalizeCity(Normal(cityName)),
          ülke : countrys,
          sicak : temp_C,
          rüzgaR : windspeedKmph,
          neM : humidity
        })
    }
    else if(Normal(cityName) !== Normal(weather.searchİnput)){
     
        setWeather({
          sehir : `${capitalizeCity(Normal(weather.searchİnput))} / ${capitalizeCity(Normal(cityName))}`,
          ülke : countrys,
          sicak : temp_C,
          rüzgaR : windspeedKmph,
          neM : humidity
          
      })
    }
    
  // Last Enter Five City
  if (!List.includes(Normal(weather.searchİnput.trim()))) {
    setList((prevList => [capitalizeCity(Normal(`${weather.searchİnput}`)) , ...prevList].slice(0,5)));
  }

  }
  catch(error){
    
    setShowAlert({type : true , message : "İşlem Hatası Tekrar Deneyin"});
    setAlert({type : true , name : 'error'})
    return;
  }
  
}

return(
  <Document  weather={weather}
  setWeather={setWeather}
  alert={alert}
  showAlert={showAlert}
  fetchWeather={fetchWeather}
  List={List}
  logo={logo}
  weatherValue={weatherValue}
  />
)


}

export default App