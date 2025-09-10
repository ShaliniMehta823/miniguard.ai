import sys
from lucy.io.mic_listener import MicListener
from lucy.io.speaker import speak
from lucy.skills.launcher import handle_launch
from lucy.skills.search import handle_search
from lucy.skills.translate import handle_translate
from lucy.skills.fun import handle_fun
from lucy.skills.routine import handle_routine
from lucy.skills.system import handle_system

class AssistantPipeline:
    def __init__(self, cfg):
        self.cfg = cfg
        self.listener = MicListener(
            wake_words=self.cfg.get("wake_words", []),
            timeout=self.cfg["stt"].get("timeout_seconds", 6)
        )

    def process_command(self, command: str):
        """Decide how to handle a given command string."""
        command = command.lower()
        print(f"User said: {command}")

        # Exit
        if any(x in command for x in ["exit", "quit", "goodbye", "close"]):
            speak("Goodbye! Have a great day.")
            sys.exit(0)

        # Launch apps or websites
        if any(word in command for word in self.cfg["aliases"]["open"]):
            return handle_launch(command, self.cfg)

        # Search
        if "search" in command or "who is" in command or "what is" in command:
            return handle_search(command)

        # Translate
        if "translate" in command:
            return handle_translate(command)

        # Fun (jokes, facts, quotes)
        if "joke" in command or "fact" in command or "quote" in command:
            return handle_fun(command)
        
        if "volume" in command or "mute" in command:
            return handle_system(command)

        # Routine (e.g. "good morning")
        if "good morning" in command:
            return handle_routine(self.cfg)

        # Default response
        speak("Sorry, I didn’t understand that. Could you repeat?")
        return None

    def run(self):
        """Main assistant loop: wait for wake word, then process commands."""
        while True:
            command = self.listener.listen()
            if command:
                self.process_command(command)
