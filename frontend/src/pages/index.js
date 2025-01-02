import { useState } from 'react';
import { processImage } from '@/utils/api';
import { Container, UploadForm, Button } from '@/styles/UploadStyles';
import { Spinner } from '@/components/Spinner';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      const file = event.target.image.files[0];
      formData.append('image', file);

      const response = await processImage(formData);
      setResult(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Image Analysis
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Analyze Image'}
          </button>
        </form>
        {loading && <Spinner />}
        {result && (
          <div className="mt-8 p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Results:</h2>
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}