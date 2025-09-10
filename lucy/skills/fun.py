import random
from lucy.io.speaker import speak

jokes = [
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "I told my computer I needed a break, and it said no problem—it needed one too."
]

facts = [
    "Did you know? Honey never spoils.",
    "Bananas are berries, but strawberries are not."
]

quotes = [
    "The best way to get started is to quit talking and begin doing. — Walt Disney",
    "Don’t let yesterday take up too much of today. — Will Rogers"
]

def handle_fun(command: str):
    if "joke" in command:
        speak(random.choice(jokes))
    elif "fact" in command:
        speak(random.choice(facts))
    elif "quote" in command:
        speak(random.choice(quotes))
    else:
        speak("I don’t have anything fun right now.")
