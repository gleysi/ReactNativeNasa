const API_KEY = 'qxKpG7LHNnLu74o7nhraSLmlPcHXW3JTOKANCHVY';
const API_URL = 'https://api.nasa.gov/planetary/apod';

export default async (urlParams?: string) => {
  try {
    const response = await fetch(`${API_URL}?api_key=${API_KEY}${urlParams && urlParams.length > 0 ? urlParams : ''}`);
    console.log('URL:', `${API_URL}?api_key=${API_KEY}${urlParams && urlParams.length > 0 ? urlParams : ''}`);
    const data = await response.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
