from googletrans import Translator
from lucy.io.speaker import speak

translator = Translator()

def handle_translate(command: str):
    """Translate phrases with target language detection"""
    parts = command.split(" in ")
    if len(parts) < 2:
        speak("Please specify the target language, like translate hello in Spanish.")
        return
    
    phrase, lang = parts[0].replace("translate", "").strip(), parts[1].strip().lower()
    
    lang_map = {
        "spanish": "es",
        "hindi": "hi",
        "french": "fr",
        "german": "de",
        "italian": "it",
        "japanese": "ja"
    }
    
    dest = lang_map.get(lang, "en")
    result = translator.translate(phrase, dest=dest)
    speak(f"In {lang}, {phrase} is {result.text}")
    print(f"Translation: {result.text}")
