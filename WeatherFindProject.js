const citys = [];

const capitalizeCity = (str) => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR'))
    .join(' ');
};

const showAlert = (message) => {
  const alertBox = document.querySelector('#custom-alert');
  const alertText = alertBox.querySelector('.alert-message');
  
  alertText.textContent = message;
  alertBox.classList.add('show');

  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 3000);
};

const weather = () => {
  const form = document.querySelector('#search-form');
  const input = document.querySelector('#input');
  const cityies = document.querySelector('.city');
  const country = document.querySelector('.country');
  const h4 = document.querySelector('.sicaklik');
  const h4v2 = document.querySelector('.nem');
  const h4v3 = document.querySelector('.rüzgar');
  const loadingDiv = document.querySelector('.loadingDiv');
  const errorCard = document.querySelector('.errorCard');
  const ul = document.querySelector('.ul');

  // Clear invalid styling on input
  input.addEventListener('input', () => {
    input.classList.remove('invalid');
  });

  form.onsubmit = async (e) => {
    e.preventDefault();
    const query = input.value.trim();

    // Validation Check
    if (!query) {
      input.classList.add('invalid');
      showAlert("Lütfen bir şehir adı giriniz!");
      return;
    }

    if (query.length < 2) {
      input.classList.add('invalid');
      showAlert("Şehir adı en az 2 karakter olmalıdır!");
      return;
    }

    input.classList.remove('invalid');
    errorCard.style.display = 'none';
    loadingDiv.style.display = 'flex';

    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(query)}?format=j1`);
      
      if (!res.ok) {
        throw new Error("Şehir bulunamadı");
      }

      const weatherData = await res.json();
      loadingDiv.style.display = 'none';

      // Destructuring
      const current = weatherData.current_condition[0];
      const area = weatherData.nearest_area[0];

      const sicaklik = current.temp_C;
      const rüzgar = current.windspeedKmph;
      const nem = current.humidity;

      const formattedCityName = capitalizeCity(query);
      const countryName = area.country[0].value;

      // Print
      cityies.textContent = formattedCityName;
      country.textContent = countryName;
      h4.textContent = `${sicaklik} °C`;
      h4v3.textContent = `${rüzgar} km/h`;
      h4v2.textContent = `%${nem}`;

      // Last Call
      if (!citys.includes(formattedCityName)) {
        citys.unshift(formattedCityName); 
        if (citys.length > 5) citys.pop(); 
      }

      ul.innerHTML = "";
      citys.forEach((element, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${element}`;
        ul.append(li);
      });

      input.value = "";

    } catch (error) {
      loadingDiv.style.display = 'none';
      errorCard.style.display = 'block';
      showAlert("Aranan şehir verisi alınamadı!");

      setTimeout(() => {
        errorCard.style.display = 'none';
      }, 2500);
    }
  };
};

weather();