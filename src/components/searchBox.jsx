import { useRef , useState} from 'react'
export default function SearchBox({fetchWeather , alert , weather , setWeather}){

let InputRef = useRef(null);

function click(){
    fetchWeather();
}

    return(
    <div className="inputCard">
     
      <h2>Hava Durumu Sorgula</h2>
        <form onSubmit={(e) => { e.preventDefault(); click() }} id="search-form" className="search-box" noValidate>
          <input 
            ref={InputRef}
            className={alert.name === 'input' ? "input invalid" : "input"}
            onChange={(e) => {const weatherValue = e.target.value; setWeather((prev) => ({
              searchİnput : weatherValue,
              sehir : prev?.sehir,
              ülke : prev?.ülke,
              sicak : prev?.sicak,
              rüzgaR : prev?.rüzgaR,
              neM : prev?.neM,
            }));}}
            id="input" 
            value={weather?.searchİnput || ""}
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
    )
}