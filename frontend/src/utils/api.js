const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');

export const processImage = async (formData) => {
    try {
        const url = `${API_BASE_URL}/api/process-image`;
        
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};