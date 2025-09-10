import speech_recognition as sr
from lucy.io.speaker import speak

class MicListener:
    def __init__(self, wake_words=None, timeout=6):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.wake_words = [w.lower() for w in (wake_words or [])]
        self.timeout = timeout

    def listen(self):
        """Listen for speech and return recognized text"""
        with self.microphone as source:
            print("Listening...")
            self.recognizer.adjust_for_ambient_noise(source, duration=1)
            try:
                audio = self.recognizer.listen(source, timeout=self.timeout)
                command = self.recognizer.recognize_google(audio).lower()
                print(f"Heard: {command}")
                # Check for wake word
                if any(w in command for w in self.wake_words):
                    # Strip wake word out of the command
                    for w in self.wake_words:
                        command = command.replace(w, "").strip()
                    return command
                return None
            except sr.WaitTimeoutError:
                return None
            except sr.UnknownValueError:
                speak("Sorry, I didn’t catch that.")
                return None
            except sr.RequestError:
                speak("Speech service is unavailable.")
                return None
