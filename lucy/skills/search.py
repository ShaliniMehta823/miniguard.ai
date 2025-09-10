import webbrowser, wikipedia
from lucy.io.speaker import speak

def handle_search(command: str):
    query = command.replace("search", "").replace("who is", "").replace("what is", "").strip()
    if not query:
        speak("What should I search for?")
        return
    
    if "wikipedia" in command:
        try:
            summary = wikipedia.summary(query, sentences=2)
            speak(summary)
            print(summary)
        except Exception:
            speak("Sorry, I couldn’t fetch from Wikipedia.")
    else:
        url = f"https://www.google.com/search?q={query}"
        speak(f"Searching Google for {query}")
        webbrowser.open(url)
