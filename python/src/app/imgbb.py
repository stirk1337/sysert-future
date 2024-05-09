from django.conf import settings
import requests


def upload_image(image: str) -> str:
    data = {
        'image': image,
    }
    response = requests.post(f'https://api.imgbb.com/1/upload?key={settings.IMGBB_API_KEY}', data=data)
    data = response.json()
    return data['data']['url']
