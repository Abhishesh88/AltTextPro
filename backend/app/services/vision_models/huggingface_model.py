import requests
from PIL import Image
import io

class HuggingFaceVisionModel:
    def __init__(self):
        self.api_key = "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"
        self.api_url = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
        self.headers = {"Authorization": f"Bearer {self.api_key}"}

    def generate_alt_text(self, image: Image.Image) -> str:
        try:
            image = image.copy()
            image.thumbnail((300, 300))
            
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='JPEG', quality=60, optimize=True)
            
            response = requests.post(
                self.api_url,
                headers=self.headers,
                data=img_byte_arr.getvalue(),
                timeout=5
            )
            
            result = response.json()
            return result[0].get('generated_text', '') if isinstance(result, list) and result else ''
            
        except Exception as e:
            return str(e) 