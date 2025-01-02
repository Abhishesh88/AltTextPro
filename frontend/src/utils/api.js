const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');

export const processImage = async (formData) => {
    try {
        const url = `${API_BASE_URL}/api/process-image`;
        console.log('Making request to:', url); // For debugging
        
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            mode: 'cors',
            // Don't set Content-Type - browser will set it automatically with boundary for FormData
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Response:', text); // For debugging
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};