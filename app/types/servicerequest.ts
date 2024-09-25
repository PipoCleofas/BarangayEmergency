export interface ServiceRequestState {
    requestType: 'BFP' | 'PNP' | 'Medic' | 'NDRRMC' | null;
    requestStatus: 'pending' | 'approved' | 'rejected' | null;
    UserID?: number | null;
    ProviderId?: number | null;
    error?: string | null

}

export const InitialServiceRequest = {
    requestType: null,
    requestStatus: null,
    UserID: null,
    ProviderId: null,
    error: null
}

export interface ActionServiceRequest {
    actionType: 'post' | 'put' |  'get';
    error?: string | null
    data: Partial<ServiceRequestState>;
}

export  function serviceRequestReducer(state: ServiceRequestState = {
    requestType: null,
    requestStatus: null,
    UserID: null,
    ProviderId: null,
    error: null


}, action: ActionServiceRequest) {

    switch (action.actionType) {
        case 'post':

        const {
            UserID: lname = state.UserID,
            requestType: requestType = state.requestType,
            requestStatus: requestStatus = state.requestStatus, 
            } = action.data;

            return {
                ...state,
                ...action.data
            }

        case 'put':

        const {ProviderId: ProviderId = state.ProviderId} = action.data

            return{
                ...state,
                ...action.data
            }


        case 'get':


            return{
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}


