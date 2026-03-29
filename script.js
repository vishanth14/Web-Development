const apiKey = '7e3f0ef10060b9742e483248da4c0cf3';
const cityInput = document.getElementById('b');
const searchBtn = document.getElementById('c');
const celsiusBtn = document.getElementById('d');
const fahrenheitBtn = document.getElementById('e');
const loading = document.getElementById('f');
const errorMsg = document.getElementById('g');
const weatherCard = document.getElementById('h');
const forecast = document.getElementById('p');
const bgImage = document.getElementById('a');

let isCelsius = true;

const imageUrls = {
    clear: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920&q=80',
    clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80',
    rain: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&q=80',
    snow: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=80',
    thunderstorm: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920&q=80',
    mist: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1920&q=80',
    default: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1920&q=80'
};

bgImage.style.backgroundImage = 'url(' + imageUrls.default + ')';

celsiusBtn.addEventListener('click', function() {
    if (!isCelsius) {
        isCelsius = true;
        celsiusBtn.classList.add('active');
        fahrenheitBtn.classList.remove('active');
        if (weatherCard.classList.contains('hidden') === false) {
            searchBtn.click();
        }
    }
});

fahrenheitBtn.addEventListener('click', function() {
    if (isCelsius) {
        isCelsius = false;
        fahrenheitBtn.classList.add('active');
        celsiusBtn.classList.remove('active');
        if (weatherCard.classList.contains('hidden') === false) {
            searchBtn.click();
        }
    }
});

searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city === '') {
        showError('Please enter a city name');
        return;
    }
    fetchWeather(city);
});

cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

function showLoading() {
    loading.classList.remove('hidden');
    errorMsg.classList.add('hidden');
    weatherCard.classList.add('hidden');
    forecast.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
    weatherCard.classList.add('hidden');
    forecast.classList.add('hidden');
}

function changeBackground(condition) {
    let imageUrl = imageUrls.default;
    const cond = condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sun')) {
        imageUrl = imageUrls.clear;
    } else if (cond.includes('cloud')) {
        imageUrl = imageUrls.clouds;
    } else if (cond.includes('rain') || cond.includes('drizzle')) {
        imageUrl = imageUrls.rain;
    } else if (cond.includes('snow')) {
        imageUrl = imageUrls.snow;
    } else if (cond.includes('thunder') || cond.includes('storm')) {
        imageUrl = imageUrls.thunderstorm;
    } else if (cond.includes('mist') || cond.includes('fog') || cond.includes('haze')) {
        imageUrl = imageUrls.mist;
    }
    bgImage.style.backgroundImage = 'url(' + imageUrl + ')';
}

function fetchWeather(city) {
    showLoading();
    const unit = isCelsius ? 'metric' : 'imperial';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;

    fetch(weatherUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
            changeBackground(data.weather[0].main);
            return fetch(forecastUrl);
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayForecast(data);
            hideLoading();
        })
        .catch(function(error) {
            hideLoading();
            showError('City not found. Please try again.');
        });
}

function displayWeather(data) {
    document.getElementById('i').textContent = data.name + ', ' + data.sys.country;
    document.getElementById('j').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    const unitSymbol = isCelsius ? '°C' : '°F';
    document.getElementById('k').textContent = Math.round(data.main.temp) + unitSymbol;
    document.getElementById('l').textContent = data.weather[0].description;
    document.getElementById('m').textContent = data.main.humidity + '%';
    document.getElementById('n').textContent = data.wind.speed + (isCelsius ? ' m/s' : ' mph');
    document.getElementById('o').textContent = data.main.pressure + ' hPa';
    weatherCard.classList.remove('hidden');
}

function displayForecast(data) {
    const container = document.getElementById('q');
    container.innerHTML = '';
    const dailyData = [];
    const seenDates = {};

    for (let i = 0; i < data.list.length; i++) {
        const item = data.list[i];
        const date = item.dt_txt.split(' ')[0];
        if (!seenDates[date]) {
            seenDates[date] = true;
            dailyData.push(item);
        }
        if (dailyData.length === 5) {
            break;
        }
    }

    for (let i = 0; i < dailyData.length; i++) {
        const item = dailyData[i];
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const unitSymbol = isCelsius ? '°C' : '°F';

        const forecastItem = document.createElement('div');
        forecastItem.className = 'fourteen';
        forecastItem.innerHTML = '<p class="day">' + dayName + '</p>' +
            '<img src="https://openweathermap.org/img/wn/' + item.weather[0].icon + '.png" alt="icon">' +
            '<p class="temp">' + Math.round(item.main.temp) + unitSymbol + '</p>';
        container.appendChild(forecastItem);
    }

    forecast.classList.remove('hidden');
}