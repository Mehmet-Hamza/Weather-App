
export const Normal = (string) => {
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

export const capitalizeCity = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR'))
    .join(' ');
  };

  export const getDay = (date) =>{
    const dating = new Date(date);
    return dating.toLocaleDateString('tr-TR' , {weekday : 'long'});
}

export const formatTime = (format) => {
    if(!format) return "";
    return format.split("T")[1];
  }

export const localTime = (local) => {
    if(!local) return "";

    const now = new Date()

    const formatter = new Intl.DateTimeFormat("tr-TR" , {
      timeZone : local,
      hour : "2-digit",
      minute : "2-digit",
      hour12 : false
    })
    
    return formatter.format(now);
  
};

  
