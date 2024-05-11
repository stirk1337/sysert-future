import base64
import io
import json
import time

from PIL import Image
from django.conf import settings
import requests


class Text2ImageAPI:

    def __init__(self, url, api_key, secret_key):
        self.URL = url
        self.AUTH_HEADERS = {
            'X-Key': f'Key {api_key}',
            'X-Secret': f'Secret {secret_key}',
        }
        response = requests.get(self.URL + 'key/api/v1/models', headers=self.AUTH_HEADERS)
        data = response.json()
        self.model_id = data[0]['id']

    def generate(self, prompt, images=1, width=640, height=360):
        params = {
            "type": "GENERATE",
            "numImages": images,
            "width": width,
            "height": height,
            "generateParams": {
                "query": f"{prompt}"
            }
        }
        try:
            data = {
                'model_id': (None, self.model_id),
                'params': (None, json.dumps(params), 'application/json')
            }
            response = requests.post(self.URL + 'key/api/v1/text2image/run', headers=self.AUTH_HEADERS, files=data)
            data = response.json()
            return data['uuid']
        except Exception as e:
            return None

    def check_generation(self, request_id, attempts=10, delay=10):
        while attempts > 0:
            response = requests.get(self.URL + 'key/api/v1/text2image/status/' + request_id, headers=self.AUTH_HEADERS,
                                    timeout=60)
            data = response.json()
            if data['status'] == 'DONE':
                image_bytes = base64.b64decode(data['images'][0])
                image_io = io.BytesIO(image_bytes)
                image = Image.open(image_io)

                watermark = Image.open("app/watermark.png")
                watermark.thumbnail((500, 100))

                copied_image = image.copy()
                copied_image.paste(watermark, (15, 15), watermark.convert('RGBA'))

                buffered = io.BytesIO()
                copied_image.save(buffered, format="PNG")
                img_str = base64.b64encode(buffered.getvalue())

                return img_str

            attempts -= 1
            time.sleep(delay)


api = Text2ImageAPI('https://api-key.fusionbrain.ai/',
                    settings.KANDINSKY_API_KEY,
                    settings.KANDINSKY_SECRET_KEY)
