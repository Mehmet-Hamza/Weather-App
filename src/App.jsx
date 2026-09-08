import "./App.css"
import logo from "./assets/lion-head-png-logo-4.png"
import { useState } from 'react'
import { useEffect } from 'react'

function Dom() {
  /* const [weather , setWeather] = useState([{

  }]) */

  const [loading, setLoading] = useState(false);
  const [searchİnput, setSearchInput] = useState('');
  const [city , setCity] = useState('');
  const [country , setCountry] = useState('');
  const [sicaklik , setSicaklik] = useState('');
  const [rüzgar , setRüzgar] = useState('');
  const [nem , setNem] = useState('');
  
  
  const [showAlert, setShowAlert] = useState({type : false , message : ''});
  const [errorCard, setErrorCard] = useState(false);
  const [inputValid, setİnputValid] = useState(false);

  const [List , setList] = useState([]);

  // Alert Showing
  useEffect(() => {
  if(showAlert){
    const timer = setTimeout(() => {
      setShowAlert({type : false , message : ''});
      setErrorCard(false);
      setİnputValid(false)
    }, 2500);
    return () => clearTimeout(timer);
  }
     
  }, [showAlert]);

  
  useEffect(() => {
            console.log(List.length)

          }, [List])

// Weather 
  const fetchWeather = async ()=>{
  
  // Validation Check
    if (!searchİnput.trim()) {
      setShowAlert({type : true, message : "⚠️ Lütfen geçerli bir şehir adı giriniz!"});
      
      setİnputValid(true);
      return;
    }
    else if (searchİnput.trim().length < 3) {
      setShowAlert({type : true , message : "Girilen Karakter Sayısı 3 ten az Olamaz !"});
      setErrorCard(true);
      setİnputValid(true);
      return;
    }

    try{
      setLoading(true);  
      const res = await fetch(`https://wttr.in/${encodeURIComponent(searchİnput.trim())}?format=j1`);
      const data = await res.json();
      console.log(data);

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


  // Fetch Valid Check
  console.log(searchİnput === Number());
  if(!data.nearest_area || !data.current_condition || !isNaN(searchİnput) || !data){
    setShowAlert({type : true , message : "⚠️ Geçersiz Şehir"});
    setErrorCard(true);
    setLoading(false);
    setİnputValid(true);
    return;
  }
  setLoading(false);

  // Weather Values
  const {temp_C, windspeedKmph, humidity} = data.current_condition[0];
  
  setSicaklik(temp_C);
  setRüzgar(windspeedKmph);
  setNem(humidity);

  const country = data.nearest_area[0].country[0].value
  const region = data.nearest_area[0].region[0].value
  const area  = data.nearest_area[0].areaName[0].value;
  
  const cityName = country.toLowerCase() === "turkey" ? region : area;

    if(Normal(cityName) === Normal(searchİnput)){
      setCity(capitalizeCity(Normal(`${cityName}`)));
    }
    else if(Normal(cityName) !== Normal(searchİnput)){
      setCity(capitalizeCity(Normal(`${searchİnput} / ${cityName}`)));
    }

    setCountry(country);
    
  // Last Enter Five City
  if (!List.includes(Normal(searchİnput.trim()))) {
    setList((prevList => [capitalizeCity(Normal(cityName)) , ...prevList].slice(0,5)));
  }


  }
  catch(error){
    console.error('Hata:', error);
    setShowAlert({type : true , message : "İşlem Hatası Tekrar Deneyin"});
    setErrorCard(true);
    setLoading(false);
    return;
  }
  
}

  return (
  <>  

{/*   <!-- Custom Alert Notification Box --> */}
<div id="custom-alert" className= {showAlert.type === true ? "alert-box show" : "alert-box"}>
    
    <span className="alert-message">{showAlert.message}</span>
  </div>

      {/* HEADER SİDE */}
      <header className="app-header">
        <div className="header-content">
          <img style={{ width: '100px' }} src={logo} alt="Lion Weather App Logo"/>
          <h1 className="logo-title">Lion Weather</h1>
          <div className="header-icon-container">
          </div>
        </div>
      </header>
    {/* App Container */}
    <div className="app-container">
    {/* <!-- Search Card --> */}
    <div className="inputCard">
      <h2>Şehir / İlçe Hava Durumu Sorgula</h2>
        <form onSubmit={(e) => { e.preventDefault(); fetchWeather(); }} id="search-form" className="search-box" noValidate>
          <input 
            className={inputValid ? "input invalid" : "input"}
            onChange={(e) => {const weatherValue = e.target.value; setSearchInput(weatherValue);}}
            id="input" 
            type="text" 
            placeholder="Örn: İstanbul, London..." 
            required 
            autoComplete="off"
          />
          <button type="submit" className="input-btn" >Ara</button>
        </form>
        {/* Error Alert */}
        <div className = {errorCard ? "errorCard show" : "errorCard"}>
          <h3>Aranan şehir bulunamadı ❌</h3>
        </div> 
    </div>

 {/* Conclusion Card */}
    <div className="main-content">
      {/*  Weather Conclusion Card */}
      <div className="result-card">
        <div className="location-info">
          <h2 className="city">{city ||'Şehir Seçin'} </h2>
          <h3 className="country">{(country.toLowerCase() === "turkey" ? "Türkiye" : country) || 'Ülke Bilgisi'}</h3>
        </div>

        {/* Details */}
        <div className="weather-details">
          <div className="detail-item">
            <span>Sıcaklık</span>
            <strong className="sicaklik">{sicaklik}°C</strong>
          </div>
          <div className="detail-item">
            <span>Rüzgar Hızı</span>
            <strong className="rüzgar">{rüzgar} km/s</strong>
          </div>
          <div className="detail-item">
            <span>Nem Oranı</span>
            <strong className="nem">{nem}%</strong>
          </div>
        </div>
      </div>

      {/* Last Calls */}
      <div className="lastFiveCity">
        <h3>Son Arananlar</h3>
        <ul className="ul">
          
          {List.length === 0 ? (
             <li style={{ color: '#64748b', fontStyle: 'italic' }}>Henüz arama yapılmadı</li>
          )
          : List.map((city, index) => (

              <li key={index} style={{ color: 'whiteSmoke'}}>{city.length === 0 ? "Henüz Arama Yapılmadi" : `${index + 1} - ${city}`}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
    
   {/* Loading Screen  */}
     <div className={loading ? "loadingDiv show" : "loadingDiv"}>
       <h2 className="loadingText" style={{ color: 'white' }}>Yükleniyor...</h2>
     </div>
   
  </>      
  )

}

export default Dom