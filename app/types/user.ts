import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import handleAxiosError from '@/app/utils/handleAxiosError'
import {validateName,validateBirthday,validatePassword} from '@/app/utils/validateUser'


export interface User {
    username?: string | null;
    password: string | null;
    email?: string | null;
    error?: string | null

}

export const InitialCitizen = {
    username:  null,
    password: null,
    email:  null,
    error: null,
    lastname: null,
    firstname: null,
    middlename:  null,
    birthdate:  null,
}

export interface Citizen extends User {
    lastname?: string | null;
    firstname?: string | null;
    middlename?: string | null;
    repassword?: string | null;
    birthdate?: any;

    // barangay?
}

export interface ServiceProvider extends User {
    providerType: string  | null;
}

export interface Admin extends User {}

// action

export interface Action {
    actionType: 'post' | 'put' | 'error' | 'input' | 'get';
    data: {
      username?: string | null;
      lastname?: string | null;
      firstname?: string | null;
      middlename?: string | null;
      birthdate?: number | null;
      password?: string | null;
      repassword?: string | null
      error?: string | null;
    };
  }
  
  

  // Updated reducer to handle 'input' for field updates
  export const reducerCitizen = (state: Citizen, action: Action): Citizen => {
    switch (action.actionType) {
      case 'post':

        const { lastname, firstname, middlename, birthdate, password, repassword } = action.data;

         // Validate names
        const nameError = validateName(
          firstname ?? null, 
          middlename ?? null, 
          lastname ?? null
        );
        if (nameError) {
          return {
            ...state,
            error: nameError,
          };
        }

        const passwordError = validatePassword(
          password ?? null,
          repassword ?? null
        );
        if (passwordError) {
          return {
            ...state,
            error: nameError,
          };
        }

        return {
          ...state,
          lastname: action.data.lastname ?? state.lastname,
          firstname: action.data.firstname ?? state.firstname,
          middlename: action.data.middlename ?? state.middlename,
          birthdate: action.data.birthdate ?? state.birthdate,
          password: action.data.password ?? state.password,
          repassword: action.data.repassword ?? state.repassword,
          error: null,
        };
      case 'put':
        return {
          ...state,
          username: action.data.username ?? state.username,
          error: null,
        };
      case 'error':
        return {
          ...state,
          error: action.data.error ?? 'Unknown error',
        };
      case 'get': 
        return{
          ...state,
          username: action.data.username ?? state.username,
          password: action.data.password ?? state.password,
          error: null,
        }
      case 'input': // New case for handling form input
        return {
          ...state,
          ...action.data, // Update only the field passed in action.data
        };
      default:
        return state;
    }
  };
  
  
  export const validateLogin = (username: string | null, password: string | null) => {
    if (!username || username.trim() === "") {
      return "Username cannot be empty.";
    }

    if (!password || password.trim() === "") {
      return "Password cannot be empty.";
    }

    return null; // No error
  };