"""
Lucy - Config Loader
Loads YAML configuration for assistant
"""

import os
import yaml
import pathlib


def load_config():
    """Load config/config.yaml from project root"""
    base = pathlib.Path(__file__).resolve().parents[2]  # go up to project root
    config_path = os.path.join(base, "config", "config.yaml")

    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Config file not found: {config_path}")

    with open(config_path, "r") as f:
        config = yaml.safe_load(f)

    return config
