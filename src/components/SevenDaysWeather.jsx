function SevenDays({weatherValue, weather}){

    const { sehir } = weather;
    const {SevenDates , icon , weatherCode, maxTemp , minTemp} = weatherValue;
    
    return(
        <div className="sevenDaysWeather">
    <div className="sevenDayHeader"><h1 className="weatherHeader">7 Günlük Hava Durumu Tahmini {sehir ? "-" : ""} {sehir}</h1></div>

    {SevenDates && SevenDates.length > 0 && (
        <div className="weathers">
          {/* Card */}
          {
           SevenDates.map((dayName , index) => {
                return(
                    <div key={index} className="weatherCards">
                        <div className="days"><h3 className="day">{index === 0 ? "Bugün" : dayName}</h3></div>
                         <div className="weatherCard">
                                <img className = "weatherIcon" src={icon[index]} alt="Logo" />
                                <p className="stateWeahter">{weatherCode[index]}</p>
                                    <div className="tempValues">
                                        <p>{Math.round(maxTemp[index])}°C</p>
                                        <span>/</span>
                                        <p>{Math.round(minTemp[index])}°C</p>
                                    </div>
                        </div>
                    </div>
                )
            })
          }
          </div>)}

        </div>
    )
}
export default SevenDays