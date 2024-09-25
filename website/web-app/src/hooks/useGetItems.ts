import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {handleAxiosError} from "../../utils/handleAxiosError";
import {ServiceProvider} from '../types/ServiceProviderList'
import {Client} from '../types/ClientList'
import {Request} from '../types/Request'

export function useGetItems() {
    const [requests,setRequests] = useState<Request[]>([]);
    const [clients,setClients] = useState<Client[]>([]);
    const [serviceProviders,setserviceProviders] = useState<ServiceProvider[]>([]);
    const [error,setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const checkAccounts = async (target: any) => {

        switch(target){
            case 'admin':
                try{
                    const response = await axios.get('http://192.168.100.127:3000/admin/getAdmin');
                    
                    if(response.status === 500){
                        setError('Username or password is incorrect.');
                        return;
                    }
        
                    setError(null);     
                    navigate('AdminDashboard');
                }
                catch(error){
                    handleAxiosError(error);
                }
                break;
            case 'clients':
                try{
                    const response = await axios.get<Client[]>('http://192.168.100.127:3000/user/getUserList');
                    
                    const clientList = response.data.map(client => ({
                        UserID: client.UserID,
                        Username: client.Username,
                        FirstName: client.FirstName,
                        LastName: client.LastName,
                    }));

                    setClients(clientList);

                    
                    if(response.status === 500){
                        setError('No clients found.');;
                        return;
                    }
        
                    setError(null);
                }
                catch(error){
                    handleAxiosError(error);
                }
                break;
            case 'serviceProviders':
                try{
                    const response = await axios.get<ServiceProvider[]>('http://192.168.100.127:3000/serviceprovider/getSPList');
                    
                    const serviceProviderList = response.data.map(sp => ({
                        ProviderId: sp.ProviderId,
                        ProviderType: sp.ProviderType,
                        Username: sp.Username,
                        Phonenumber: sp.Phonenumber,
                    }));

                    setserviceProviders(serviceProviderList);


                    if(response.status === 500){
                        setError('No service providers found.');;
                        return;
                    }
                    setError(null);        
                }
                catch(error){
                    handleAxiosError(error);
                }
                break;
            case 'requests':
                try{
                    const response = await axios.get<Request[]>('http://192.168.100.127:3000/serviceprovider/getSPList');
                    
                    const requests = response.data.map(r => ({
                        RequestID: r.RequestID,
                        UserID: r.UserID,
                        RequestType: r.RequestType,
                        RequestStatus: r.RequestStatus,
                        timestamp: r.timestamp,
                    }));

                    setRequests(requests);


                    if(response.status === 500){
                        setError('No requests found.');;
                        return;
                    }
                    setError(null);        
                }
                catch(error){
                    handleAxiosError(error);
                }
                break;
            

        }
        

    }

    useEffect(() => {
        checkAccounts('clients');
        checkAccounts('serviceProviders');
        checkAccounts('requests');

    },[clients,serviceProviders]);

    return {
        error,
        requests,
        clients,
        serviceProviders,
        checkAccounts
    };
}