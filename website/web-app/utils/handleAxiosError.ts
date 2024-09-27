export function handleAxiosError(error: any): string {
    if (error.response) {
        // The request was made, but the server responded with a status code other than 2xx
        console.error('Response error:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        return `Server responded with status ${error.response.status}: ${error.response.data.message || 'An error occurred.'}`;
    } else if (error.request) {
        // The request was made, but no response was received
        console.error('Request error:', error.request);
        return 'No response received from the server. Please check your network connection.';
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('General error:', error.message);
        return `Error: ${error.message}`;
    }
}
