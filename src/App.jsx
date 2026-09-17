import "./App.css"
import { useState } from 'react'
import { useEffect } from 'react'
import  WeatherCard  from "./components/dom.jsx"
import { GetWeatherIcon  } from "./components/weatherIcons.jsx"
import SearchBox from "./components/searchBox.jsx"
import { Normal , capitalizeCity, getDay , formatTime , localTime } from "./Utils/cityHelpers.js"
import { weatherStatus } from "./Utils/weatherStatus.js"
import { Routes , Route} from 'react-router-dom'
import { WeatherStore } from "./globalState/globalState.jsx"

function App() {

  let searchInput = WeatherStore((state) => state.weather.searchInput)
  const setWeather = WeatherStore((state) => state.setWeather)
  const setWeatherValue = WeatherStore((state) => state.setWeatherValue)
    

  const [alert , setAlert] = useState({type : false, name : null })
  const [showAlert, setShowAlert] = useState({type : false , message : ''});
  const [List , setList] = useState([]);

  
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


// Weather App 
  const fetchWeather = async ()=>{
  
  // Validation Check
    if (!searchInput?.trim()) {
      setShowAlert({type : true, message : "⚠️ Lütfen geçerli bir şehir adı giriniz!"});
      setAlert({type : true, name : 'input'});
      return;
    }
    else if (searchInput.trim().length < 3) {
      setShowAlert({type : true , message : "Girilen Karakter Sayısı 3 ten az Olamaz !"});
      setAlert({type: true , name : 'error'});
      setAlert({type : true , name : 'input'});
      return;
    }

    // Manage
    try{
      setAlert({type : true , name : 'loading'});
     
      // GeoCoding Api & New Api
      const resNew = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchInput.trim())}&count=1&language=tr&format=json`)
      const dataNew = await resNew.json();
  
      const {latitude , longitude} = dataNew.results[0];

      const realResApi = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset&current=precipitation,rain,is_day,weather_code,relative_humidity_2m,wind_speed_10m,temperature_2m,apparent_temperature,is_day,wind_direction_10m&timezone=auto`)
      const realData = await  realResApi.json();
      console.log(realData);

    
  // Fetch Valid Check
  if(!dataNew.results[0].admin1 || !isNaN(searchInput) || capitalizeCity(Normal(searchInput.trim())) !== capitalizeCity(Normal(dataNew.results[0].name))){
    setShowAlert({type : true , message : "⚠️ Geçersiz Şehir"});
    setAlert({type : true, name : 'error'});
    setAlert({type : true, name : 'input'});
    return;
  }
  setAlert({type : false , name  :null}); 

  // Weather Values
  const {temperature_2m , wind_speed_10m, relative_humidity_2m } = realData.current;

  const countrys = dataNew.results[0].country
  const region = dataNew.results[0].name

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
    day : realData.current.is_day,
    timeZone : localTime(realData.timezone)
    
  })

  setWeather({
      sehir : capitalizeCity(Normal(region)),
      ülke : countrys,
      sicak : temperature_2m,
      rüzgaR : wind_speed_10m,
      neM : relative_humidity_2m
    })
    
  // Last Enter Five City
  if (!List.includes(Normal(searchInput.trim()))) {
    setList((prevList => [capitalizeCity(Normal(`${searchInput}`)) , ...prevList].slice(0,5)));
  }

  }
  catch(error){
    console.log(error)
    setShowAlert({type : true , message : "İşlem Hatası Tekrar Deneyin"});
    setAlert({type : true , name : 'error'})
    return;
  }
  
}

return(
<>  

<Routes>
    <Route path="/" element={<WeatherCard 
  alert={alert}
  showAlertType={showAlert.type}
  showAlertMSG = {showAlert.message}
  List={List}
  
  
  searchBoxComponent = {<SearchBox fetchWeather = {fetchWeather} alert = {alert} setWeather={setWeather}/>}
  />}/>
  <Route path="*" element = {<h1>Sayfa Bulunamadı</h1>}/>
  </Routes>
 
    
</> 
)

}

export default App