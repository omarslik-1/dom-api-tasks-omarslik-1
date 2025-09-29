/*
=======================================
📘 JavaScript & Web APIs Lab
All tasks in one file (script.js)
=======================================
*/
document.addEventListener("DOMContentLoaded", () => {
/*  
=======================================
TODO1: Welcome Board
---------------------------------------
When the page loads, display a welcome message 
inside the <p> element with id="t1-msg".

✅ Task:
- Select the element with id "t1-msg".
- Change its text to "Hello, World!".

💡 Hint:
document.getElementById("t1-msg").innerHTML = "Hello, World!";
*/
  const t1Msg = document.getElementById("t1-msg");
  if (t1Msg) t1Msg.textContent = "Hello, World!";

/*  
=======================================
TODO2: Interaction Corner
---------------------------------------
There is a button with id="t2-btn".
When the button is clicked, change the text inside 
the <p> with id="t2-status" to:
    "You clicked the button!"

✅ Task:
- Get the button element.
- Add a click event listener.
- Inside the event, change the text of the status paragraph.

💡 Hint:
button.addEventListener("click", function () {
    // change text here
});
*/
  const t2Btn = document.getElementById("t2-btn");
  const t2Status = document.getElementById("t2-status");

  if (t2Btn && t2Status) {
    t2Btn.addEventListener("click", () => {
      t2Status.textContent = "You clicked the button!";
    });
  }

/*  
=======================================
TODO3: Inspiring Quote Board
---------------------------------------
Use the Quotable API to display a random quote.

🌍 API Link:
https://dummyjson.com/quotes/random

✅ Task:
- When the button with id="t3-loadQuote" is clicked:
    - Fetch a random quote from the API.
    - Display the quote text inside the <p> with id="t3-quote".
    - Display the author inside the <p> with id="t3-author".

💡 Hint:
The API returns JSON like:
{
  "content": "Do not watch the clock. Do what it does. Keep going.",
  "author": "Sam Levenson"
}

Use:
data.content   // the quote text
data.author    // the author
*/
 
const t3Btn = document.getElementById("t3-loadQuote");
  const t3Quote = document.getElementById("t3-quote");
  const t3Author = document.getElementById("t3-author");

  if (t3Btn && t3Quote && t3Author) {
    t3Btn.addEventListener("click", async () => {
      t3Quote.textContent = "Loading quote...";
      t3Author.textContent = "";
      try {
        const res = await fetch("https://dummyjson.com/quotes/random");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        t3Quote.textContent = data.content ?? "No quote text.";
        t3Author.textContent = data.author ? `— ${data.author}` : "— Unknown";
      } catch (err) {
        t3Quote.textContent = "Failed to load quote. Try again.";
        t3Author.textContent = "";
        console.error(err);
      }
    });
  }
/*  
=======================================
TODO4: Dammam Weather Now
---------------------------------------
Use the OpenWeatherMap API to display live weather data.

🌍 API Link:
https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric

⚠️ Replace YOUR_API_KEY with your actual API key from:
https://openweathermap.org/api

✅ Task:
- When the button with id="t4-loadWx" is clicked:
    - Fetch current weather data for Dammam.
    - Show temperature in the element with id="t4-temp".
    - Show humidity in the element with id="t4-hum".
    - Show wind speed in the element with id="t4-wind".

💡 Hint:
data.main.temp      → temperature (°C)
data.main.humidity  → humidity (%)
data.wind.speed     → wind speed (m/s)
*/
const t4Btn = document.getElementById("t4-loadWx");
  const t4Temp = document.getElementById("t4-temp");
  const t4Hum  = document.getElementById("t4-hum");
  const t4Wind = document.getElementById("t4-wind");
  const OPENWEATHER_API_KEY = "YOUR_API_KEY";

  if (t4Btn && t4Temp && t4Hum && t4Wind) {
    t4Btn.addEventListener("click", async () => {
      t4Temp.textContent = "...";
      t4Hum.textContent = "...";
      t4Wind.textContent = "...";
      try {
        if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "YOUR_API_KEY") {
          throw new Error("Missing OpenWeather API key");
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const temp = data?.main?.temp;
        const hum  = data?.main?.humidity;
        const wind = data?.wind?.speed;

        t4Temp.textContent = (typeof temp === "number") ? `${temp.toFixed(1)} °C` : "—";
        t4Hum.textContent  = (typeof hum === "number")  ? `${hum}%` : "—";
        t4Wind.textContent = (typeof wind === "number") ? `${wind} m/s` : "—";
      } catch (err) {
        t4Temp.textContent = "N/A";
        t4Hum.textContent  = "N/A";
        t4Wind.textContent = "N/A";
        console.error(err);
        alert("Failed to load Dammam weather. Please check your API key or try again.");
      }
    });
  }
});
