import handleAxiosError from '@/app/utils/handleAxiosError'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Action, Citizen} from '@/app/types/user'


// Function to submit a new user and update the state
// Function to submit a new user and dispatch an action
export const userSubmit = async (
    state: Citizen,
    dispatch: React.Dispatch<Action>
  ) => {
    try {
      const userResponse = await axios.post(
        'http://192.168.100.127:3000/user/submit',
        {
          lname: state.lastname,
          fname: state.firstname,
          mname: state.middlename,
          password: state.password,
          repassword: state.repassword,
          birthday: state.birthdate?.toString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      const { userId } = userResponse.data;


      if (userId) {
        await AsyncStorage.setItem('firstId', userId.toString());
        console.log('User ID saved to AsyncStorage:', userId);
      } else {
        throw new Error('User ID is missing from the backend response');
      }


      // Save user details in AsyncStorage
      if (state.firstname) await AsyncStorage.setItem('fname', state.firstname);
      if (state.lastname) await AsyncStorage.setItem('lname', state.lastname);
      if (state.middlename) await AsyncStorage.setItem('mname', state.middlename);
  
      // Dispatch the post action to update the state
      dispatch({
        actionType: 'post',
        data: {
          lastname: state.lastname,
          firstname: state.firstname,
          middlename: state.middlename,
          birthdate:  state.birthdate,
          password: state.password,
          repassword: state.repassword
        },
      });
  
      console.log('User data saved:', userResponse.data);
    } catch (error) {
      handleAxiosError(error);
  
      // Dispatch an error action
      dispatch({
        actionType: 'error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
      });
    }
  };
  
  // Function to update the user and dispatch an action
  export const updateUser = async (
    username: string,
    dispatch: React.Dispatch<Action> // Accept dispatch as a parameter
  ) => {
    try {
      // Fetch values from AsyncStorage and handle undefined
      const fn = (await AsyncStorage.getItem('fname')) ?? null; // Convert undefined to null
      const ln = (await AsyncStorage.getItem('lname')) ?? null; // Convert undefined to null
      const mn = (await AsyncStorage.getItem('mname')) ?? null; // Convert undefined to null
  
      const response = await axios.put(`http://192.168.100.127:3000/user/updateUser/${username}`, {
        fname: fn,
        lname: ln,
        mname: mn,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Dispatch the put action to update the username
      dispatch({
        actionType: 'put',
        data: { username },
      });
  
      console.log('User updated successfully:', response.data);
    } catch (error) {
      handleAxiosError(error);
  
      // Dispatch an error action
      dispatch({
        actionType: 'error',
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
      });
    }
  };
  
  export const getUser = async (
    username: string,
    password: string,
    dispatch: React.Dispatch<Action>
  ) => {
    try {
      const response = await axios.get(`http://192.168.100.127:3000/user/getUser`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          username, 
          password,
        },
      });
  
      const user = response.data;
      const id = user?.id;
  
      if (id) {
        await AsyncStorage.setItem('id', id.toString());
  
        dispatch({
          actionType: 'get',
          data: {
            username: user.username,
            password: user.password,
          },
        });
      } else {
        console.error('ID not found in response data');
        dispatch({
          actionType: 'error',
          data: { error: 'User ID not found' },
        });
      }
  
    } catch (error) {
      dispatch({
        actionType: 'error',
        data: { error: 'Invalid username or password' },
      });
      handleAxiosError(error);
    }
  };
  