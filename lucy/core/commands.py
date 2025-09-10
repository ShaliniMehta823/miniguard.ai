"""
Lucy - Command Handler
Executes commands like opening websites, answering simple queries, music on YouTube, etc.
"""

import webbrowser
import datetime
import urllib.parse
import sys


class CommandHandler:
    def __init__(self, config, speaker):
        self.config = config
        self.speaker = speaker
        self.aliases = config.get("aliases", {})
        self.sites = config.get("sites", {})

    def handle(self, text: str):
        """Parse and execute a user command"""
        text = text.lower()

        # --- EXIT / QUIT ---
        if any(word in text for word in ["exit", "quit", "goodbye", "bye"]):
            self.speaker.speak("Goodbye! Have a nice day.")
            sys.exit(0)

        # --- OPEN WEBSITE COMMAND ---
        if self._matches_alias(text, "open"):
            for site, url in self.sites.items():
                if site in text:
                    self.speaker.speak(f"Opening {site}")
                    webbrowser.open(url)
                    return
            self.speaker.speak("Sorry, I don't recognize that site.")
            return

        # --- PLAY YOUTUBE VIDEO ---
        if "play" in text and "youtube" in text:
            query = text.replace("play", "").replace("on youtube", "").strip()
            if query:
                self.speaker.speak(f"Playing {query} on YouTube")
                encoded = urllib.parse.quote(query)
                webbrowser.open(f"https://www.youtube.com/results?search_query={encoded}")
                return

        # --- TIME QUERY ---
        if "time" in text:
            now = datetime.datetime.now().strftime("%I:%M %p")
            self.speaker.speak(f"The time is {now}")
            return

        # --- GREETING ---
        if any(word in text for word in ["hello", "hi", "hey"]):
            self.speaker.speak("Hello! How can I help?")
            return

        # --- FALLBACK ---
        self.speaker.speak("Sorry, I don't know how to do that yet.")

    def _matches_alias(self, text: str, command: str) -> bool:
        """Check if text matches a command or its aliases"""
        if command in text:
            return True
        if command in self.aliases:
            return any(alias in text for alias in self.aliases[command])
        return False
