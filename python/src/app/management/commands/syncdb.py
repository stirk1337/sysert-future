import json

from app.internal.models.slang import Slang
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Sync database"

    def handle(self, *args, **options):
        with open("app/management/commands/slang_data.json") as file:
            data = json.load(file)
            for item in data:
                word = item["fields"]["word"]
                try:
                    Slang.objects.create(word=word)
                except Exception as e:
                    print(f"Error: {e}")

        print("Done syncing db")
