import { useEffect, useState } from "react";
import axios from "axios";
import { handleAxiosError } from "../../utils/handleAxiosError";
import { Client } from '../types/ClientList';
import { Request } from '../types/Request';

export function useGetItems() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAccounts = async (target: string, username?: string, password?: string): Promise<boolean> => {

    try {
        switch (target) {
            case 'admin': {
                const adminResponse = await axios.get(`http://192.168.100.127:3000/admin/getAdmin`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: { username, password },
                });

                if (adminResponse.status === 200) {
                    console.log('Admin authenticated:', adminResponse.data);
                    return true;
                } else {
                    setError('Invalid username or password');
                    return false;
                }
            }
            case 'clients': {
                const clientResponse = await axios.get<Client[]>('http://192.168.100.127:3000/user/getUserList');
                console.log(clientResponse.data);
                setClients(clientResponse.data);
                setError(null);
                return true;
            }
            case 'requests': {
                const requestResponse = await axios.get<Request[]>('http://192.168.100.127:3000/servicerequest/getRequests');
                console.log(requestResponse.data);
                setRequests(requestResponse.data);
                setError(null);
                return true;
            }
            default:
                setError('Invalid target.');
                return false;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            setError('Invalid username or password');
        } else {
            const message = handleAxiosError(error);
            setError(message || 'An error occurred while fetching data.');
        }
        return false;
    }
  };

  return {
    error,
    requests,
    clients,
    checkAccounts,
  };
}
