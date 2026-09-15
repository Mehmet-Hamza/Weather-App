
import { useEffect, useRef, useState } from "react";
import "./dom.css"

import  Header  from "./header.jsx"
import MainContent from "./MainContent.jsx"
import SevenDays from "./SevenDaysWeather.jsx"


function WeatherCard({weather,
  alert,
  showAlertType,
  showAlertMSG,
  List,
  weatherValue,
  searchBoxComponent
}){

return (
  <>  
{/*   <!-- Custom Alert Notification Box --> */}
<div id="custom-alert" className= {showAlertType === true ? "alert-box show" : "alert-box"}>
    <span className="alert-message">{showAlertMSG}</span>
</div>
      
  <Header/>
      
  <div className="app-container">    
    
      {searchBoxComponent} 
        <MainContent weather = {weather} weatherValue = {weatherValue} List = {List}/>
          <SevenDays weatherValue = {weatherValue} weather = {weather}/>

  </div>
  
   {/* Loading Screen  */}
    <div className={alert.name === 'loading' ? "loadingDiv show" : "loadingDiv"}>
      
       <h2 className="loadingText" style={{ color: 'white' }}>Yükleniyor...</h2>
    </div>

    </>      
  )
}
export default WeatherCard