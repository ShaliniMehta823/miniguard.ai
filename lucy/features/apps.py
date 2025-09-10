import os

def open_app(app_name: str) -> str:
    apps = {
        "notepad": "notepad.exe",
        "calculator": "calc.exe",
        "paint": "mspaint.exe",
    }
    if app_name in apps:
        os.startfile(apps[app_name])
        return f"Opening {app_name}"
    return f"Sorry, I don't know how to open {app_name}."
