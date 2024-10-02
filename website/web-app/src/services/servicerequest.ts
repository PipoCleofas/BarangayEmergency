import axios from "axios";
import { handleAxiosError } from "../../utils/handleAxiosError";

export const updateStatusRequest = async (status: string, userId: number) => {
    try {
        const response = await axios.put(`http://192.168.100.127:3000/servicerequest/updateRequest/${status}`, {
            UserID: userId
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Status updated successfully:', response.data);
    } catch (error) {
        handleAxiosError(error);
    }
};
