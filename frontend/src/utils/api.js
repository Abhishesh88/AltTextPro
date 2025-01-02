const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const processImage = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/process-image`, {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(`Failed to connect to server: ${error.message}`);
    }
};