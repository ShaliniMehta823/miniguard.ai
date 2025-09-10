import os
import webbrowser
from lucy.io.speaker import speak

def handle_launch(command: str, cfg):
    """Launch apps or websites from config.yaml"""

    # 1. Check websites (from config.yaml)
    sites = cfg.get("sites", {})
    for name, url in sites.items():
        if name in command:
            speak(f"Opening {name}")
            webbrowser.open(url)
            return

    # 2. Check local apps (from config.yaml)
    if "apps" in cfg:
        for name, path in cfg["apps"].items():
            if name in command:
                if os.path.exists(path):
                    speak(f"Opening {name}")
                    os.startfile(path)  # Windows only
                    return
                else:
                    speak(f"Path for {name} not found. Please check config.yaml.")
                    return

    # 3. Example: fallback for common Windows apps (hardcoded)
    if "notepad" in command:
        speak("Opening Notepad")
        os.system("notepad")
        return

    # 4. Fallback response
    speak("Sorry, I couldn’t find that app or site.")
