export interface AssistanceReport {
    description: string | null;
    status: string| null;
    requestid?: number | null;
    barangayid?: number| null;
    error?: string | null
}

export interface Action {
    actionType: 'post' |  'get';
    error?: string | null
    data: Partial<AssistanceReport>;
}

export default function serviceRequestReducer(state: AssistanceReport = {
    description:  null,
    status:  null,
    requestid:  null,
    barangayid: null,
    error: null

}, action: Action) {

    switch (action.actionType) {
        case 'post':

        const {
            description:  description = state.description,
            status:  status = state.status,
            requestid:  requestid = state.requestid,
            barangayid:  barangayid = state.barangayid,

            } = action.data;

            return {
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
