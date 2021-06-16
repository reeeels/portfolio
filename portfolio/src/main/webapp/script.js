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