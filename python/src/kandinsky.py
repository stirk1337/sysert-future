import asyncio
import json

import aiohttp
import requests
from config import settings


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

        data = {
            'model_id': (None, self.model_id),
            'params': (None, json.dumps(params), 'application/json')
        }
        response = requests.post(self.URL + 'key/api/v1/text2image/run', headers=self.AUTH_HEADERS, files=data)
        data = response.json()
        return data['uuid']

    async def wait_for_generation(self, request_id, attempts=10, delay=10):
        while attempts > 0:
            async with aiohttp.ClientSession(headers=self.AUTH_HEADERS) as session:
                async with session.get(self.URL + 'key/api/v1/text2image/status/' + request_id) as response:
                    data = await response.json()
                    if data['status'] == 'DONE':
                        return data['images']
            attempts -= 1
            await asyncio.sleep(delay)


api = Text2ImageAPI('https://api-key.fusionbrain.ai/',
                    settings.kandinsky_api_key,
                    settings.kandinsky_secret_key)
