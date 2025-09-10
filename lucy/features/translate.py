from googletrans import Translator

translator = Translator()

def translate_text(text: str, dest_lang: str) -> str:
    try:
        result = translator.translate(text, dest=dest_lang)
        return f"{text} in {dest_lang} is: {result.text}"
    except Exception:
        return "Sorry, I couldn't translate that."
