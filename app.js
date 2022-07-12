const getData = async (location)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=31a9dd589649662940537fe79e063fc3` ; 
     const dataWeather = await fetch(url) ; 
     return dataWeather.json();
}

const render = (result)=>{
    console.log(result)
    const elementContent = document.getElementById("content");
    elementContent.innerHTML = "" ;
    const elelmentContentContainer = document.createElement("div") ; 
    const elementCoverClound= document.createElement("p") ; 
    const elementTemp = document.createElement("p") ; 
    const elementTempMin = document.createElement("p") ; 
    const elementTempMax = document.createElement("p");
    const elementStatus   = document.createElement("p");
    const elementWind = document.createElement("p") ; 
    const elementSunrise = document.createElement("p") ; 
    const elementSunset = document.createElement("p");
    const elementThumidity = document.createElement("p");
    const {main , clouds, sys , weather , wind} = result ; 
    const {temp , temp_max , temp_min , humidity } =main ;
    const {sunrise , sunset} = sys ; 
    const {description} = weather[0] ; 
    const {all} = clouds ; 
    const {speed} = wind; 
    let sunriseFix = sunrise ; 
    for(var i = sunrise.toString().length ;  i < 13 ; i++){
        sunriseFix = sunriseFix*10 ; 
    }; 
    sunriseFix = new Date(sunriseFix) ; 
    sunriseFix = `${sunriseFix.getHours() } : ${sunriseFix.getMinutes() } Am`
    let sunsetFix = sunset ; 
    for(var i = sunset.toString().length ;  i < 13 ; i++){
        sunsetFix = sunsetFix*10 ; 
        console.log("first")
    }; 
    sunsetFix = new Date(sunsetFix) ; 
    sunsetFix = `${sunsetFix.getHours() } : ${sunsetFix.getMinutes() } Pm `
    elementCoverClound.innerHTML = "Cover Clounds : " + all + " %" ;
    elementTemp.innerHTML = "Temperature  : " +  Math.round((temp-273.15)) + "C" ; 
    elementTempMin.innerHTML = "Temperature in Max : " +  Math.round((temp_max-273.15)) + "C" ;
    elementTempMax.innerHTML = "Temperature in Min  :" +  Math.round((temp_min-273.15)) + "C" ; 
    elementStatus.innerHTML =  "Weather : " + description ; 
    elementWind.innerHTML = "Speed's Wind : " +  speed ; 
    elementSunset.innerHTML = "Sunset : " +   sunsetFix ; 
    elementSunrise.innerHTML = "Sunrise : " + sunriseFix;
    elementThumidity.innerHTML = "Humidity : " + humidity + "%" ; 
    elelmentContentContainer.append(elementCoverClound
         ,elementTemp ,
         elementTempMax,
         elementTempMin, 
         elementStatus ,
          elementWind  , 
          elementSunrise , 
          elementSunset,
          elementThumidity , 
           )
           elementContent.append(elelmentContentContainer)

}
const renderError = (valueSearch)=>{
    const elementContent = document.getElementById("content");
    elementContent.innerHTML = "" ;
    const elementErrMess = document.createElement("h1") ; 
    elementErrMess.setAttribute("class" , "error") ; 
    elementErrMess.innerHTML = ` ${valueSearch} Not Found `
    elementContent.append(elementErrMess)
}
//getData().then(result  => render(result));

const elementSubmit = document.getElementById("submit") ; 
elementSubmit.onclick = (e) => {
    e.preventDefault() ; 
    const elementWhere = document.getElementById("where") ;
     const valueSearch = document.getElementById("location").value;
     elementWhere.innerHTML= "Weather in " + valueSearch;
     getData(valueSearch).then(result  => render(result)).catch(()=>{
        renderError(valueSearch)
     });
}
getData("ha noi").then(result  => render(result))