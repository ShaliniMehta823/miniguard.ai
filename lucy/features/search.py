import webbrowser
import wikipedia

def google_search(query: str) -> str:
    webbrowser.open(f"https://www.google.com/search?q={query}")
    return f"Searching Google for {query}"

def wiki_summary(query: str) -> str:
    try:
        summary = wikipedia.summary(query, sentences=2)
        return summary
    except Exception:
        return f"Sorry, I could not find a Wikipedia page for {query}."
