import pyjokes
import requests

def tell_joke() -> str:
    return pyjokes.get_joke()

def random_fact() -> str:
    try:
        res = requests.get("https://uselessfacts.jsph.pl/random.json?language=en")
        return res.json().get("text", "Couldn't fetch a fact.")
    except:
        return "Couldn't fetch a fact."

def random_quote() -> str:
    try:
        res = requests.get("https://api.quotable.io/random")
        data = res.json()
        return f"{data['content']} — {data['author']}"
    except:
        return "Couldn't fetch a quote."
