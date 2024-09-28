import { useEffect, useState } from 'react';
import { useGetItems } from '../hooks/useGetItems';

export default function ApprovalRight() {
    const { checkAccounts, clients } = useGetItems();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const success = await checkAccounts('clients');
            if (success) {
                console.log('Clients fetched successfully:', clients);
            }
            setLoading(false);
        };

        fetchData();
    }, [checkAccounts, clients]);

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
            {clients.map((user) => (
                <div
                    key={user.UserID}
                    style={{
                        backgroundColor: '#e0e0e0',
                        padding: '20px',
                        marginBottom: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        maxWidth: '500px',
                       
                    }}
                >
                    <p style={{ marginBottom: '10px', fontSize: '18px' }}>User ID: {user.UserID}</p>
                    <p style={{ marginBottom: '10px', fontSize: '18px' }}>Username: {user.Username}</p>
                    <p style={{ marginBottom: '10px', fontSize: '18px' }}>First Name: {user.FirstName}</p>
                    <p style={{ marginBottom: '10px', fontSize: '18px' }}>Last Name: {user.LastName}</p>
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
