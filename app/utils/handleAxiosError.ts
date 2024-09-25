export default function handleAxiosError (error: any)  {
    if (error.response) {
    console.error('Response error:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    } else if (error.request) {
    console.error('Request error:', error.request);
    } else {
    console.error('General error:', error.message);
    }
    console.error('Error config:', error.config);
};