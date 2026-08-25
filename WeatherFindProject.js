 const citys = [];

    const weather = () => {
      const SearchButon = document.querySelector('.input-btn');
      const input = document.querySelector('#input');
      const cityies = document.querySelector('.city');
      const country = document.querySelector('.country');
      const h4 = document.querySelector('.sicaklik');
      const h4v2 = document.querySelector('.nem');
      const h4v3 = document.querySelector('.rüzgar');
      const loadingDiv = document.querySelector('.loadingDiv');
      const errorCard = document.querySelector('.errorCard');
      const ul = document.querySelector('.ul');

      SearchButon.onclick = async () => {
        const query = input.value.trim();
        if (!query) return;

        errorCard.style.display = 'none';
        loadingDiv.style.display = 'flex';

        try {
          const res = await fetch(`https://wttr.in/${encodeURIComponent(query)}?format=j1`);
          
          if (!res.ok) {
            throw new Error("Şehir bulunamadı");
          }

          const weatherData = await res.json();
          loadingDiv.style.display = 'none';

          // Destructring
          const current = weatherData.current_condition[0];
          const area = weatherData.nearest_area[0];

          const sicaklik = current.temp_C;
          const rüzgar = current.windspeedKmph;
          const nem = current.humidity;

          const cityName = area.areaName[0].value;
          const countryName = area.country[0].value;

          // print
          cityies.textContent = cityName;
          country.textContent = `${countryName} (${query.toUpperCase()})`;
          h4.textContent = `${sicaklik} °C`;
          h4v3.textContent = `${rüzgar} km/h`;
          h4v2.textContent = `%${nem}`;

          // Last Call 
          if (!citys.includes(query)) {
            citys.unshift(query); 
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

          setTimeout(() =>{
            errorCard.style.display = 'none';
          },2000)
        }
      };

      // Enter Key
      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') SearchButon.click();
      });
    };

    weather();