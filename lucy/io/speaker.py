import pyttsx3
from lucy.utils.config import load_config

# Load config
cfg = load_config()
voice_name = cfg.get("tts", {}).get("voice", None)

# Initialize TTS engine
engine = pyttsx3.init()
voices = engine.getProperty("voices")

# Try to set desired voice from config.yaml
if voice_name:
    for v in voices:
        if voice_name.lower() in v.name.lower():
            engine.setProperty("voice", v.id)
            break

def speak(text: str):
    """Convert text to speech."""
    print(f"Lucy (speaking): {text}")
    engine.say(text)
    engine.runAndWait()
