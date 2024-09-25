// marker.ts
export interface MarkerState {
    location: any;
    latitude: number | null;
    longitude: number | null;
    title: string | null;
    description: string | null;
    UserID?: number | null;
    error?: string | null;
  }
  
  export const InitialMarker = {
    location: null,
    latitude: null,
    longitude: null,
    title: null,
    description: null,
  };
  
  export interface ActionMarker {
    actionType: 'post' | 'put' | 'get' | 'input';
    error?: string | null;
    data: Partial<MarkerState>;
  }
  
  export function markerReducer(
    state: MarkerState = InitialMarker,
    action: ActionMarker
  ) {
    switch (action.actionType) {
      case 'post':
        return {
          ...state,
          location: action.data.location ?? state.location,
          latitude: action.data.latitude ?? state.latitude,
          longitude: action.data.longitude ?? state.longitude,
          title: action.data.title ?? state.title,
          description: action.data.description ?? state.description,
        };
      case 'put':
      case 'get':
      case 'input':
        return {
          ...state,
          ...action.data,
        };
      default:
        return state; // Return current state for unhandled actions
    }
  }
  