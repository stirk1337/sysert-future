from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Class with settings and configs for the project"""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    gigachat: str


settings = Settings()
