import handleAxiosError from '@/app/utils/handleAxiosError'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActionServiceRequest, ServiceRequestState} from '@/app/types/servicerequest'

export const serviceRequestSubmit = async(
    state: ServiceRequestState,
    dispatch: React.Dispatch<ActionServiceRequest>
) => {


    const USERID = await AsyncStorage.getItem('id');

    try{
    const serviceRequestResponse = await axios.post('http://192.168.100.127:3000/servicerequest/submit', {
        UserID: USERID,
        requesttype: state.requestType,  
        requeststatus: state.requestStatus,                    
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Service request success');
      console.log('Request type set to: ' + state.requestType);

      dispatch({
        actionType: 'post',
        data: {
          requestType: state.requestType,
          requestStatus: state.requestStatus,
          UserID: parseInt(USERID ?? '1123'),
          error: null

        },
      });
      
    

    } catch (error: any) {
      handleAxiosError(error);

     
    }



}