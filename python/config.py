from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Class with settings and configs for the project"""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    gigachat: str
    kandinsky_api_key: str
    kandinsky_secret_key: str


settings = Settings()
