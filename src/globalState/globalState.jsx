import { create } from "zustand"


export const WeatherStore = create((set) => ({
    weather : {
        searchInput : "",
        sehir : "",
        ülke  : "",
        sicak : "",
        rüzgaR : "",
        neM :  "" 
    },

    
    setWeather : (newValue) => set({weather : newValue}),

    setSearch : (Input) => set((state) => ({
        weather : {...state.weather , searchInput : Input}
    })),

    
    weatherValue : {
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
        timeZone : ""

    },

    setWeatherValue : (newWeatherValue) => set({weatherValue : newWeatherValue})


}))