"""
Lucy - Personal Assistant (Entry Point)
"""

from lucy.utils.config import load_config   # Load config files
from lucy.core.pipeline import AssistantPipeline  # Main assistant engine


def main():
    # 1. Load assistant config (config/config.yaml + profile.json)
    cfg = load_config()

    # 2. Start Lucy’s assistant pipeline
    assistant = AssistantPipeline(cfg)

    # 3. Greeting message
    print(f"Hello, I am {cfg['assistant_name'].capitalize()}. Say my name to begin.")

    # 4. Run the assistant loop (listen + respond)
    assistant.run()


if __name__ == "__main__":
    main()
