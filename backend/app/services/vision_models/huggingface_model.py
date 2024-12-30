import requests
from PIL import Image
import io
from app.core.config import Config
from app.core.exceptions import VisionError

class HuggingFaceVisionModel:
    def __init__(self):
        if not Config.HUGGINGFACE_API_KEY:
            raise VisionError("Hugging Face API key not found")
        self.api_key = Config.HUGGINGFACE_API_KEY
        # Using smallest efficient model
        self.api_url = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base"
        self.headers = {"Authorization": f"Bearer {self.api_key}"}

    def generate_alt_text(self, image: Image.Image) -> str:
        try:
            # Aggressive image optimization
            image = image.copy()
            image.thumbnail((400, 400))  # Smaller size
            
            # Higher compression
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='JPEG', quality=70, optimize=True)
            img_byte_arr = img_byte_arr.getvalue()

            response = requests.post(
                self.api_url,
                headers=self.headers,
                data=img_byte_arr,
                timeout=5
            )
            
            if response.status_code != 200:
                raise VisionError("API request failed")

            result = response.json()
            return result[0].get('generated_text', '') if isinstance(result, list) and result else ''
            
        except Exception as e:
            raise VisionError(str(e)) 