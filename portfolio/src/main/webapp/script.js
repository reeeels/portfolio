// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random Dad Joke to the page.
 */
const container = document.querySelector("#wordContainer");
const addjokebtn = document.querySelector("#addjoke");
const removejokebtn = document.querySelector("#removejoke");

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } };
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        let joke = res.data.joke;
        container.innerText = joke;
    } catch (e) {
        container.textContent = "NO JOKES AVAILABLE :(";
    }
}

function removeJokes() {
    container.textContent = null;
}

addjokebtn.addEventListener('click', function () {
    getDadJoke();
});
removejokebtn.addEventListener('click', function () {
    removeJokes();
});

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            document.getElementById('navbar_top').classList.add('is-size-5');

            document.getElementById('navbar-title').classList.remove('is-size-3');
            document.getElementById('navbar-title').classList.add('is-size-4');

            document.getElementById('form').classList.add('d-none');
        } else {
            document.getElementById('navbar_top').classList.remove('is-size-5');

            document.getElementById('navbar-title').classList.add('is-size-3');
            document.getElementById('navbar-title').classList.remove('is-size-4');

            document.getElementById('form').classList.remove('d-none');
        }
    })
})
let map, infoWindow;

function initMap() {
  // Styles a map in night mode.
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.674, lng: -73.945 },
    zoom: 12,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });
infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

const showText = async () => {
    try{
        const res = await fetch('/hello');
        
        const textContainer = document.getElementById('showText');
        
        const messages = [`My favorite song is ${res.song = 'Save Your Tears'}`,
                        `My favorite movie is ${res.movie = 'Cruella'}`,
                        `My favorite series is ${res.series = 'Game of Thrones'}`, 
                        `My favorite sport is ${res.sport = 'Soccer'}`, 
                        `My favorite game is ${res.game = 'Detroit: Become Human'}`,                
    ];

        const randNum = Math.floor((Math.random()* (messages.length)));
        textContainer.innerText = messages[randNum];
    } catch {
        const textContainer = document.getElementById('showText');
        textContainer.innerText = "Oops.. There is an error :(";
    }
}

async function showSentiment() {
    try{
        const ress = await fetch('/sentiment');
        
        const sentimentContainer = document.getElementById('showSentiment');
        sentimentContainer.innerText = ress;
    } catch {
        const sentimentContainer = document.getElementById('showSentiment');
        sentimentContainer.innerText = "Oops.. There is an error :(";
    }
}