import datetime
import requests
from lucy.utils.config import load_config

cfg = load_config()

def good_morning() -> str:
    """
    Builds a morning greeting with time, weather, and top news.
    """
    now = datetime.datetime.now().strftime("%H:%M")
    weather = get_weather(cfg["apis"]["openweather"]["city"])
    news = get_news()
    message = f"Good morning! It's {now}. {weather} Here are today's headlines: {news}"
    
    # Print to console as well (so you can read it)
    print("\n--- DAILY ROUTINE ---")
    print(f"Time: {now}")
    print(weather)
    print("News:", news)
    print("----------------------\n")
    
    return message


def get_weather(city: str) -> str:
    """
    Fetch current weather using OpenWeather API.
    """
    api_key = cfg["apis"]["openweather"]["key"]
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        res = requests.get(url).json()
        
        if res.get("cod") != 200:
            return "Couldn't fetch weather."
        
        desc = res["weather"][0]["description"]
        temp = res["main"]["temp"]
        return f"The weather in {city} is {desc}, {temp}°C."
    except Exception as e:
        print("Weather error:", e)
        return "Couldn't fetch weather."


def get_news() -> str:
    """
    Fetch top 3 news headlines using NewsAPI.
    """
    api_key = cfg["apis"]["newsapi"]["key"]
    country = cfg["apis"]["newsapi"]["country"]
    try:
        url = f"https://newsapi.org/v2/top-headlines?country={country}&apiKey={api_key}"
        res = requests.get(url).json()
        
        if res.get("status") != "ok":
            return "Couldn't fetch news."
        
        headlines = [a["title"] for a in res["articles"][:3]]
        return " | ".join(headlines)
    except Exception as e:
        print("News error:", e)
        return "Couldn't fetch news."
