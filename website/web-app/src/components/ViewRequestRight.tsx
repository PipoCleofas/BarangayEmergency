import { useEffect, useState } from 'react';
import { useGetItems } from '../hooks/useGetItems';

export default function ViewRequestRight() {
    const { checkAccounts, requests } = useGetItems();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await checkAccounts('requests');
            setLoading(false);
        };

        fetchData();
    }, [checkAccounts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ 
            minHeight: '100vh', 
            width: '100vw',
            padding: '40px', 
            backgroundColor: '#f5d2d1', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            margin: 0, // Remove default margin
            boxSizing: 'border-box' // Ensure padding doesn't add extra width/height
        }}>
            {requests.map((request: any, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: '#e0e0e0',
                        padding: '20px',
                        marginBottom: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        maxWidth: '500px'  // To control the max width of each request box
                    }}
                >
                    <p style={{ marginBottom: '10px', fontSize: '18px' }}>User ID: {request.UserID}</p>
                    <p style={{ marginBottom: '10px', fontSize: '18px' }}>Request Type: {request.RequestType}</p>
                    <p style={{ marginBottom: '10px', fontSize: '18px' }}>Status: {request.RequestStatus}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: '#d9534f',
                                color: '#fff',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={e => (e.target as HTMLElement).style.backgroundColor = '#c9302c'}
                            onMouseLeave={e => (e.target as HTMLElement).style.backgroundColor = '#d9534f'}
                        >
                            Approve
                        </button>
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: '#d9534f',
                                color: '#fff',
                                transition: 'background-color 0.3s'
                            }}
                            onMouseEnter={e => (e.target as HTMLElement).style.backgroundColor = '#c9302c'}
                            onMouseLeave={e => (e.target as HTMLElement).style.backgroundColor = '#d9534f'}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
