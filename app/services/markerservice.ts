import handleAxiosError from '@/app/utils/handleAxiosError'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActionMarker, MarkerState} from '@/app/types/marker'
import useLocation from '@/hooks/useLocation';


export const markerSubmit = async (
  state: MarkerState,
  dispatch: React.Dispatch<ActionMarker>
) => {
  const USERID = await AsyncStorage.getItem('id');
  
  if (!state.latitude || !state.longitude) {
    console.error('Latitude and Longitude are required');
    return;
  }

  console.log('Submitting marker with lat:', state.latitude, 'lng:', state.longitude);

  try {
    const markerResponse = await axios.post('http://192.168.100.127:3000/marker/submit', {
      latitude: state.location,
      longitude: state.longitude,
      title: state.title || "Emergency Assistance Request",
      description: state.description || "Emergency Assistance Request",
      UserID: USERID 
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Marker submission success:', markerResponse.data);

    dispatch({
      actionType: 'post',
      data: {
        location: state.location,
        latitude: state.latitude,
        longitude: state.longitude,
        title: state.title,
        description: state.description,
      },
    });
  } catch (err: unknown) {
    handleAxiosError(err);
  }
};
