let weather = {
    apikey: "3d5c537266407c5a85cf1c4abe204d43",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey
        )
        .then(response => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then(data => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

        console.log(`Fetching new random background image`);
        this.setRandomBackground();
    },

    setRandomBackground: function() {
        const width = 1920;
        const height = 1080;
        const randomId = Math.floor(Math.random() * 1000); // Generate a random ID
        const imageUrl = `https://picsum.photos/seed/${randomId}/${width}/${height}`;
        
        // Create a new image object
        const img = new Image();
        img.onload = function() {
            // Once the image is loaded, set it as the background
            document.body.style.backgroundImage = `url('${imageUrl}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        };
        img.onerror = function() {
            console.error('Error loading image. Using fallback.');
            document.body.style.backgroundColor = '#70c9be'; // Fallback color
        };
        img.src = imageUrl;
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

// Initial weather fetch and background set
weather.fetchWeather("New York");