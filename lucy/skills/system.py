from pycaw.pycaw import AudioUtilities, ISimpleAudioVolume
import comtypes
from lucy.io.speaker import speak

def set_volume(level: float):
    """Set system volume (0.0 to 1.0)"""
    sessions = AudioUtilities.GetAllSessions()
    for session in sessions:
        volume = session._ctl.QueryInterface(ISimpleAudioVolume)
        volume.SetMasterVolume(level, None)

def handle_system(command: str):
    if "mute" in command:
        set_volume(0.0)
        speak("System muted")
    elif "volume up" in command:
        set_volume(1.0)
        speak("Volume set to maximum")
    elif "volume down" in command:
        set_volume(0.2)
        speak("Volume set to low")
    else:
        speak("I couldn't understand the system control command.")
