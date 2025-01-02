const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');

export const processImage = async (formData) => {
    const url = `${API_BASE_URL}/api/process-image`;
    console.log('Making request to:', url);
    
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};