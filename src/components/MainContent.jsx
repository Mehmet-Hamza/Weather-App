import { WeatherStore } from "../globalState/globalState";
function MainContent({List}) {

  const weather = WeatherStore((state) => state.weather)
  const  weatherValue = WeatherStore((state) => state.weatherValue)

    const { sehir , ülke , sicak , rüzgaR , neM} = weather;
    const { apparentTemp , sunrise , sunset , weatherState, timeZone  } = weatherValue;
  
    return(
        <div className="main-content">
      {/*  Weather Conclusion Card */}
      
      <div className="result-card">
      {sehir && (
        <div key={sehir} className="localClock">
          <p className="localText">Mevcut Durum </p>
          <p className="localText">Yerel Saati : {timeZone} </p>
          </div> )}
        <div  className="location-info">
            <div>
          <h2 className="city">{sehir ||'Şehir Seçin'} </h2>
          <h3 className="country">{ülke || 'Ülke Bilgisi'}</h3>
            </div>
            {sehir && (
             <> 
              <div className="İsDay">
                {weatherValue.day === 1 ? <img className="weatherStateIcon" src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Sun/3D/sun_3d.png" alt="Sunny" /> : <img className="weatherStateIcon" src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Crescent%20moon/3D/crescent_moon_3d.png" alt="night"/>} 
              </div>

              {/* Analytics */}              
              <div className="analytics">  
                <span style={{display : 'flex', justifyContent : 'space-between' }} className="analyticsValue">Hissedilen Sıcaklık<strong>{`${Math.round(apparentTemp)} °C`}</strong></span>
                <span style={{display : 'flex', justifyContent : 'space-between' }} className="analyticsValue">Gün Doğuşu / Batımı<strong>{`${sunrise} / ${sunset}`}</strong></span>
                <span style={{display : 'flex', justifyContent : 'space-between' }} className="analyticsValue">Hava Kalitesi<strong>{weatherState <= 48 ? <p style={{color : 'lightgreen'}}>İyi</p> : weatherState >48 && weatherState <= 75 ? <p style={{color : 'yellow'}}>Orta </p>: <p style={{color : 'tomato'}}>Kötü</p>}</strong></span>
                </div>
              </> )}
        </div>

        {/* Details */}
        <div className="weather-details">
          <div className="detail-item">
            <span>Sıcaklık</span>
            <strong className="sicaklik">{Math.round(sicak)}°C</strong>
          </div>
          <div className="detail-item">
            <span>Rüzgar Hızı</span>
            <strong className="rüzgar">{Math.round(rüzgaR)} km/s</strong>
          </div>
          <div className="detail-item">
            <span>Nem Oranı</span>
            <strong className="nem">{neM}%</strong>
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
    )
}
export default MainContent