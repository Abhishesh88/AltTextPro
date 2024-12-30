import requests
from PIL import Image
import io
from app.core.config import Config
from app.core.exceptions import VisionError

class HuggingFaceVisionModel:
    def __init__(self):
        if not Config.HUGGINGFACE_API_KEY:
            raise VisionError("Hugging Face API key not found in environment variables")
        self.api_key = Config.HUGGINGFACE_API_KEY
        # Using a smaller model
        self.api_url = "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning"
        self.headers = {"Authorization": f"Bearer {self.api_key}"}

    def generate_alt_text(self, image: Image.Image) -> str:
        try:
            # Optimize image size before sending
            image = image.copy()
            image.thumbnail((800, 800))  # Resize to max 800x800
            
            # Convert to JPEG with compression
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='JPEG', quality=85)
            img_byte_arr = img_byte_arr.getvalue()

            response = requests.post(
                self.api_url,
                headers=self.headers,
                data=img_byte_arr,
                timeout=10
            )
            
            if response.status_code != 200:
                raise VisionError(f"API request failed: {response.text}")

            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                return result[0].get('generated_text', '')
            
            raise VisionError("Unexpected response format")
            
        except Exception as e:
            raise VisionError(f"Hugging Face API Error: {str(e)}") 