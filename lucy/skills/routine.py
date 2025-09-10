import requests
from lucy.io.speaker import speak

def handle_routine(cfg):
    """Good morning routine: time, weather, news"""
    import datetime
    now = datetime.datetime.now().strftime("%H:%M %p")
    speak(f"Good morning! The time is {now}.")

    # Weather
    try:
        weather_key = cfg["apis"]["openweather"]["key"]
        city = cfg["apis"]["openweather"]["city"]
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={weather_key}&units=metric"
        r = requests.get(url).json()
        temp = r["main"]["temp"]
        desc = r["weather"][0]["description"]
        speak(f"The weather in {city} is {desc} with {temp} degrees Celsius.")
    except Exception as e:
        speak("Sorry, I could not fetch the weather right now.")

    # News
    try:
        news_key = cfg["apis"]["newsapi"]["key"]
        country = cfg["apis"]["newsapi"]["country"]
        url = f"https://newsapi.org/v2/top-headlines?country={country}&apiKey={news_key}"
        r = requests.get(url).json()
        articles = r.get("articles", [])[:3]
        headlines = [a["title"] for a in articles]
        speak("Here are the top news headlines:")
        for h in headlines:
            speak(h)
    except Exception as e:
        speak("Sorry, I could not fetch the news right now.")
