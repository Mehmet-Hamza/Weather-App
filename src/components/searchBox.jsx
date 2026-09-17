import { useRef } from 'react';
import { WeatherStore  } from '../globalState/globalState';
export default function SearchBox({fetchWeather , alert , setWeather}){


const setSearch = WeatherStore((state) => state.setSearch)
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
            onChange={(e) => {setSearch(e.target.value)}}
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
    )
}