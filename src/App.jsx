import "./App.css"
import logo from "./assets/lion-head-png-logo-4.png"
import { useState } from 'react'
import { useEffect } from 'react'
import  Document  from "./components/dom.jsx"

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

  // Alert Showing
  useEffect(() => {
  if(showAlert){
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

// Weather 
  const fetchWeather = async ()=>{
  
  // Validation Check
    if (!weather.searchİnput.trim()) {
      setShowAlert({type : true, message : "⚠️ Lütfen geçerli bir şehir adı giriniz!"});
      setAlert({type : true, name : 'input'});
      return;
    }
    else if (weather.searchİnput.trim().length < 3) {
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

    
  // Fetch Valid Check
  if(!data.nearest_area || !data.current_condition || !isNaN(weather.searchİnput) || !data){
    setShowAlert({type : true , message : "⚠️ Geçersiz Şehir"});
    setAlert({type : true, name : 'error'});
    setAlert({type : true, name : 'input'});
    return;
  }
  setAlert({type : false , name : 'loading'});

  // Weather Values
  const {temp_C, windspeedKmph, humidity} = data.current_condition[0];
  
  const country = data.nearest_area[0].country[0].value
  const region = data.nearest_area[0].region[0].value
  const area  = data.nearest_area[0].areaName[0].value;
  
  const cityName = (country.toLowerCase() === "turkey") ||  (country.toLowerCase() === "united states of america") ? region : area;

    if(Normal(cityName) === Normal(weather.searchİnput)){
    
        setWeather({
          sehir : capitalizeCity(Normal(cityName)),
          ülke : country,
          sicak : temp_C,
          rüzgaR : windspeedKmph,
          neM : humidity
        })
    }
    else if(Normal(cityName) !== Normal(weather.searchİnput)){
     
        setWeather({
          sehir : `${capitalizeCity(Normal(weather.searchİnput))} / ${capitalizeCity(Normal(cityName))}`,
          ülke : country,
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
  logo={logo}/>
)


}

export default App