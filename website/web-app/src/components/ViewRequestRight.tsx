import { useEffect, useState } from 'react';
import {useGetItems} from '../hooks/useGetItems'


export default function ViewRequestRight() {
    const { checkAccounts, requests } = useGetItems();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            //await checkAccounts('requests');
            setLoading(false); 
        };

        fetchData();
    }, [checkAccounts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            {requests.map((user: any) => (
                <div key={user.UserID}>
                    <p>{user.UserID}</p>
                    <p>{user.Username}</p>
                    <p>{user.FirstName}</p>
                    <p>{user.LastName}</p>
                </div>
            ))}
        </div>
    );
}