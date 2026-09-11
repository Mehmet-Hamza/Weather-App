import { useEffect, useRef, useState } from "react";

function Document({weather,
  setWeather,
  alert,
  showAlert,
  fetchWeather,
  List,
  logo,
  weatherValue
}){

let InputRef = useRef(null);

return (
  <>  

{/*   <!-- Custom Alert Notification Box --> */}
<div id="custom-alert" className= {showAlert.type === true ? "alert-box show" : "alert-box"}>
    
    <span className="alert-message">{showAlert.message}</span>
  </div>

      {/* HEADER SİDE */}
      <header className="app-header">
        <div className="header-content">
          <img style={{ width: '70px' }} src={logo} alt="Lion Weather App Logo"/>
          <h1 className="logo-title">Lion Weather</h1>
          <div className="header-icon-container">
          </div>
        </div>
      </header>
    {/* App Container */}
    <div className="app-container">
    {/* <!-- Search Card --> */}
    <div className="inputCard">
      <h2>Hava Durumu Sorgula</h2>
        <form onSubmit={(e) => { e.preventDefault(); fetchWeather(); }} id="search-form" className="search-box" noValidate>
          <input 
            ref={InputRef}
            className={alert.name === 'input' ? "input invalid" : "input"}
            onChange={(e) => {const weatherValue = e.target.value; setWeather({
              searchİnput : weatherValue,
              sehir : weather.sehir,
              ülke : weather.ülke,
              sicak : weather.sicak,
              rüzgaR : weather.rüzgaR,
              neM : weather.neM,
            });}}
            id="input" 
            type="text" 
            placeholder="Örn: İstanbul, London..." 
            required 
            autoComplete="off"
          />
          <button onClick={() => {InputRef.current.value = ""}} type="submit" className="input-btn" >Ara</button>
        </form>
        {/* Error Alert */}
        <div className = {alert.name === 'error' ? "errorCard show" : "errorCard"}>
          <h3>Aranan şehir bulunamadı ❌</h3>
        </div> 
    </div>

 {/* Conclusion Card */}
    <div className="main-content">
      {/*  Weather Conclusion Card */}
      <div className="result-card">
        <div className="location-info">
            <div>
          <h2 className="city">{weather.sehir ||'Şehir Seçin'} </h2>
          <h3 className="country">{(weather.ülke.toLowerCase() === "turkey" ? "Türkiye" : weather.ülke) || 'Ülke Bilgisi'}</h3>
            </div>
            {weather.sehir && (
             <> 
              <div className="İsDay">
                {weatherValue.day === 1 ? <img className="weatherStateIcon" src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png" alt="Sunny" /> : <img className="weatherStateIcon" src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Crescent%20moon/3D/crescent_moon_3d.png" alt="night"/>} 
              </div>

              {/* Analytics */}              
              <div className="analytics">  
                <span style={{display : 'flex', justifyContent : 'space-between' }} className="analyticsValue">Hissedilen Sıcaklık<strong>{`${Math.round(weatherValue.apparentTemp)} °C`}</strong></span>
                <span style={{display : 'flex', justifyContent : 'space-between' }} className="analyticsValue">Gün Doğuşu / Batımı<strong>{`${weatherValue.sunrise} / ${weatherValue.sunset}`}</strong></span>
                <span style={{display : 'flex', justifyContent : 'space-between' }} className="analyticsValue">Hava Kalitesi<strong>{weatherValue.weatherState <= 48 ? <p style={{color : 'lightgreen'}}>İyi</p> : weatherValue.weatherState >48 && weatherValue.weatherState <= 75 ? <p style={{color : 'yellow'}}>Orta </p>: <p style={{color : 'tomato'}}>Kötü</p>}</strong></span>
                </div>
              </> )}
        </div>

        {/* Details */}
        <div className="weather-details">
          <div className="detail-item">
            <span>Sıcaklık</span>
            <strong className="sicaklik">{weather.sicak}°C</strong>
          </div>
          <div className="detail-item">
            <span>Rüzgar Hızı</span>
            <strong className="rüzgar">{weather.rüzgaR} km/s</strong>
          </div>
          <div className="detail-item">
            <span>Nem Oranı</span>
            <strong className="nem">{weather.neM}%</strong>
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

<div className="sevenDaysWeather">
    <div className="sevenDayHeader"><h1 className="weatherHeader">7 Günlük Hava Durumu Tahmini {weather.sehir ? "-" : ""} {weather.sehir}</h1></div>

    {weatherValue.SevenDates && weatherValue.SevenDates.length > 0 && (
        <div className="weathers">
          {/* Card */}
          {
            weatherValue.SevenDates.map((dayName , index) => {
                return(
                    <div key={index} className="weatherCards">
                        <div className="days"><h3 className="day">{index === 0 ? "Bugün" : dayName}</h3></div>
                         <div className="weatherCard">
                                <img className = "weatherIcon" src={weatherValue.icon[index]} alt="Logo" />
                                <p className="stateWeahter">{weatherValue.weatherCode[index]}</p>
                                    <div className="tempValues">
                                        <p>{Math.round(weatherValue.maxTemp[index])}°C</p>
                                        <span>/</span>
                                        <p>{Math.round(weatherValue.minTemp[index])}°C</p>
                                    </div>
                        </div>
                    </div>
                )
            })
          }
          </div>)}

        </div>
  </div>
  

   {/* Loading Screen  */}
  
    <div className={alert.name === 'loading' ? "loadingDiv show" : "loadingDiv"}>
      
       <h2 className="loadingText" style={{ color: 'white' }}>Yükleniyor...</h2>
    </div>

    </>      
  )
}
export default Document