import aiohttp

from config import settings


async def upload_image(image: str) -> str:
    data = {
        'image': image,
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(f'https://api.imgbb.com/1/upload?key={settings.imgbb_api_key}', data=data) as response:
            data = await response.json()
            return data['data']['url']
