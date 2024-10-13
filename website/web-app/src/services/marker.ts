import axios from "axios";
import { handleAxiosError } from "../../utils/handleAxiosError";

export const updateMarkerRequest = async (userId: number) => {
    try {
        const response = await axios.put(`http://192.168.100.127:3000/marker/updateMarker/${userId}`, {
            newTitle: 'Canceled Service' 
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Marker title updated successfully:', response.data);
    } catch (error) {
        handleAxiosError(error);
    }
};

