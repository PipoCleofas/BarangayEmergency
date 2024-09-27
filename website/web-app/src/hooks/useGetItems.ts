import { useEffect, useState } from "react";
import axios from "axios";
import {handleAxiosError} from "../../utils/handleAxiosError";
import {ServiceProvider} from '../types/ServiceProviderList'
import {Client} from '../types/ClientList'
import {Request} from '../types/Request'

export function useGetItems() {
    const [requests,setRequests] = useState<Request[]>([]);
    const [clients,setClients] = useState<Client[]>([]);
    const [serviceProviders,setserviceProviders] = useState<ServiceProvider[]>([]);
    const [error,setError] = useState<string | null>(null);


    const checkAccounts = async (target: string) => {
        try {
          switch(target) {
            case 'admin':
              const adminResponse = await axios.get('http://192.168.100.127:3000/admin/getAdmin');
              
              if (adminResponse.status === 500) {
                setError('Username or password is incorrect.');
              } else {
                setError(null);     
              }
              break;
      
            case 'clients':
              const clientResponse = await axios.get<Client[]>('http://192.168.100.127:3000/user/getUserList');
              const clientList = clientResponse.data.map(client => ({
                UserID: client.UserID,
                Username: client.Username,
                FirstName: client.FirstName,
                LastName: client.LastName,
              }));
      
              setClients(clientList);
      
              if (clientResponse.status === 500) {
                setError('No clients found.');
              } else {
                setError(null);
              }
              break;
      
            case 'serviceProviders':
              const spResponse = await axios.get<ServiceProvider[]>('http://192.168.100.127:3000/serviceprovider/getSPList');
              const serviceProviderList = spResponse.data.map(sp => ({
                ProviderId: sp.ProviderId,
                ProviderType: sp.ProviderType,
                Username: sp.Username,
                Phonenumber: sp.Phonenumber,
              }));
      
              setserviceProviders(serviceProviderList);
      
              if (spResponse.status === 500) {
                setError('No service providers found.');
              } else {
                setError(null);        
              }
              break;
      
            case 'requests':
              const requestResponse = await axios.get<Request[]>('http://192.168.100.127:3000/serviceprovider/getSPList');
              const requests = requestResponse.data.map(r => ({
                RequestID: r.RequestID,
                UserID: r.UserID,
                RequestType: r.RequestType,
                RequestStatus: r.RequestStatus,
                timestamp: r.timestamp,
              }));
      
              setRequests(requests);
      
              if (requestResponse.status === 500) {
                setError('No requests found.');
              } else {
                setError(null);        
              }
              break;
      
            default:
              setError('Invalid target.');
          }
        } catch (error) {
          handleAxiosError(error); // Handle Axios error outside
        }
    };

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