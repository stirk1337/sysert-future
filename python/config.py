from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Class with settings and configs for the project"""

    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

    gigachat: str
    kandinsky_api_key: str
    kandinsky_secret_key: str
    imgbb_api_key: str

    postgres_host: str
    postgres_db: str
    postgres_password: str
    postgres_user: str
    postgres_port: str


settings = Settings()
