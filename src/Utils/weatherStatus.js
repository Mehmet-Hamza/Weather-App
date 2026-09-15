export const weatherStatus = (code) => {

    if(code === 0){
      return "Güneşli";
    }
    else if(code === 1 || code === 2){
      return "Az/Parçalı Bulutlu";
      
    }
    else if(code === 3){
      return "Kapalı/Bulutlu";
      
    }
    else if(code === 45 || code === 48){
      return "Sisli";
      
    }
    else if(code === 51 || code === 53 || code === 55){
      return "Hafif Yağmurlu";
      
    }
    else if(code === 61 || code === 63 || code === 65){
      return "Yağmurlu Sağanak";
      
    }
    else if(code === 71 || code === 73 || code === 75){
      return "Karlı";
      
    }
    else if(code === 80 || code === 81 || code === 82 ){
      return "Şiddetli Yağmurlu";
      
    }
    else if(code === 95 || code === 96 || code === 99){
      return "Fırtınalı/Gökgürültülü";
      
    }
    
  }