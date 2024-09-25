export interface Barangay {
    BarangayName: string | null;
    Sitio: string | null;
    error?: string | null

}

export interface Action {
    actionType: 'post' |  'get' | 'input';
    error?: string | null
    data: Partial<Barangay>;
}

export const InitialBarangay = {
    BarangayName: null,
    Sitio:  null,
    error: null
}

export function BarangayReducer(state: Barangay = {
    BarangayName: null,
    Sitio:  null,
    error: null

},
action: Action) {

    switch (action.actionType) {
        case 'post':

            return {
                ...state,
                BarangayName: action.data.BarangayName ?? state.BarangayName,
                Sitio: action.data.Sitio ?? state.Sitio
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
